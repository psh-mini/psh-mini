import psycopg2

import json

datafromdb = [1, 2, 3, 4, 5]

with open('public/data.json', 'w') as f:
    json.dump(datafromdb, f)

# conn = psycopg2.connect(
#     dbname="my_local_db",
#     user="postgres",  
#     password="pump",   
#     host="localhost",
#     port="5432"
# )

# cur = conn.cursor()

# cur.execute("SELECT * FROM users;")

# rows = cur.fetchall()
# for row in rows:
#     print(row)