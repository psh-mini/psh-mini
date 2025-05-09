//Routes for front end to call back end 

// TODO: DANE
import express from 'express';

import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
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
const port = process.env.PORT || 3000;

app.use(express.json());

async function getRecentFlowData(req, res) {
    try {
        const displayMostRecentEntry = await pool.query('SELECT flowrate FROM sensor_data ORDER BY timestamp DESC LIMIT 5;');
        res.status(200).json({
          status: 'Success',
          entry: displayMostRecentEntry.rows
        });

      } catch (err) {
        console.error('DB insert error:', err);
        res.status(500).send('Database error\n');
      }
}

async function getRecentValveData(req, res) {
    try {
        const displayMostRecentEntry = await pool.query('SELECT valve FROM sensor_data ORDER BY timestamp DESC LIMIT 5;');
        res.status(200).json({
          status: 'Success',
          entry: displayMostRecentEntry.rows
        });

      } catch (err) {
        console.error('DB insert error:', err);
        res.status(500).send('Database error\n');
      }
}

async function getRecentPumpData(req, res) {
    try {
        const displayMostRecentEntry = await pool.query('SELECT pump FROM sensor_data ORDER BY timestamp DESC LIMIT 5;');
        res.status(200).json({
          status: 'Success',
          entry: displayMostRecentEntry.rows
        });

      } catch (err) {
        console.error('DB insert error:', err);
        res.status(500).send('Database error\n');
      }

}

async function getRecentPowerData(req, res) {
    try {
        const displayMostRecentEntry = await pool.query('SELECT power FROM sensor_data ORDER BY timestamp DESC LIMIT 5;');
        res.status(200).json({
          status: 'Success',
          entry: displayMostRecentEntry.rows
        });

      } catch (err) {
        console.error('DB insert error:', err);
        res.status(500).send('Database error\n');
      }

}

async function togglePump (req, res) {
  
}

async function toggleValve (req, res) {
  
}


app.get('/api/recent-flow', getRecentFlowData);
app.get('/api/recent-valve', getRecentValveData);
app.get('/api/recent-pump', getRecentPumpData);
app.get('/api/recent-power', getRecentPowerData);
app.get('/api/toggle-pump', togglePump);
app.get('/api/toggle-valve', toggleValve);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });