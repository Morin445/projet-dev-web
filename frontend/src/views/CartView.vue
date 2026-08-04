<template>
  <!-- ====== PAGE PANIER ====== -->
  <section class="cart-view">
    <v-container>

      <!-- ====== En-tête ====== -->
      <div class="cart-header text-center mb-6">
        <h1 class="text-h3 text-sm-h2 font-weight-bold mb-2">
          Mon panier
        </h1>
        <p class="text-body-1 text-medium-emphasis">
          <template v-if="cartStore.count === 0">
            Votre panier est vide
          </template>
          <template v-else>
            {{ cartStore.count }} article{{ cartStore.count > 1 ? 's' : '' }} dans votre panier
          </template>
        </p>
      </div>

      <!-- ====== Panier vide ====== -->
      <v-row v-if="cartStore.count === 0" class="empty-cart-row">
        <v-col cols="12" class="text-center py-10">
          <v-icon size="100" color="grey-lighten-2" class="mb-4">
            mdi-cart-off
          </v-icon>
          <h2 class="text-h4 font-weight-bold mb-2">Votre panier est vide</h2>
          <p class="text-body-1 text-medium-emphasis mb-6">
            Découvrez notre collection et ajoutez vos articles préférés.
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

      <!-- ====== Panier avec articles ====== -->
      <v-row v-else>
        <!-- Colonne liste des articles -->
        <v-col cols="12" lg="8" class="cart-items-col">
          <!-- transition-group : apparition / disparition fluide des articles -->
          <transition-group name="cart-item">
          <v-card
            v-for="item in cartStore.items"
            :key="item.product.id"
            class="cart-item-card mb-4"
            elevation="0"
            rounded="xl"
          >
            <div class="cart-item-content">
              <!-- Image placeholder -->
              <div class="cart-item-image" :style="itemPlaceholderStyle(item.product.category)">
                <v-icon size="36" color="rgba(255,255,255,0.5)">
                  {{ itemCategoryIcon(item.product.category) }}
                </v-icon>
                <span
                  v-if="item.product.badge"
                  class="cart-item-badge"
                  :class="`badge--${item.product.badge}`"
                >
                  {{ item.product.badge === 'new' ? 'Nouveau' : 'Promo' }}
                </span>
              </div>

              <!-- Infos produit -->
              <div class="cart-item-info">
                <h3 class="cart-item-name text-subtitle-1 font-weight-bold mb-1">
                  {{ item.product.name }}
                </h3>
                <p class="cart-item-desc text-caption text-medium-emphasis mb-2">
                  {{ item.product.description }}
                </p>
                <span class="cart-item-price text-body-2 font-weight-bold text-primary">
                  {{ formatPrice(item.product.price) }}
                </span>
              </div>

              <!-- Contrôle quantité -->
              <div class="cart-item-quantity">
                <v-btn
                  icon
                  variant="text"
                  size="small"
                  color="primary"
                  class="qty-btn"
                  :disabled="item.quantity <= 1"
                  @click="cartStore.updateQuantity(item.product.id, item.quantity - 1)"
                  aria-label="Diminuer la quantité"
                >
                  <v-icon size="18">mdi-minus</v-icon>
                </v-btn>

                <span class="qty-value text-body-1 font-weight-bold mx-2">
                  {{ item.quantity }}
                </span>

                <v-btn
                  icon
                  variant="text"
                  size="small"
                  color="primary"
                  class="qty-btn"
                  @click="cartStore.updateQuantity(item.product.id, item.quantity + 1)"
                  aria-label="Augmenter la quantité"
                >
                  <v-icon size="18">mdi-plus</v-icon>
                </v-btn>
              </div>

              <!-- Sous-total -->
              <div class="cart-item-subtotal text-end">
                <span class="text-subtitle-1 font-weight-bold">
                  {{ formatPrice(item.product.price * item.quantity) }}
                </span>
              </div>

              <!-- Bouton suppression -->
              <div class="cart-item-remove">
                <v-btn
                  icon
                  variant="text"
                  size="small"
                  color="error"
                  @click="cartStore.removeItem(item.product.id)"
                  aria-label="Retirer du panier"
                >
                  <v-icon size="20">mdi-delete-outline</v-icon>
                </v-btn>
              </div>
            </div>
          </v-card>
          </transition-group>
        </v-col>

        <!-- Colonne résumé : apparition douce au scroll -->
        <v-col cols="12" lg="4" class="cart-summary-col">
          <v-card
            v-reveal="{ variant: 'zoom-in', delay: 100 }"
            class="cart-summary-card"
            elevation="0"
            rounded="xl"
          >
            <v-card-title class="text-h6 font-weight-bold pa-4">
              Résumé de la commande
            </v-card-title>

            <v-divider />

            <v-card-text class="pa-4">
              <div class="summary-row d-flex justify-space-between mb-3">
                <span class="text-body-1">Sous-total</span>
                <span class="text-body-1 font-weight-medium">
                  {{ formatPrice(cartStore.total) }}
                </span>
              </div>

              <div class="summary-row d-flex justify-space-between mb-3">
                <span class="text-body-1">Livraison</span>
                <v-chip
                  size="small"
                  color="success"
                  variant="tonal"
                  class="font-weight-medium"
                >
                  Gratuite
                </v-chip>
              </div>

              <v-divider class="my-3" />

              <div class="summary-row d-flex justify-space-between mb-4">
                <span class="text-h6 font-weight-bold">Total</span>
                <span class="text-h6 font-weight-bold text-primary">
                  {{ formatPrice(cartStore.total) }}
                </span>
              </div>

              <v-btn
                block
                color="primary"
                variant="elevated"
                size="large"
                rounded="pill"
                class="checkout-btn"
              >
                <v-icon start size="20">mdi-lock-outline</v-icon>
                Commander
              </v-btn>

              <p class="text-caption text-medium-emphasis text-center mt-3">
                Paiement sécurisé • Livraison offerte
              </p>
            </v-card-text>

            <v-divider />

            <v-card-actions class="pa-4">
              <v-btn
                block
                variant="outlined"
                color="error"
                rounded="pill"
                size="small"
                @click="cartStore.clearCart()"
              >
                <v-icon start size="16">mdi-cart-remove</v-icon>
                Vider le panier
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

    </v-container>
  </section>
