import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { ensureSchema } from './db.js';
import customersRouter from './routes/customers.js';


const app = express();
app.use(cors({ origin: true }));
app.use(express.json());


app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/customers', customersRouter);


const PORT = Number(process.env.PORT) || 4000;


ensureSchema()
.then(() => {
app.listen(PORT, () => {
console.log(`API listening on port ${PORT}`);
});
})
.catch((err) => {
console.error('DB init error:', err);
process.exit(1);
});
