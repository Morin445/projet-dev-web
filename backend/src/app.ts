import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { authRouter } from './routes/auth.routes';
import { productRouter } from './routes/product.routes';
import { orderRouter } from './routes/order.routes';
import { rateLimiter } from './middlewares/rateLimiter.middleware';
import { errorHandler } from './middlewares/errorHandler.middleware';

export const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(rateLimiter);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/auth', authRouter);
app.use('/products', productRouter);
app.use('/orders', orderRouter);
app.use(errorHandler);
