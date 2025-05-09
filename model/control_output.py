import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
import json
import random

# ----------------------------------------
# Data Loading and Model Training (run only once)
# ----------------------------------------

# Load and train model (same as Option 1)
df = pd.read_csv("model/hourly_forecasting_dataset.csv")
feature_cols = [f'lag_{i}' for i in range(1, 25)] + ['hour', 'dayofweek']
target_cols = [f'target_{i}' for i in range(1, 25)]
X = df[feature_cols]
y = df[target_cols]
X_train, _, y_train, _ = train_test_split(X, y, test_size=0.2, shuffle=True)
model = RandomForestRegressor(n_estimators=100, random_state=42, n_jobs=-1)
model.fit(X_train, y_train)

# ----------------------------------------
# Function to Get Immediate Control Action
# ----------------------------------------

def get_control_action(current_reservoir_capacity, max_reservoir_capacity, pumping_efficiency, generation_efficiency, latest_hourly_data: dict = df[feature_cols].iloc[-1].to_dict()):
    """
    Predicts the next hour's load and determines the immediate pump/valve action.
    """
    latest_input = pd.DataFrame([latest_hourly_data]) # Ensure it's a DataFrame with correct columns
    predicted_load_next_hour = model.predict(latest_input)[0][0]

    available_energy = current_reservoir_capacity * generation_efficiency
    action = {"pump": False, "valve": False}

    load_threshold_high = available_energy + 150
    load_threshold_low = available_energy - 150

    if predicted_load_next_hour > load_threshold_high:
        potential_pump = (predicted_load_next_hour - available_energy) / pumping_efficiency
        if current_reservoir_capacity + potential_pump * pumping_efficiency <= max_reservoir_capacity:
            action["pump"] = True
    elif predicted_load_next_hour < load_threshold_low and current_reservoir_capacity > (max_reservoir_capacity * 0.15):
        potential_generate = (available_energy - predicted_load_next_hour) / generation_efficiency
        if current_reservoir_capacity - potential_generate >= 0:
            action["valve"] = True
    return action

if __name__ == "__main__":
    # Example usage (replace with your actual data)
    # latest_data = df[feature_cols].iloc[-1].to_dict()
    CURRENT_RESERVOIR_CAPACITY = random.randint(0,10000)
    MAX_RESERVOIR_CAPACITY = 10000
    PUMPING_EFFICIENCY = 0.85
    GENERATION_EFFICIENCY = 0.95

    control = get_control_action(
        CURRENT_RESERVOIR_CAPACITY,
        MAX_RESERVOIR_CAPACITY,
        PUMPING_EFFICIENCY,
        GENERATION_EFFICIENCY
    )
    print(json.dumps(control))
    #print(f"Immediate Control Action: {control}")
