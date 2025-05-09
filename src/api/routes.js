// import db from './db.js';

// async function getRecentPowerData(req, res) {
//   try {
//     const result = await db
//       .selectFrom('sensor_data')
//       .select(['power'])
//       .orderBy('timestamp', 'desc')
//       .limit(5)
//       .execute();

//     res.json(result);
//   } catch (e) {
//     console.error('❌ DB error in getRecentPowerData:', e.message || e);
//     res.status(500).json({ error: 'Database error' });
//   }
// }

// async function getRecentPumpData(req, res) {
//   try {
//     const result = await db
//       .selectFrom('sensor_data')
//       .select(['pump'])
//       .orderBy('timestamp', 'desc')
//       .limit(5)
//       .execute();

//     res.json(result);
//   } catch (e) {
//     console.error('❌ DB error in getRecentPumpData:', e.message || e);
//     res.status(500).json({ error: 'Database error' });
//   }
// }

// async function getRecentValveData(req, res) {
//   try {
//     const result = await db
//       .selectFrom('sensor_data')
//       .select(['valve'])
//       .orderBy('timestamp', 'desc')
//       .limit(5)
//       .execute();

//     res.json(result);
//   } catch (e) {
//     console.error('❌ DB error in getRecentValveData:', e.message || e);
//     res.status(500).json({ error: 'Database error' });
//   }
// }

// async function getRecentFlowData(req, res) {
//   try {
//     const result = await db
//       .selectFrom('sensor_data')
//       .select(['flowrate'])
//       .orderBy('timestamp', 'desc')
//       .limit(5)
//       .execute();

//     res.json(result);
//   } catch (e) {
//     console.error('❌ DB error in getRecentFlowData:', e.message || e);
//     res.status(500).json({ error: 'Database error' });
//   }
// }

// export default {
//   getRecentPowerData,
//   getRecentPumpData,
//   getRecentValveData,
//   getRecentFlowData,
// };
