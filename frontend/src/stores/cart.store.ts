import { defineStore } from 'pinia';
import type { Product } from '../types/product';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as Product[],
  }),
  getters: {
    count: (state) => state.items.length,
  },
  actions: {
    addItem(product: Product) {
      this.items.push(product);
    },
    removeItem(productId: string) {
      this.items = this.items.filter((item) => item.id !== productId);
    },
  },
});
