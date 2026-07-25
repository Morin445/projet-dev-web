import { prisma } from '../lib/prisma';

interface OrderItemInput {
  productId: string;
  quantity: number;
}

export async function createOrder(userId: string, items: OrderItemInput[]) {
  const productIds = items.map((item) => item.productId);

  const products = await prisma.product.findMany({
    where: { id: { in: productIds } },
  });

  if (products.length !== new Set(productIds).size) {
    throw new Error('PRODUCT_NOT_FOUND');
  }

  const priceByProductId = new Map(products.map((product) => [product.id, product.price]));

  const total = items.reduce((sum, item) => {
    const unitPrice = priceByProductId.get(item.productId)!;
    return sum + unitPrice * item.quantity;
  }, 0);

  return prisma.order.create({
    data: {
      userId,
      total,
      items: {
        create: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: priceByProductId.get(item.productId)!,
        })),
      },
    },
    include: { items: true },
  });
}

export async function listOrders(userId: string) {
  return prisma.order.findMany({
    where: { userId },
    include: { items: true },
  });
}