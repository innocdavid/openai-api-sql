import express from 'express';
import cors from 'cors';

const app = express();

// MIDDLEWARE
app.use(cors());

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

// route
app.get('/api/', (req, res) => {
  res.status(200).json({ msg: 'Hello from the api' });
});

app.listen(PORT, () => { console.log(`server listening on ${HOST}:${PORT}`) });
