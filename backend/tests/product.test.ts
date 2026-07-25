import { describe, expect, it } from 'vitest';
import { findProductById, listProducts } from '../src/services/product.service';

describe('product service', () => {
  it('returns seeded products', async () => {
    const products = await listProducts();
    expect(products.length).toBeGreaterThan(0);
  });

  it('finds a product by id', async () => {
    const products = await listProducts();
    const [first] = products;

    const found = await findProductById(first.id);
    expect(found?.name).toBe(first.name);
  });
});