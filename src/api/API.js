//Routes for front end to call back end 
import db from './db.js';


export async function getRecentPowerData() {
  const result = await db.selectFrom('sensor_data')
    .select('power')
    .orderBy('timestamp', 'desc')
    .limit(5)
    .execute();

  return result;
}
// async function getRecentFlowData(req, res) {
//     try {
//         const displayMostRecentEntry = await pool.query('SELECT flowrate FROM sensor_data ORDER BY timestamp DESC LIMIT 5;');
//         res.status(200).json({
//           status: 'Success',
//           entry: displayMostRecentEntry.rows
//         });

//       } catch (err) {
//         console.error('DB insert error:', err);
//         res.status(500).send('Database error\n');
//       }
// }

// async function getRecentValveData(req, res) {
//     try {
//         const displayMostRecentEntry = await pool.query('SELECT valve FROM sensor_data ORDER BY timestamp DESC LIMIT 5;');
//         res.status(200).json({
//           status: 'Success',
//           entry: displayMostRecentEntry.rows
//         });

//       } catch (err) {
//         console.error('DB insert error:', err);
//         res.status(500).send('Database error\n');
//       }
// }

// async function getRecentPumpData(req, res) {
//     try {
//         const displayMostRecentEntry = await pool.query('SELECT pump FROM sensor_data ORDER BY timestamp DESC LIMIT 5;');
//         res.status(200).json({
//           status: 'Success',
//           entry: displayMostRecentEntry.rows
//         });

//       } catch (err) {
//         console.error('DB insert error:', err);
//         res.status(500).send('Database error\n');
//       }

// }

// async function getRecentPowerData(req, res) {
//     try {
//         const displayMostRecentEntry = await pool.query('SELECT power FROM sensor_data ORDER BY timestamp DESC LIMIT 5;');
//         res.status(200).json({
//           status: 'Success',
//           entry: displayMostRecentEntry.rows
//         });

//       } catch (err) {
//         console.error('DB insert error:', err);
//         res.status(500).send('Database error\n');
//       }

// }

// async function togglePump (req, res) {
  
// }

// async function toggleValve (req, res) {
  
// }


// app.get('/api/recent-flow', getRecentFlowData);
// app.get('/api/recent-valve', getRecentValveData);
// app.get('/api/recent-pump', getRecentPumpData);
// app.get('/api/recent-power', getRecentPowerData);
// app.get('/api/toggle-pump', togglePump);
// app.get('/api/toggle-valve', toggleValve);

// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
//   });