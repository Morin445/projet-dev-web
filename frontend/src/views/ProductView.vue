<template>
  <!-- ====== PAGE DÉTAIL PRODUIT ====== -->
  <section class="product-view">
    <v-container>

      <!-- ====== Fil d'Ariane ====== -->
      <div v-if="product" class="breadcrumbs mb-4">
        <v-btn
          variant="text"
          size="small"
          class="breadcrumb-link text-caption"
          to="/"
          aria-label="Accueil"
        >
          <v-icon start size="14">mdi-home-outline</v-icon>
          Accueil
        </v-btn>
        <v-icon size="14" class="breadcrumb-sep mx-1">mdi-chevron-right</v-icon>
        <v-btn
          variant="text"
          size="small"
          class="breadcrumb-link text-caption"
          to="/collection"
          aria-label="Collection"
        >
          Collection
        </v-btn>
        <v-icon size="14" class="breadcrumb-sep mx-1">mdi-chevron-right</v-icon>
        <span class="text-caption text-medium-emphasis breadcrumb-current">{{ product.name }}</span>
      </div>

      <!-- ====== Layout principal : image + infos ====== -->
      <v-row v-if="product" class="product-detail-row">
        <!-- Colonne image : apparition en slide depuis la droite -->
        <v-col cols="12" md="6" class="product-image-col" v-reveal="'fade-left'">
          <div class="product-image-wrapper">
            <div class="product-placeholder" :style="placeholderStyle">
              <img
                v-if="productImage(product)"
                :src="productImage(product)"
                :alt="product.name"
                class="product-image"
                loading="lazy"
                decoding="async"
              />

              <!-- Badge -->
              <span
                v-if="product.badge"
                class="product-badge"
                :class="`badge--${product.badge}`"
              >
                <v-icon size="16" class="me-1">
                  {{ product.badge === 'new' ? 'mdi-star' : 'mdi-tag-outline' }}
                </v-icon>
                {{ product.badge === 'new' ? 'Nouveau' : 'Promotion' }}
              </span>

              <!-- Icône décorative -->
              <v-icon
                v-if="!productImage(product)"
                size="80"
                color="rgba(255,255,255,0.5)"
                class="placeholder-icon"
              >
                {{ categoryIcon }}
              </v-icon>

              <!-- Bouton favori -->
              <v-btn
                icon
                variant="text"
                size="small"
                class="fav-btn"
                :class="{ 'fav-active': favoritesStore.isFavorite(product.id) }"
                @click="onToggleFavorite"
                :aria-label="favoritesStore.isFavorite(product.id) ? 'Retirer des favoris' : 'Ajouter aux favoris'"
              >
                <!-- Transition douce entre cœur vide et cœur actif -->
                <transition name="fav-bounce" mode="out-in">
                  <v-icon
                    :key="favoritesStore.isFavorite(product.id) ? 'filled' : 'outline'"
                    size="24"
                  >
                    {{ favoritesStore.isFavorite(product.id) ? 'mdi-heart' : 'mdi-heart-outline' }}
                  </v-icon>
                </transition>
              </v-btn>

              <!-- Badge promo -->
              <div v-if="product.originalPrice" class="discount-badge">
                -{{ discountPercent }} %
              </div>
            </div>
          </div>
        </v-col>

        <!-- Colonne infos : apparition en slide depuis la gauche (léger délai) -->
        <v-col cols="12" md="6" class="product-info-col" v-reveal="{ variant: 'fade-right', delay: 120 }">
          <div class="product-info-wrapper">
            <!-- Catégorie -->
            <span class="product-category text-caption font-weight-bold text-uppercase text-primary mb-2 d-block">
              {{ product.category || 'Non catégorisé' }}
            </span>

            <!-- Nom -->
            <h1 class="product-name text-h3 text-sm-h2 font-weight-bold mb-3">
              {{ product.name }}
            </h1>

            <!-- Description -->
            <p class="product-description text-body-1 text-medium-emphasis mb-4">
              {{ product.description }}
            </p>

            <!-- Prix -->
            <div class="product-pricing mb-4">
              <div class="d-flex align-baseline ga-3">
                <span v-if="product.originalPrice" class="original-price text-h5">
                  {{ formatPrice(product.originalPrice) }}
                </span>
                <span class="current-price text-h3 font-weight-bold text-primary">
                  {{ formatPrice(product.price) }}
                </span>
              </div>
              <span
                v-if="product.originalPrice"
                class="savings text-body-2 text-success font-weight-medium mt-1 d-block"
              >
                Économisez {{ formatPrice(product.originalPrice - product.price) }}
              </span>
            </div>

            <!-- Badge stock -->
            <div class="stock-info mb-4">
              <v-chip
                :color="product.inStock !== false ? 'success' : 'error'"
                size="small"
                variant="tonal"
                class="stock-chip"
              >
                <v-icon start size="14">
                  {{ product.inStock !== false ? 'mdi-check-circle-outline' : 'mdi-clock-outline' }}
                </v-icon>
                {{ product.inStock !== false ? 'En stock' : 'Rupture temporaire' }}
              </v-chip>
            </div>

            <v-divider class="mb-4" />

            <!-- Boutons d'action -->
            <div class="product-actions">
              <!-- Micro-animation : le bouton passe brièvement en "Ajouté ✓" -->
              <v-btn
                :color="addedState ? 'success' : 'primary'"
                variant="elevated"
                size="large"
                rounded="pill"
                class="add-to-cart-btn"
                :class="{ 'added--active': addedState }"
                :disabled="product.inStock === false"
                @click="addToCart"
                aria-label="Ajouter au panier"
              >
                <v-icon start size="20">
                  {{ addedState ? 'mdi-check' : 'mdi-cart-plus' }}
                </v-icon>
                {{ addedState ? 'Ajouté !' : 'Ajouter au panier' }}
              </v-btn>

              <v-btn
                variant="outlined"
                color="primary"
                size="large"
                rounded="pill"
                class="back-btn"
                to="/collection"
                aria-label="Continuer mes achats"
              >
                <v-icon start size="20">mdi-arrow-left</v-icon>
                Continuer mes achats
              </v-btn>
            </div>
          </div>
        </v-col>
      </v-row>

      <!-- ====== État vide : produit introuvable ====== -->
      <v-row v-else class="not-found-row">
        <v-col cols="12" class="text-center py-10">
          <v-icon size="80" color="grey-lighten-2" class="mb-4">mdi-package-variant-closed</v-icon>
          <h2 class="text-h4 font-weight-bold mb-2">Produit introuvable</h2>
          <p class="text-body-1 text-medium-emphasis mb-4">
            Le produit que vous recherchez n'existe pas ou a été retiré.
          </p>
          <v-btn
            color="primary"
            variant="elevated"
            rounded="pill"
            to="/collection"
            size="large"
          >
            <v-icon start>mdi-arrow-left</v-icon>
            Retour à la collection
          </v-btn>
        </v-col>
      </v-row>

    </v-container>
  </section>
