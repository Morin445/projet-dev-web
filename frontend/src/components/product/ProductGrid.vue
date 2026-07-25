<template>
  <section class="product-grid">
    <ProductCard v-for="product in products" :key="product.id" :product="product" />
  </section>
</template>

<script setup lang="ts">
import type { Product } from '../../types/product';
import ProductCard from './ProductCard.vue';

defineProps<{
  products: Product[];
}>();
</script>