</template>

<script setup lang="ts">
/**
 * CartView.vue – Page panier complète.
 *
 * Affiche la liste des articles avec contrôle des quantités,
 * suppression individuelle, vidage du panier, et un résumé
 * avec le total et un bouton de commande.
 */
import { useCartStore } from '../stores/cart.store';

defineOptions({ name: 'CartView' });

const cartStore = useCartStore();

// ====== Helpers ======

function formatPrice(price: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(price);
}

function itemCategoryIcon(category?: string): string {
  const map: Record<string, string> = {
    femme: 'mdi-tshirt-crew-outline',
    homme: 'mdi-tshirt-crew-outline',
    accessoires: 'mdi-bag-personal-outline',
  };
  return map[category ?? ''] || 'mdi-package-variant-closed';
}

function itemPlaceholderStyle(category?: string): Record<string, string> {
  const gradients: Record<string, string> = {
    femme: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    homme: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    accessoires: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  };
  return {
    background: gradients[category ?? ''] || gradients.femme,
  };
}
</script>

<style scoped>
/* ================================================================
   PAGE PANIER
   ================================================================ */

.cart-view {
  background: rgb(var(--v-theme-background));
  padding-block: 3rem 5rem;
  min-height: 70vh;
}

/* ================================================================
   EN-TÊTE
   ================================================================ */

.cart-header {
  padding-block: 1rem;
}

/* ================================================================
   PANIER VIDE
   ================================================================ */

.empty-cart-row {
  min-height: 40vh;
}

/* ================================================================
   ARTICLE DU PANIER
   ================================================================ */