</template>

<script setup lang="ts">
/**
 * ProductView.vue – Page détail d'un produit.
 *
 * Affiche les informations complètes d'un produit : image placeholder,
 * nom, description, prix, badge, disponibilité, favoris et ajout au panier.
 * Le produit est identifié par son id dans l'URL (route /product/:id).
 */
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useProductsStore } from '../stores/products.store';
import { useCartStore } from '../stores/cart.store';
import { useFavoritesStore } from '../stores/favorites.store';
import { useToastStore } from '../stores/toast.store';
import type { Product } from '../types/product';

defineOptions({ name: 'ProductView' });

// ====== Stores & route ======
const route = useRoute();
const productsStore = useProductsStore();
const cartStore = useCartStore();
const favoritesStore = useFavoritesStore();
const toastStore = useToastStore();

// ====== Produit courant ======
const product = computed<Product | undefined>(() =>
  productsStore.products.find((p) => p.id === route.params.id),
);

// ====== Confirmation visuelle ======
// État "Ajouté ✓" du bouton (retour à la normale après 1,5 s)
const addedState = ref(false);

// ====== Helpers ======

function formatPrice(price: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(price);
}

const discountPercent = computed<number>(() => {
  if (!product.value?.originalPrice || !product.value) return 0;
  if (product.value.originalPrice <= product.value.price) return 0;
  return Math.round((1 - product.value.price / product.value.originalPrice) * 100);
});

