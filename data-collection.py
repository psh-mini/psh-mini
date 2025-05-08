import psycopg2

import json

import time

import random


datafromdb = [1, 2, 3, 4, 5]

conn = psycopg2.connect(
    user="dgrassy",  
    password="Catl1243=",   
    host="psh-mini.postgres.database.azure.com",
    port="5432", 
    database="minidata"
)

cur = conn.cursor()

# base_timestamp = int(time.time())

# for i in range(25):
#     ts = base_timestamp + i * 60
#     current_val = round(random.uniform(10.0, 15.0), 2)
#     flowrate_val = round(random.uniform(5.0, 7.0), 2)
#     valve_state = random.choice([True, False])
#     pump_state = random.choice([True, False])
#     cur.execute("""
#         INSERT INTO sensor_data ("timestamp", "power", flowrate, valve, pump)
#         VALUES (%s, %s, %s, %s, %s);
#     """, (ts, current_val, flowrate_val, valve_state, pump_state))
#     conn.commit()




cur.execute('SELECT * FROM sensor_data ORDER BY "timestamp" DESC LIMIT 5;')
rows = cur.fetchall()
columns = [desc[0] for desc in cur.description]
data = []
for row in rows:
    row_dict = {columns[i]: row[i] for i in range(len(columns))}
    data.append(row_dict)

with open('public/data.json', 'w') as f:
    json.dump(data, f, indent=4)

print (rows)