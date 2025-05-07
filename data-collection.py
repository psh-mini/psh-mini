import psycopg2

conn = psycopg2.connect(
    dbname="my_local_db",
    user="postgres",  
    password="pump",   
    host="localhost",
    port="5432"
)

cur = conn.cursor()

cur.execute("SELECT * FROM users;")

rows = cur.fetchall()
for row in rows:
    print(row)