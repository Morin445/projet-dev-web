import type { Request, Response } from 'express';
import { createOrderSchema } from '../validators/schemas';
import { createOrder, listOrders } from '../services/order.service';

export async function createOrderHandler(req: Request, res: Response) {
  const parsed = createOrderSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ message: 'Données invalides', issues: parsed.error.issues });
    return;
  }

  const userId = req.user!.sub;

  try {
    const order = await createOrder(userId, parsed.data.items);
    res.status(201).json(order);
  } catch (error) {
    if (error instanceof Error && error.message === 'PRODUCT_NOT_FOUND') {
      res.status(400).json({ message: 'Un ou plusieurs produits sont introuvables' });
      return;
    }
    throw error;
  }
}

export async function listOrdersHandler(req: Request, res: Response) {
  const userId = req.user!.sub;
  const orders = await listOrders(userId);
  res.json(orders);
}