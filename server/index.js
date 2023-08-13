import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import connectDB from '../server/config/db.js';
import UserRouter from '../server/routes/user.routes.js';

dotenv.config();

// initialize express app
const app = express();

// Await database connection
await connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(helmet({ contentSecurityPolicy: 
(process.env.NODE_ENV == 'production') ? undefined : false}));
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

app.use('/', UserRouter);

// Start Http server
const port = process.env.PORT || 5000;
app.listen(port, () => [
  console.log(`Listening on ${port}: 5000`)
]);