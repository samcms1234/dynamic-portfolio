import express from 'express';
import cors from 'cors';
import portfolioRoutes from './routes/portfolio.routes';
import errorMiddleware from './middlewares/error.middleware';

const app: express.Application = express();

app.use(cors());
app.use(express.json());

app.use('/api/portfolio', portfolioRoutes);
app.use(errorMiddleware);

export default app;