<template>
  <article class="product-card">
    <h3>{{ product.name }}</h3>
    <p>{{ product.description }}</p>
    <strong>{{ product.price }} €</strong>
  </article>
</template>

<script setup lang="ts">
import type { Product } from '../../types/product';

defineProps<{
  product: Product;
}>();
</script>
