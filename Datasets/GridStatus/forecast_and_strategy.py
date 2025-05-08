import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error
import matplotlib.pyplot as plt

# ----------------------------------------
# Data Loading and Model Training
# ----------------------------------------

# Load the cleaned hourly forecasting dataset
df = pd.read_csv("hourly_forecasting_dataset.csv")

# Define feature columns (past load values + time features) and target columns (future load values)
feature_cols = [f'lag_{i}' for i in range(1, 25)] + ['hour', 'dayofweek']
target_cols = [f'target_{i}' for i in range(1, 25)]

# Split data into features (X) and targets (y)
X = df[feature_cols]
y = df[target_cols]

# Split data into training and testing sets (80% training, 20% testing)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, shuffle=True)

# Initialize and train a Random Forest Regressor model
model = RandomForestRegressor(n_estimators=100, random_state=42, n_jobs=-1)
model.fit(X_train, y_train)

# Make predictions on the test set
y_pred = model.predict(X_test)

# Calculate Mean Absolute Error for each forecasted hour
maes = [mean_absolute_error(y_test.iloc[:, i], y_pred[:, i]) for i in range(24)]

# Plot the MAE for each forecasted hour
plt.figure(figsize=(10, 6))
plt.plot(range(1, 25), maes, marker='o')
plt.title("Mean Absolute Error for Each Hour in the Forecast")
plt.xlabel("Hours Ahead")
plt.ylabel("Mean Absolute Error (MW)")
plt.grid(True)
plt.savefig("forecast_error_by_hour.png")
plt.show()

# ----------------------------------------
# Reservoir-Based Strategy Implementation
# ----------------------------------------

# Get the latest input data for forecasting
latest_input = X.iloc[-1:]
forecast = model.predict(latest_input)[0]  # Get the forecasted values for next 24 hours

# Calculate the total forecasted load for the next 24 hours
total_forecasted_load = np.sum(forecast)
print(f"Total forecasted load over next 24 hours: {total_forecasted_load:.2f} MW")

# ----------------------------------------
# Parameters for Reservoir Management
# ----------------------------------------

# These would typically come from real-time monitoring systems
# For this example, we'll set some illustrative values
CURRENT_RESERVOIR_CAPACITY = 75000  # in MW equivalent or appropriate units
MAX_RESERVOIR_CAPACITY = 100000     # maximum capacity
PUMPING_EFFICIENCY = 0.85           # efficiency of the pumping process
GENERATION_EFFICIENCY = 0.80        # efficiency of power generation
SAFETY_MARGIN = 0.10                # keep 10% extra for unexpected demand

# Calculate available capacity and needed energy
available_capacity = CURRENT_RESERVOIR_CAPACITY * GENERATION_EFFICIENCY
print(f"Currently available energy from reservoir: {available_capacity:.2f} MW")

# Calculate energy needed based on forecast and safety margin
energy_needed = total_forecasted_load * (1 + SAFETY_MARGIN)
print(f"Energy needed (with {SAFETY_MARGIN*100}% safety margin): {energy_needed:.2f} MW")

# Calculate energy deficit/surplus
energy_balance = available_capacity - energy_needed
pumping_needed = 0

if energy_balance < 0:
    # Calculate how much energy we need to pump, accounting for pumping efficiency
    pumping_needed = abs(energy_balance) / PUMPING_EFFICIENCY
    print(f"Energy deficit: {abs(energy_balance):.2f} MW")
    print(f"Pumping needed: {pumping_needed:.2f} MW (accounting for {PUMPING_EFFICIENCY*100}% pumping efficiency)")
    
    # Check if we have enough room in the reservoir
    energy_after_pumping = CURRENT_RESERVOIR_CAPACITY + (pumping_needed * PUMPING_EFFICIENCY)
    if energy_after_pumping > MAX_RESERVOIR_CAPACITY:
        max_pumpable = (MAX_RESERVOIR_CAPACITY - CURRENT_RESERVOIR_CAPACITY) / PUMPING_EFFICIENCY
        print(f"WARNING: Not enough capacity in reservoir. Maximum pumping allowed: {max_pumpable:.2f} MW")
        pumping_needed = max_pumpable
else:
    print(f"Energy surplus: {energy_balance:.2f} MW")
    print("No pumping needed. Reservoir capacity is sufficient for forecasted demand.")

# ----------------------------------------
# Compare with Previous Strategies
# ----------------------------------------

# Calculate the traditional threshold approach for comparison
threshold = np.percentile(df['hourly_load'], 75)
traditional_high_demand_hours = np.sum(forecast > threshold)
traditional_pumping = traditional_high_demand_hours  # in arbitrary units

# Calculate the weighted approach from the previous implementation
thresholds = {
    'very_high': np.percentile(df['hourly_load'], 90),
    'high': np.percentile(df['hourly_load'], 75),      
    'medium': np.percentile(df['hourly_load'], 60)     
}

