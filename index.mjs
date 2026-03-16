import express from "express"
import dotenv from 'dotenv'
import apiRouter from './src/routes/apiRoute.mjs'
import { healthCheck } from "./src/utils/middleware/health.mjs"

dotenv.config()
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/health', healthCheck);
app.use('/api/', apiRouter);

const server = app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${port}`);
});

server.on('error', (err) => {
  console.error('Could not start server:', err);
});