<template>
  <!-- ====== PAGE MES FAVORIS ====== -->
  <section class="favorites-view">
    <v-container>

      <!-- ====== En-tête ====== -->
      <div class="favorites-header text-center mb-6" v-reveal>
        <h1 class="text-h3 text-sm-h2 font-weight-bold mb-2">
          Mes favoris
        </h1>
        <p class="text-body-1 text-medium-emphasis">
          <template v-if="favoriteProducts.length === 0">
            Vous n'avez aucun favori pour le moment.
          </template>
          <template v-else>
            {{ favoriteProducts.length }} produit{{
              favoriteProducts.length > 1 ? 's' : ''
            }} dans vos favoris — cliquez sur le cœur pour retirer un produit.
          </template>
        </p>
      </div>

      <!-- ====== État vide ====== -->
      <v-row v-if="favoriteProducts.length === 0" class="empty-favorites-row">
        <v-col cols="12" class="text-center py-10">
          <v-icon size="100" color="grey-lighten-2" class="mb-4">
            mdi-heart-outline
          </v-icon>
          <h2 class="text-h4 font-weight-bold mb-2">Aucun favori</h2>
          <p class="text-body-1 text-medium-emphasis mb-6">
            Touchez le cœur sur un produit pour le retrouver ici.
          </p>
          <v-btn
            color="primary"
            variant="elevated"
            size="large"
            rounded="pill"
            to="/collection"
          >
            <v-icon start>mdi-arrow-left</v-icon>
            Découvrir la collection
          </v-btn>
        </v-col>
      </v-row>

      <!-- ====== Grille des favoris ======
           ProductGrid affiche chaque carte avec son cœur (remplissage =
           favori). Cliquer sur le cœur d'un favori le retire : la grille
           se met à jour immédiatement grâce au store Pinia partagé. -->
      <ProductGrid
        v-else
        :products="favoriteProducts"
        title=""
        subtitle=""
        @add-to-cart="onAddToCart"
      />

    </v-container>
  </section>
</template>

<script setup lang="ts">
/**
 * FavoritesView.vue – Page "Mes Favoris".
 *
 * Affiche tous les produits ajoutés aux favoris (ids stockés dans le store
 * Pinia, persistant dans le localStorage), avec possibilité de retirer un
 * favori (cœur) et d'ajouter au panier. Réutilise ProductGrid pour une
 * présentation identique au reste du site.
 */
import { computed } from 'vue';
import { useFavoritesStore } from '../stores/favorites.store';
import { useProductsStore } from '../stores/products.store';
import { useCartStore } from '../stores/cart.store';
import ProductGrid from '../components/product/ProductGrid.vue';
import type { Product } from '../types/product';

defineOptions({ name: 'FavoritesView' });

// ====== Stores ======
const favoritesStore = useFavoritesStore();
const productsStore = useProductsStore();
const cartStore = useCartStore();

// ====== Produits favoris (résolus depuis les ids, dans l'ordre des favoris) ======
const favoriteProducts = computed<Product[]>(() =>
  favoritesStore.favoriteIds
    .map((id) => productsStore.products.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p)),
);

// ====== Actions ======
function onAddToCart(product: Product): void {
  cartStore.addItem(product);
}
</script>

<style scoped>
/* ================================================================
   PAGE FAVORIS
   ================================================================ */

.favorites-view {
  background: rgb(var(--v-theme-background));
  padding-block: 3rem 5rem;
  min-height: 70vh;
}

.favorites-header {
  padding-block: 1rem;
}

.empty-favorites-row {
  min-height: 40vh;
}

/* ================================================================
   RESPONSIVE
   ================================================================ */

@media (max-width: 959px) {
  .favorites-view {
    padding-block: 2rem 3rem;
  }
}

@media (max-width: 600px) {
  .favorites-view {
    padding-block: 1.5rem 2rem;
  }

  .favorites-header h1 {
    font-size: 1.75rem !important;
  }
}
</style>
