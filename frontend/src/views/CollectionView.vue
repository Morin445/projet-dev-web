<template>
  <section>
    <h2>Collection</h2>
    <ProductGrid :products="products" />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useProductsStore } from '../stores/products.store';
import ProductGrid from '../components/product/ProductGrid.vue';

const productsStore = useProductsStore();
const products = computed(() => productsStore.products);
</script>