.cart-item-card {
  border: 1px solid rgba(var(--v-theme-on-surface), 0.08) !important;
  background: rgb(var(--v-theme-surface));
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.cart-item-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(var(--v-theme-primary), 0.06) !important;
}

.cart-item-content {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
}

/* --- Image --- */
.cart-item-image {
  position: relative;
  width: 80px;
  min-width: 80px;
  height: 80px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
}

.cart-item-badge {
  position: absolute;
  top: 4px;
  left: 4px;
  padding: 2px 8px;
  border-radius: 100px;
  font-size: 0.625rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #fff;
  line-height: 1.2;
}

.cart-item-badge.badge--new {
  background: rgb(var(--v-theme-success));
}

.cart-item-badge.badge--promotion {
  background: rgb(var(--v-theme-error));
}

/* --- Infos --- */
.cart-item-info {
  flex: 1;
  min-width: 0;
}

.cart-item-name {
  color: rgb(var(--v-theme-on-background));
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cart-item-desc {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* --- Quantité --- */
.cart-item-quantity {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.qty-btn {
  border: 1px solid rgba(var(--v-theme-primary), 0.2) !important;
  transition: border-color 0.2s ease, background-color 0.2s ease;
}

.qty-btn:hover:not(:disabled) {
  border-color: rgb(var(--v-theme-primary)) !important;
  background-color: rgba(var(--v-theme-primary), 0.06) !important;
}

.qty-value {
  min-width: 28px;
  text-align: center;
  color: rgb(var(--v-theme-on-background));
}

/* --- Sous-total --- */
.cart-item-subtotal {
  min-width: 90px;
  flex-shrink: 0;
}

/* --- Suppression --- */
.cart-item-remove {
  flex-shrink: 0;
}

/* ================================================================
   RÉSUMÉ DE LA COMMANDE
   ================================================================ */

.cart-summary-card {
  border: 1px solid rgba(var(--v-theme-on-surface), 0.08) !important;
  background: rgb(var(--v-theme-surface));
  position: sticky;
  top: 88px;
}

.summary-row {
  align-items: center;
}

.checkout-btn {
  text-transform: none !important;
  font-weight: 600;
  letter-spacing: 0.01em;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.checkout-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(var(--v-theme-primary), 0.3) !important;
}

/* ================================================================
   RESPONSIVE
   ================================================================ */

@media (max-width: 959px) {
  .cart-view {
    padding-block: 2rem 3rem;
  }

  .cart-item-content {
    flex-wrap: wrap;
    gap: 12px;
  }

  .cart-item-info {
    flex: 1 1 calc(100% - 96px);
  }

  .cart-item-quantity {
    order: 1;
    margin-left: 96px;
  }

  .cart-item-subtotal {
    order: 2;
    min-width: auto;
    flex: 1;
    text-align: right;
  }

  .cart-item-remove {
    order: 3;
  }

  .cart-summary-card {
    position: static;
  }
}

@media (max-width: 600px) {
  .cart-view {
    padding-block: 1.5rem 2rem;
  }

  .cart-header h1 {
    font-size: 1.75rem !important;
  }

  .cart-item-content {
    padding: 12px;
    gap: 10px;
  }

  .cart-item-image {
    width: 64px;
    min-width: 64px;
    height: 64px;
  }

  .cart-item-name {
    font-size: 0.925rem !important;
    white-space: normal;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .cart-item-quantity {
    margin-left: 74px;
  }

  .cart-item-subtotal {
    font-size: 0.925rem !important;
  }

  .cart-summary-card {
    margin-top: 0.5rem;
  }
}

/* Très petits écrans : compacte la 2ᵉ ligne (quantité / sous-total / suppression) */
@media (max-width: 400px) {
  .cart-item-content {
    gap: 8px;
  }

  .cart-item-quantity {
    margin-left: 72px;
  }

  .qty-value {
    min-width: 22px;
    margin-inline: 4px !important;
  }

  .cart-item-subtotal {
    font-size: 0.875rem !important;
  }
}
</style>
