import type { Request, Response } from 'express';
import { findProductById, listProducts } from '../services/product.service';

export async function getProducts(_req: Request, res: Response) {
  const products = await listProducts();
  res.json(products);
}

export async function getProductById(req: Request, res: Response) {
  const { id } = req.params;

  if (typeof id !== 'string') {
    res.status(400).json({ message: 'Identifiant invalide' });
    return;
  }

  const product = await findProductById(id);

  if (!product) {
    res.status(404).json({ message: 'Produit introuvable' });
    return;
  }

  res.json(product);
}