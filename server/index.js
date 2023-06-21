import express from 'express';
import cors from 'cors';
import generateAPIResponse from './generate.js';

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'http://localhost';

// get request
app.get('/api/', (req, res) => {
  res.status(200).json({ response: 'Hello from the api' });
});

// post request
app.post('/api/generate', async (req, res) => {
  const queryDescription = req.body.queryDescription;
  try {
    const sqlQuery = await generateAPIResponse(queryDescription);
    res.status(200).json({ response: sqlQuery });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => { console.log(`server listening on ${HOST}:${PORT}`) });