def calculate_demand_score(forecast_values, thresholds):
    scores = []
    for value in forecast_values:
        if value > thresholds['very_high']:
            score = 3
        elif value > thresholds['high']:
            score = 2
        elif value > thresholds['medium']:
            score = 1
        else:
            score = 0
        scores.append(score)
    return scores

demand_scores = calculate_demand_score(forecast, thresholds)
weighted_pumping = sum(demand_scores)  # in arbitrary units

# Calculate the adaptive approach from previous implementation
historical_mean = df['hourly_load'].mean()
def calculate_adaptive_units(forecast_values, historical_mean, base_units=1.0):
    exceedance_ratios = [max(0, (val - historical_mean) / historical_mean) for val in forecast_values]
    weighted_units = [base_units * (1 + ratio)**2 if ratio > 0 else 0 for ratio in exceedance_ratios]
    return weighted_units

adaptive_units = calculate_adaptive_units(forecast, historical_mean)
adaptive_pumping = sum(adaptive_units)  # in arbitrary units

# ----------------------------------------
# Visualization
# ----------------------------------------

# Plot the forecasted load
plt.figure(figsize=(12, 8))
hours = range(1, 25)
plt.plot(hours, forecast, marker='o', linewidth=2, label='Forecasted Load')

# Add a horizontal line for the average hourly load needed
avg_hourly_needed = energy_needed / 24
plt.axhline(y=avg_hourly_needed, linestyle='--', color='red', 
            label=f'Avg Hourly Need ({avg_hourly_needed:.2f} MW)')

# Add a horizontal line for historical mean load
plt.axhline(y=historical_mean, linestyle='-', color='gray', alpha=0.5, 
            label=f'Historical Mean ({historical_mean:.2f} MW)')

# Create a cumulative load plot on the same graph
ax2 = plt.gca().twinx()
cumulative_forecast = np.cumsum(forecast)
ax2.plot(hours, cumulative_forecast, linestyle='--', color='green', marker='s', 
         label='Cumulative Load')
ax2.set_ylabel('Cumulative Load (MW)')

# Set labels and title
plt.title('24-Hour Load Forecast with Reservoir-Based Strategy')
plt.xlabel('Hours Ahead')
plt.ylabel('Hourly Load (MW)')
plt.grid(True, alpha=0.3)

# Combine legends from both y-axes
lines1, labels1 = plt.gca().get_legend_handles_labels()
lines2, labels2 = ax2.get_legend_handles_labels()
plt.legend(lines1 + lines2, labels1 + labels2, loc='upper left')

plt.tight_layout()
plt.savefig("reservoir_forecast_strategy.png")
plt.show()

# ----------------------------------------
# Strategy Comparison
# ----------------------------------------

# Create a comparison visualization
strategies = ['Traditional', 'Weighted', 'Adaptive', 'Reservoir-Based']

# Normalize the reservoir-based strategy to be on a similar scale for comparison
# This is just for visualization purposes
max_other_strategy = max(traditional_pumping, weighted_pumping, adaptive_pumping)
normalized_reservoir = (pumping_needed / energy_needed) * max_other_strategy

values = [traditional_pumping, weighted_pumping, adaptive_pumping, normalized_reservoir]

plt.figure(figsize=(10, 6))
bars = plt.bar(strategies, values, color=['lightblue', 'lightgreen', 'lightsalmon', 'purple'])
plt.title('Comparison of Pumping Strategies')
plt.ylabel('Pumping Units (normalized)')
plt.grid(axis='y', alpha=0.3)

# Add value labels on top of each bar
for bar in bars:
    height = bar.get_height()
    plt.text(bar.get_x() + bar.get_width()/2., height + 0.1,
             f'{height:.2f}', ha='center', va='bottom')

plt.tight_layout()
plt.savefig("strategy_comparison.png")
plt.show()

# ----------------------------------------
# Print Comparison Results
# ----------------------------------------

print("\n----- STRATEGY COMPARISON -----")
print(f"Traditional threshold approach: {traditional_pumping:.2f} units")
print(f"Weighted approach: {weighted_pumping:.2f} units")
print(f"Adaptive approach: {adaptive_pumping:.2f} units")
print(f"Reservoir-based approach: {pumping_needed:.2f} MW")

# Export the forecast and strategy data
forecast_df = pd.DataFrame({
    'hour_ahead': range(1, 25),
    'forecasted_load': forecast,
    'cumulative_load': np.cumsum(forecast)
})

# Add strategy results
forecast_df['traditional_score'] = [1 if val > threshold else 0 for val in forecast]
forecast_df['weighted_score'] = demand_scores
forecast_df['adaptive_units'] = adaptive_units

# Add reservoir strategy info
forecast_df['energy_needed'] = energy_needed / 24  # Average hourly energy needed
forecast_df['reservoir_capacity'] = CURRENT_RESERVOIR_CAPACITY
forecast_df['energy_balance'] = energy_balance
forecast_df['pumping_needed'] = pumping_needed

forecast_df.to_csv("reservoir_strategy_output.csv", index=False)
print("\nForecast and strategy data exported to 'reservoir_strategy_output.csv'")