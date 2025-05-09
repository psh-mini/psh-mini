import express from 'express';
import cors from 'cors';
import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

console.log({
  PGUSER: process.env.PGUSER,
  PGHOST: process.env.PGHOST,
  PGDATABASE: process.env.PGDATABASE,
  PGPORT: process.env.PGPORT,
});


const { Pool } = pkg;

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
    ssl: {
      rejectUnauthorized: false
    }
  });
  

const app = express();

const port = 3001;

app.use(express.json());

app.use(cors());

app.get('/api/frontend', async (req, res) => {
  console.log("📥 GET /api/frontend");

  try {
    const result = await pool.query(
      'SELECT * FROM sensor_data WHERE power IS NOT NULL ORDER BY timestamp DESC LIMIT 24;'
    );

    console.log("✅ Retrieved rows:", result.rowCount);
    res.status(200).json({
      status: "success",
      count: result.rowCount,
      data: result.rows,
    });
  } catch (err) {
    console.error("❌ Database error in /api/frontend:", err.message);
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve data from sensor_data",
      error: err.message,
    });
  }
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

