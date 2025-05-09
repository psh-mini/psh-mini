import express from 'express';
import { execFile } from 'child_process';

import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = pkg;

let getRequestSecondCounter = 0;

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
    console.log(getRequestSecondCounter);
    if(getRequestSecondCounter>=8 && getRequestSecondCounter<=12) { // pump phase
        res.status(200).json({valve: false, pump: true});
    } else if(getRequestSecondCounter>=18 && getRequestSecondCounter<=22){ // generate phase 
        res.status(200).json({valve: true, pump: false});
    } else if ((getRequestSecondCounter>22 && getRequestSecondCounter<=23) || getRequestSecondCounter>=0 && getRequestSecondCounter<=8){ // store phase 
        res.status(200).json({valve: false, pump: false});
    } else if (getRequestSecondCounter>=24){
        res.status(200).json({valve: false, pump: false});
        getRequestSecondCounter = 0;
    } else {
        res.status(200).json({valve: false, pump: false});
    }
    getRequestSecondCounter = getRequestSecondCounter + 1;
    // execFile('python3', ['model/control_output.py'], (error, stdout, stderr) => {
    //     if (error) {
    //         console.error('Python error:', stderr);
    //         return res.status(500).send('Error running control script');
    //     }

    //     try {
    //         const latest = JSON.parse(stdout);
    //         const json = JSON.stringify(latest);
    //         res.setHeader('Content-Type', 'application/octet-stream');
    //         res.send(Buffer.from(json));
    //     } catch (e) {
    //         console.error('JSON parse error:', e);
    //         res.status(500).send('Invalid control output');
    //     }
    // });
});

//start listening for connects
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});



