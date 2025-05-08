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

//TODO modify post to send data to azure
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
      'INSERT INTO sensor_data (timestamp, power, flowrate, valve, pump) VALUES (to_char(NOW(), \'yyyymmddhh24miss\')::bigint, $1, $2, $3, $4)',
      data
    );
  
    // display all
    const displayEntry = await pool.query('SELECT * from sensor_data');
    res.status(200).json({
      message: 'Data inserted into DB',
      inserted: data,
      allData: displayEntry.rows
    });
  } catch (err) {
    console.error('DB insert error:', err);
    res.status(500).send('Database error\n');
  }

//   res.status(200).send('Data received\n');
});

// get to show it running 
app.get('/', (req, res) => {
  res.send('Server is running');
});

//start listening for connects
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});



