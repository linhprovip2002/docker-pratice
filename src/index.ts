import express from 'express';
import env from 'dotenv';
import cacheService from './cacheService';
import routers  from './router/index';
import api from './api';
import { dbConfig } from './database/config';
import { errorHandler } from './middleware';
import cors from 'cors';
import bodyParser from 'body-parser';
env.config();

const app = express();
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'http://localhost:4000',
];

const corsOptions = {
  origin: function (origin, callback) {
    // Check if the request origin is in the list of allowed origins
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
// app.use(cors('*'));
app.use(express.json());
app.use(bodyParser.json())
const PORT = process.env.PORT || 3000;
const useCache = true; // Change to true to use cache, or false to use the api module
app.use('/api', routers);
const apiTest = useCache ? cacheService : api;

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  return res.send('pong');
});

app.get('/products',async (_req, res) => {
  try {
    const products = await apiTest.getProducts();
    return res.status(200).json({ products });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

app.use(errorHandler);
dbConfig.connect();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
