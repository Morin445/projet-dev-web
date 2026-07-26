import { defineStore } from 'pinia';
import type { Product } from '../types/product';
import { api } from '../services/api';

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [] as Product[],
    loading: false,
  }),
  actions: {
    async fetchProducts() {
      this.loading = true;
      try {
        const response = await api.get<Product[]>('/products');
        this.products = response.data;
      } finally {
        this.loading = false;
      }
    },
  },
});
