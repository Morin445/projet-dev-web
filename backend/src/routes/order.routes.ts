import { Router } from 'express';
import { createOrderHandler, listOrdersHandler } from '../controllers/order.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

export const orderRouter = Router();

orderRouter.get('/', authMiddleware, listOrdersHandler);
orderRouter.post('/', authMiddleware, createOrderHandler);