const categoryIcon = computed<string>(() => {
  const map: Record<string, string> = {
    femme: 'mdi-tshirt-crew-outline',
    homme: 'mdi-tshirt-crew-outline',
    accessoires: 'mdi-bag-personal-outline',
  };
  return map[product.value?.category ?? ''] || 'mdi-package-variant-closed';
});

function productImage(currentProduct?: Product): string | undefined {
  return currentProduct?.image ?? currentProduct?.imageUrl;
}

const placeholderStyle = computed<Record<string, string>>(() => {
  const gradients: Record<string, string> = {
    femme: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    homme: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    accessoires: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  };
  return {
    background: gradients[product.value?.category ?? ''] || gradients.femme,
  };
});

// ====== Ajout au panier ======
function addToCart(): void {
  if (!product.value) return;

  cartStore.addItem(product.value);

  // Feedback discret global ("Produit ajouté au panier")
  toastStore.show('Produit ajouté au panier');

  // Feedback visuel du bouton
  addedState.value = true;
  setTimeout(() => {
    addedState.value = false;
  }, 1500);
}

// ====== Toggle favori avec feedback toast ======
function onToggleFavorite(): void {
  if (!product.value) return;
  const added = favoritesStore.toggleFavorite(product.value.id);
  toastStore.show(added ? 'Ajouté aux favoris' : 'Retiré des favoris');
}
</script>

<style scoped>
/* ================================================================
   PAGE DÉTAIL PRODUIT
   ================================================================ */

.product-view {
  background: rgb(var(--v-theme-background));
  padding-block: 2rem 4rem;
  min-height: 70vh;
}

/* ================================================================
   FIL D'ARIANE
   ================================================================ */

.breadcrumbs {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.breadcrumb-link {
  text-transform: none !important;
  font-weight: 500;
  color: rgba(var(--v-theme-on-surface), 0.6);
  transition: color 0.2s ease;
  min-width: 0;
  padding-inline: 4px !important;
}

.breadcrumb-link:hover {
  color: rgb(var(--v-theme-primary));
  background: transparent !important;
}

.breadcrumb-sep {
  color: rgba(var(--v-theme-on-surface), 0.25);
  flex-shrink: 0;
}

.breadcrumb-current {
  min-width: 0;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ================================================================
   IMAGE PRODUIT
   ================================================================ */

.product-image-col {
  position: relative;
}

.product-image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  max-width: 600px;
  margin-inline: auto;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(var(--v-theme-on-surface), 0.08);
  box-shadow: 0 8px 32px rgba(var(--v-theme-primary), 0.08);
}

.product-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.placeholder-icon {
  transition: transform 0.4s ease, opacity 0.4s ease;
}

.product-image-wrapper:hover .placeholder-icon {
  transform: scale(1.1) rotate(-5deg);
  opacity: 0.8;
}

/* --- Image produit --- */
.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

/* --- Badges --- */
.product-badge {
  position: absolute;
  top: 16px;
  left: 16px;
  display: inline-flex;
  align-items: center;
  padding: 6px 16px;
  border-radius: 100px;
  font-size: 0.8125rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: #fff;
  z-index: 2;
}

.badge--new {
  background: rgb(var(--v-theme-success));
}

.badge--promotion {
  background: rgb(var(--v-theme-error));
}

.discount-badge {
  position: absolute;
  bottom: 16px;
  right: 16px;
  padding: 6px 14px;
  border-radius: 100px;
  background: rgba(var(--v-theme-error), 0.9);
  color: #fff;
  font-size: 0.8125rem;
  font-weight: 700;
  z-index: 2;
}

/* --- Bouton favori --- */
.fav-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 3;
  background: rgba(255, 255, 255, 0.85) !important;
  backdrop-filter: blur(4px);
  transition: transform 0.2s ease, background 0.2s ease !important;
}

