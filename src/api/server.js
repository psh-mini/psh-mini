import express from 'express';

import pkg from 'pg';
import dotenv from 'dotenv';
import ControlCodes from './ControlCodes.js';

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

// post that recieves a {current, flowrate} from client curl request, and then uploads to server
app.post('/api/data', async (req, res) => {
  const { current, flowrate } = req.body;
  console.log('Received data:', { current, flowrate });

  if (typeof current !== 'number' || typeof flowrate !== 'number') {
    return res.status(400).send('Ensure current and flowrate are both numbers');
  }

  // Try inserting into danes db and then display db result after
  try {
    const data = [current, flowrate, true, false];
    // insert
    await pool.query(
      'INSERT INTO sensor_data (timestamp, power, flowrate, valve, pump) '
       + 'VALUES (to_char(NOW(), \'yyyymmddhh24miss\')::bigint, $1, $2, $3, $4)',
      data
    );
  
    // display most recent entry
    const displayMostRecentEntry = await pool.query('SELECT * FROM sensor_data ORDER BY timestamp DESC LIMIT 1;');
    res.status(200).json({
      status: 'Success',
      entry: displayMostRecentEntry.rows
    });
  } catch (err) {
    console.error('DB insert error:', err);
    res.status(500).send('Database error\n');
  }

//   res.status(200).send('Data received\n');
});

// on get request send a binary value for pump and valve
app.get('/api/data', async (req, res) => {
  
    const latest = {valve: ControlCodes.VALVE_OPEN, pump: ControlCodes.PUMP_ON};
    const json = JSON.stringify(latest);
    // Send raw binary
    res.setHeader('Content-Type', 'application/octet-stream');
    res.send(Buffer.from(json));
});

//start listening for connects
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});



