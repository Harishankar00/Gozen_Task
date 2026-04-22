import express, { type Request, type Response } from 'express';
import routes from './routes/index.js';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

app.use(routes);

app.listen(PORT, () => {
  console.log(`[backend] listening on http://localhost:${PORT}`);
});
