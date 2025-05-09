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

// post that recieves a {current, flowrate} from client curl request, and then uploads to server
app.post('/api/data', async (req, res) => {
  console.log("post called");
  const { power, flowrate, valve, pump } = req.body;

  // Try inserting into danes db and then display db result after
  try {
    const data = [power, flowrate, valve, pump];
    console.log("Recieved data: " + data);
    // insert
    await pool.query(
      'INSERT INTO sensor_data (timestamp, power, flowrate, valve, pump) '
       + 'VALUES (to_char(NOW(), \'yyyymmddhh24miss\')::bigint, $1, $2, $3, $4)',
      data
    );
  
    console.log("data inserted sucessfully!");
    // display most recent entry
    const displayMostRecentEntry = await pool.query('SELECT * FROM sensor_data ORDER BY timestamp DESC LIMIT 1;');
    res.status(200).json({
      status: 'Success',
      entry: displayMostRecentEntry.rows
    });
    console 
  } catch (err) {
    console.error('DB insert error:', err);
    res.status(500).send('Database error\n');
  }

//   res.status(200).send('Data received\n');
});

// on get request send a binary value for pump and valve
app.get('/api/data', async (req, res) => {
  
    const latest = {valve: true, pump: true};
    const json = JSON.stringify(latest);
    console.log("get request performed")
    // Send raw binary
    res.setHeader('Content-Type', 'application/octet-stream');
    res.send(Buffer.from(json));
});

//start listening for connects
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});



