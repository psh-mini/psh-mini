import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/api/data', (req, res) => {
  const { current, flowrate } = req.body;
  console.log('Received data:', { current, flowrate });
  res.status(200).send('Data received\n');
});

// Basic GET endpoint (optional for testing)
app.get('/', (req, res) => {
  res.send('Server is running');
});

//start listening for connects
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});



