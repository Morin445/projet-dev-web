<template>
  <section>
    <h2>Panier</h2>
    <p>{{ cart.count }} article(s)</p>
  </section>
</template>

<script setup lang="ts">
import { useCartStore } from '../stores/cart.store';

const cart = useCartStore();
</script>
