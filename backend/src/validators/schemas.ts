import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const productIdSchema = z.object({
  id: z.string().min(1),
});

export const orderItemSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().positive(),
});

export const createOrderSchema = z.object({
  items: z.array(orderItemSchema).min(1),
});