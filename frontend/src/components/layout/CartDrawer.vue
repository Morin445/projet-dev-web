<template>
  <aside class="cart-drawer-content d-flex flex-column h-100">
    <!-- En-tête -->
    <div class="d-flex align-center pa-4 border-b">
      <v-icon start color="primary">mdi-cart-outline</v-icon>
      <span class="text-h6 font-weight-bold flex-grow-1">Mon panier</span>
      <v-btn
        icon
        variant="text"
        size="small"
        @click="$emit('close')"
        aria-label="Fermer le panier"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>

    <!-- Contenu : panier vide ou liste -->
    <template v-if="cartStore.count === 0">
      <div class="d-flex flex-column align-center justify-center flex-grow-1 pa-6 text-center">
        <v-icon size="64" color="grey-lighten-1" class="mb-4">mdi-cart-off</v-icon>
        <p class="text-h6 text-medium-emphasis">Votre panier est vide</p>
        <p class="text-body-2 text-disabled mt-1">
          Parcourez notre collection et ajoutez vos articles préférés.
        </p>
      </div>
    </template>

    <template v-else>
      <!-- transition-group : les articles apparaissent / disparaissent en douceur -->
      <v-list density="compact" class="flex-grow-1 overflow-y-auto" lines="two">
        <transition-group name="drawer-item">
          <v-list-item
            v-for="item in cartStore.items"
            :key="item.product.id"
            :title="item.product.name"
          >
          <template #prepend>
            <v-avatar
              :image="item.product.imageUrl ?? undefined"
              color="grey-lighten-3"
              size="48"
              rounded="md"
              variant="flat"
            >
              <v-icon v-if="!item.product.imageUrl" color="grey-lighten-1">
                mdi-image-outline
              </v-icon>
            </v-avatar>
          </template>

          <!-- Prix unitaire + quantité -->
          <template #subtitle>
            <div class="d-flex align-center ga-2 mt-1">
              <span class="text-body-2 font-weight-medium text-primary">
                {{ formatPrice(item.product.price) }}
              </span>
              <span class="text-caption text-medium-emphasis">× {{ item.quantity }}</span>
            </div>
          </template>

          <template #append>
            <div class="d-flex align-center ga-1">
              <!-- Mini contrôle quantité -->
              <v-btn
                icon
                variant="text"
                size="x-small"
                color="primary"
                :disabled="item.quantity <= 1"
                @click="cartStore.updateQuantity(item.product.id, item.quantity - 1)"
                aria-label="Diminuer"
              >
                <v-icon size="14">mdi-minus</v-icon>
              </v-btn>

              <span class="text-body-2 font-weight-bold mx-1">{{ item.quantity }}</span>

              <v-btn
                icon
                variant="text"
                size="x-small"
                color="primary"
                @click="cartStore.updateQuantity(item.product.id, item.quantity + 1)"
                aria-label="Augmenter"
              >
                <v-icon size="14">mdi-plus</v-icon>
              </v-btn>

              <v-btn
                icon
                variant="text"
                size="x-small"
                color="error"
                @click="cartStore.removeItem(item.product.id)"
                aria-label="Retirer du panier"
                class="ml-1"
              >
                <v-icon size="16">mdi-delete-outline</v-icon>
              </v-btn>
            </div>
          </template>
          </v-list-item>
        </transition-group>
      </v-list>

      <!-- Pied de page : total + bouton -->
      <div class="pa-4 border-t bg-grey-lighten-5">
        <div class="d-flex justify-space-between align-center mb-3">
          <span class="text-subtitle-1 font-weight-bold">Total</span>
          <!-- :key force la re-création du span quand le total change → la
               micro-animation total-pulse se rejoue à chaque modification -->
          <span
            :key="cartStore.total"
            class="text-h6 font-weight-bold text-primary total-value"
          >
            {{ formatPrice(cartStore.total) }}
          </span>
        </div>
        <v-btn
          block
          color="primary"
          size="large"
          rounded="lg"
          variant="elevated"
          to="/cart"
          @click="$emit('close')"
        >
          Voir le panier
          <v-icon end>mdi-arrow-right</v-icon>
        </v-btn>
      </div>
    </template>
  </aside>
</template>

<script setup lang="ts">
/**
 * CartDrawer.vue – Drawer latéral du panier (slide depuis la droite).
 *
 * Affiche la liste des articles avec quantités modifiables,
 * le total, et un lien vers la page panier complète.
 */
import { useCartStore } from '../../stores/cart.store';

defineEmits<{
  close: [];
}>();

const cartStore = useCartStore();

function formatPrice(price: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(price);
}
</script>

<style scoped>
.cart-drawer-content {
  max-height: 100vh;
}

.cart-drawer-content .border-b {
  border-bottom: 1px solid rgb(var(--v-theme-outline));
}

.cart-drawer-content .border-t {
  border-top: 1px solid rgb(var(--v-theme-outline));
}

/* --- Micro-animation du total : rejoue quand le montant change --- */
.total-value {
  display: inline-block;
  animation: total-pulse 0.35s var(--app-ease-snap);
}

@keyframes total-pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.08);
  }
  100% {
    transform: scale(1);
  }
}
</style>
