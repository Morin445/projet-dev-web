import { Router } from 'express';
import { getProductById, getProducts } from '../controllers/product.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

export const productRouter = Router();

productRouter.get('/', getProducts);
productRouter.get('/:id', authMiddleware, getProductById);