.fav-btn:hover {
  transform: scale(1.15);
  background: rgba(255, 255, 255, 0.95) !important;
}

.fav-btn .v-icon {
  color: rgba(0, 0, 0, 0.4);
  transition: color 0.2s ease, transform 0.2s ease;
}

.fav-btn:hover .v-icon {
  color: #e91e63;
}

.fav-btn.fav-active .v-icon {
  color: #e91e63;
}

/* --- Transition douce entre cœur vide et cœur actif
       (scale rebond + légère rotation, rejouée à chaque toggle) ---
       Spécificité .fav-btn devant être supérieure à `.fav-btn .v-icon`
       pour que le timing voulu s'applique réellement. --- */
.fav-btn .fav-bounce-enter-active {
  transition:
    color 0.2s ease,
    transform 0.25s var(--app-ease-snap);
}

.fav-btn .fav-bounce-leave-active {
  transition: opacity 0.12s ease;
}

.fav-bounce-enter-from {
  transform: scale(0.4) rotate(-18deg);
}

.fav-bounce-leave-to {
  opacity: 0;
}

/* ================================================================
   INFORMATIONS PRODUIT
   ================================================================ */

.product-info-col {
  display: flex;
  align-items: center;
}

.product-info-wrapper {
  width: 100%;
  max-width: 520px;
  margin-inline: auto;
}

.product-category {
  letter-spacing: 0.08em;
  font-weight: 600;
}

.product-name {
  color: rgb(var(--v-theme-on-background));
  line-height: 1.15;
  letter-spacing: -0.02em;
}

.product-description {
  line-height: 1.7;
  max-width: 480px;
}

/* --- Prix --- */
.product-pricing {
  padding: 1rem 0;
}

.original-price {
  text-decoration: line-through;
  color: rgba(var(--v-theme-on-surface), 0.35);
  font-weight: 500;
}

.current-price {
  color: rgb(var(--v-theme-primary));
}

.savings {
  font-weight: 600;
}

/* --- Stock --- */
.stock-chip {
  text-transform: none !important;
  font-weight: 600;
}

/* --- Boutons --- */
.product-actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.add-to-cart-btn {
  flex: 1;
  min-width: 200px;
  text-transform: none !important;
  font-weight: 600;
  letter-spacing: 0.01em;
  padding-inline: 32px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.add-to-cart-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(var(--v-theme-primary), 0.3) !important;
}

.add-to-cart-btn.added--active {
  transform: translateY(-2px) scale(1.02);
}

.add-to-cart-btn.added--active :deep(.v-icon) {
  animation: check-pop 0.3s var(--app-ease-snap);
}

@keyframes check-pop {
  0% {
    transform: scale(0.6);
  }
  60% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}

.back-btn {
  text-transform: none !important;
  font-weight: 600;
  border-width: 2px;
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.back-btn:hover {
  transform: translateY(-2px);
  background-color: rgba(var(--v-theme-primary), 0.06);
}

/* ================================================================
   ÉTAT VIDE (produit introuvable)
   ================================================================ */

.not-found-row {
  min-height: 50vh;
}

/* ================================================================
   RESPONSIVE
   ================================================================ */

@media (max-width: 959px) {
  .product-view {
    padding-block: 1.5rem 3rem;
  }

  .product-image-wrapper {
    max-width: 480px;
    aspect-ratio: 4 / 3;
    margin-bottom: 2rem;
  }

  .product-info-wrapper {
    max-width: 100%;
  }

  .product-name {
    font-size: 2rem !important;
  }
}

@media (max-width: 600px) {
  .product-view {
    padding-block: 1rem 2rem;
  }

  .product-image-wrapper {
    max-width: 100%;
    aspect-ratio: 1 / 1;
  }

  .product-name {
    font-size: 1.5rem !important;
  }

  .current-price {
    font-size: 1.75rem !important;
  }

  .product-actions {
    flex-direction: column;
  }

  .add-to-cart-btn,
  .back-btn {
    width: 100%;
  }
}
</style>
