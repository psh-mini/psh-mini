import pandas as pd

# ----------------------------------------
# Data Loading and Initial Inspection
# ----------------------------------------

# Load the original CSV file containing CAISO load data
df = pd.read_csv("CAISO Load.csv")

# Display information about the data structure to understand what we're working with
print("Original DataFrame info:")
print(df.info())
print("\nSample data (first 5 rows):")
print(df.head())

# ----------------------------------------
# Timestamp Conversion
# ----------------------------------------

# Convert the timestamp column to proper datetime format
# This allows us to use pandas time-based operations
df['interval_start_local'] = pd.to_datetime(df['interval_start_local'])

# ----------------------------------------
# Time Resampling (Hourly Aggregation)
# ----------------------------------------

# Check if 'load' column exists - it's the main column we need to aggregate
if 'load' in df.columns:
    # Approach 1: Only resample the specific load column we care about
    # This avoids issues with non-numeric columns
    df_hourly = df.set_index('interval_start_local').resample('h')['load'].mean().rename('hourly_load').reset_index()
    
    # If result is a Series, convert to DataFrame
    if isinstance(df_hourly, pd.Series):
        df_hourly = df_hourly.to_frame()
else:
    # Approach 2: If column names are different, identify and resample all numeric columns
    # This is helpful if the dataset structure is unknown or variable
    numeric_cols = df.select_dtypes(include=['number']).columns.tolist()
    print(f"Numeric columns found: {numeric_cols}")
    
    # Only resample numeric columns to avoid errors with non-numeric data
    df_hourly = df.set_index('interval_start_local').resample('h')[numeric_cols].mean().reset_index()
    
    # Rename columns if needed to match expected names in downstream code
    if 'load' in df_hourly.columns:
        df_hourly = df_hourly.rename(columns={'load': 'hourly_load'})

# Display information about the hourly resampled data
print("\nHourly DataFrame info after resampling:")
print(df_hourly.info())
print("\nSample hourly data (first 5 rows):")
print(df_hourly.head())

# ----------------------------------------
# Feature Engineering
# ----------------------------------------

# Add time-based features that will help with forecasting
df_hourly['hour'] = df_hourly['interval_start_local'].dt.hour  # Hour of day (0-23)
df_hourly['dayofweek'] = df_hourly['interval_start_local'].dt.dayofweek  # Day of week (0=Monday, 6=Sunday)

# ----------------------------------------
# Creating Lag Features
# ----------------------------------------

# Create lag features (previous load values)
# This lets the model learn from historical patterns
for lag in range(1, 25):
    df_hourly[f'lag_{lag}'] = df_hourly['hourly_load'].shift(lag)  # Each lag_n is the load from n hours ago

# ----------------------------------------
# Creating Target Variables
# ----------------------------------------

# Create target variables (future load values to predict)
for step in range(1, 25):
    df_hourly[f'target_{step}'] = df_hourly['hourly_load'].shift(-step)  # Each target_n is the load n hours ahead

# ----------------------------------------
# Final Data Cleanup
# ----------------------------------------

# Remove rows with missing values (created by shift operations at the edges of the dataset)
df_model = df_hourly.dropna().reset_index(drop=True)

# Display information about the final modeling dataset
print("\nFinal model dataset info:")
print(df_model.info())
print("\nSample model data (first 5 rows):")
print(df_model.head())

# ----------------------------------------
# Export Clean Dataset
# ----------------------------------------

# Save the processed dataset to a new CSV file for modeling
df_model.to_csv("hourly_forecasting_dataset.csv", index=False)
print("\nHourly forecasting dataset saved successfully!")