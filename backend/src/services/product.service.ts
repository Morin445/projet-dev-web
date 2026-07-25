import { prisma } from '../lib/prisma';
import type { Product } from '@prisma/client';

export function listProducts(): Promise<Product[]> {
  return prisma.product.findMany();
}

export function findProductById(id: string): Promise<Product | null> {
  return prisma.product.findUnique({ where: { id } });
}