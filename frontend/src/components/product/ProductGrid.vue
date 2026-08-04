<template>
  <!-- ====== Grille Produits ====== -->
  <section class="product-grid-section">
    <v-container>
      <!-- Titre de section -->
      <div class="section-header text-center mb-6">
        <h2 class="text-h4 font-weight-bold">
          {{ title }}
        </h2>
        <p v-if="subtitle" class="text-body-1 text-medium-emphasis mt-2">
          {{ subtitle }}
        </p>
      </div>

      <!-- Grille : v-reveal ajoute une apparition en cascade (stagger) -->
      <!-- sur chaque carte quand elle entre dans le viewport -->
      <v-row>
        <v-col
          v-for="(product, index) in displayProducts"
          :key="product.id"
          cols="12"
          sm="6"
          lg="4"
          xl="3"
        >
          <v-card
            v-reveal="{ delay: (index % 8) * 60 }"
            class="product-card"
            elevation="0"
            rounded="xl"
            :to="`/product/${product.id}`"
            style="cursor: pointer;"
          >
            <!-- Image produit -->
            <div class="product-image-wrapper">
              <div
                class="product-placeholder"
                :style="placeholderStyle(product)"
              >
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
                  <v-icon size="14" class="me-1">
                    {{ product.badge === 'new' ? 'mdi-star' : 'mdi-tag-outline' }}
                  </v-icon>
                  {{ product.badge === 'new' ? 'Nouveau' : 'Promotion' }}
                </span>

                <!-- Icône catégorie -->
                <v-icon
                  v-if="!productImage(product)"
                  size="48"
                  color="rgba(255,255,255,0.6)"
                  class="placeholder-icon"
                >
                  {{ categoryIcon(product.category) }}
                </v-icon>

                <!-- Bouton favori (cœur) -->
                <v-btn
                  icon
                  variant="text"
                  size="small"
                  class="fav-btn"
                  :class="{ 'fav-active': favoritesStore.isFavorite(product.id) }"
                  @click.stop="favoritesStore.toggleFavorite(product.id)"
                  aria-label="Ajouter aux favoris"
                >
                  <v-icon size="22">
                    {{ favoritesStore.isFavorite(product.id) ? 'mdi-heart' : 'mdi-heart-outline' }}
                  </v-icon>
                </v-btn>

                <!-- Prix d'origine barré (promotion) -->
                <div v-if="product.originalPrice" class="discount-badge">
                  -{{ discountPercent(product) }} %
                </div>
              </div>
            </div>

            <!-- Infos produit -->
            <v-card-item class="product-info">
              <h3 class="product-name text-h6 font-weight-bold mb-1">
                {{ product.name }}
              </h3>
              <p class="product-description text-body-2 text-medium-emphasis mb-2">
                {{ product.description }}
              </p>

              <!-- Prix -->
              <div class="product-price-wrapper mb-3">
                <span v-if="product.originalPrice" class="original-price text-body-2">
                  {{ formatPrice(product.originalPrice) }}
                </span>
                <span class="product-price text-h6 font-weight-bold text-primary">
                  {{ formatPrice(product.price) }}
                </span>
              </div>

              <!-- Boutons d'action -->
              <div class="product-actions">
                <v-btn
                  variant="outlined"
                  color="primary"
                  rounded="pill"
                  size="small"
                  class="action-btn"
                  :to="`/product/${product.id}`"
                  aria-label="Voir le produit"
                >
                  <v-icon start size="16">mdi-eye-outline</v-icon>
                  Voir le produit
                </v-btn>

                <!-- Micro-animation : le bouton passe brièvement en "Ajouté ✓" -->
                <v-btn
                  variant="flat"
                  :color="addedId === product.id ? 'success' : 'primary'"
                  rounded="pill"
                  size="small"
                  class="action-btn"
                  :class="{ 'added--active': addedId === product.id }"
                  @click.stop="onAddToCart(product)"
                  aria-label="Ajouter au panier"
                >
                  <v-icon start size="16">
                    {{ addedId === product.id ? 'mdi-check' : 'mdi-cart-plus' }}
                  </v-icon>
                  {{ addedId === product.id ? 'Ajouté !' : 'Ajouter' }}
                </v-btn>
              </div>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup lang="ts">
/**
 * ProductGrid.vue – Grille de produits responsive.
 *
 * Affiche une grille de cartes produits avec image placeholder,
 * badges, prix, et boutons d'action. Utilise des données fictives
 * pour la démonstration visuelle.
 */
import { computed, ref, onBeforeUnmount } from 'vue';
import type { Product } from '../../types/product';
import { useFavoritesStore } from '../../stores/favorites.store';
import { mockProducts } from '../../services/mock-data';

defineOptions({ name: 'ProductGrid' });

// ====== Props ======
interface Props {
  products?: Product[];
  title?: string;
  subtitle?: string;
}

const props = withDefaults(defineProps<Props>(), {
  products: () => [],
  title: 'Notre collection',
  subtitle: 'Des pièces soigneusement sélectionnées pour vous.',
});

// ====== Émits ======
const emit = defineEmits<{
  addToCart: [product: Product];
}>();

// ====== Store Favoris ======
const favoritesStore = useFavoritesStore();

// ====== Produits à afficher ======
// Fallback : réutilise les données centralisées de mock-data.ts
// (suppression du doublon inline → un seul source de vérité, bundle allégé).
const displayProducts = computed<Product[]>(() =>
  props.products.length > 0 ? props.products : mockProducts,
);

// ====== Helpers ======

function formatPrice(price: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(price);
}

function discountPercent(product: Product): number {
  if (!product.originalPrice || product.originalPrice <= product.price) return 0;
  return Math.round((1 - product.price / product.originalPrice) * 100);
}

function categoryIcon(category?: string): string {
  const map: Record<string, string> = {
    femme: 'mdi-tshirt-crew-outline',
    homme: 'mdi-tshirt-crew-outline',
    accessoires: 'mdi-bag-personal-outline',
  };
  return map[category ?? ''] || 'mdi-package-variant-closed';
}

function productImage(product: Product): string | undefined {
  return product.image ?? product.imageUrl;
}

function placeholderStyle(product: Product): Record<string, string> {
  /* Dégradé de couleur basé sur la catégorie */
  const gradients: Record<string, string> = {
    femme:
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    homme:
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    accessoires:
      'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  };
  return {
    background: gradients[product.category ?? ''] || gradients.femme,
  };
}

// ====== Micro-animation "Ajouté au panier" ======
const addedId = ref<string | null>(null);
let addedTimer: ReturnType<typeof setTimeout> | undefined;

function onAddToCart(product: Product): void {
  emit('addToCart', product);
  // Feedback visuel : le bouton affiche brièvement un état de succès
  addedId.value = product.id;
  if (addedTimer) clearTimeout(addedTimer);
  addedTimer = setTimeout(() => {
    addedId.value = null;
  }, 1400);
}

onBeforeUnmount(() => {
  if (addedTimer) clearTimeout(addedTimer);
});
</script>

<style scoped>
/* ================================================================
   SECTION GRILLE PRODUITS
   ================================================================ */

.product-grid-section {
  padding-block: 4rem;
  background: rgb(var(--v-theme-background));
}

.section-header {
  margin-bottom: 2.5rem;
}

/* --- Carte Produit --- */
.product-card {
  height: 100%;
  border: 1px solid rgba(var(--v-theme-on-surface), 0.08) !important;
  background: rgb(var(--v-theme-surface));
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 40px rgba(var(--v-theme-primary), 0.10) !important;
}

/* --- Image produit --- */
.product-image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
}

.product-placeholder {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.4s ease;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

.product-card:hover .product-placeholder {
  transform: scale(1.05);
}

.placeholder-icon {
  opacity: 0.5;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.product-card:hover .placeholder-icon {
  opacity: 0.8;
  transform: scale(1.1) rotate(-5deg);
}

/* --- Badge produit --- */
.product-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: #fff;
  z-index: 2;
}

/* --- Bouton favori --- */
.fav-btn {
  position: absolute;
  top: 8px;
  right: 8px;
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
  animation: fav-pop 0.3s ease;
}

@keyframes fav-pop {
  0% { transform: scale(1); }
  50% { transform: scale(1.3); }
  100% { transform: scale(1); }
}

.badge--new {
  background: rgb(var(--v-theme-success));
}

.badge--promotion {
  background: rgb(var(--v-theme-error));
}

/* --- Badge promotion (pourcentage) --- */
.discount-badge {
  position: absolute;
  bottom: 12px;
  right: 12px;
  padding: 4px 10px;
  border-radius: 100px;
  background: rgba(var(--v-theme-error), 0.9);
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
  z-index: 2;
}

/* --- Infos produit --- */
.product-info {
  padding: 1.25rem;
}

.product-name {
  color: rgb(var(--v-theme-on-background));
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-description {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.5;
}

/* --- Prix --- */
.product-price-wrapper {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.original-price {
  text-decoration: line-through;
  color: rgba(var(--v-theme-on-surface), 0.4);
}

.product-price {
  color: rgb(var(--v-theme-primary));
}

/* --- Boutons d'action --- */
.product-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.action-btn {
  flex: 1;
  min-width: 0;
  text-transform: none !important;
  font-weight: 600;
  letter-spacing: 0.01em;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.action-btn:hover {
  transform: translateY(-2px);
}

/* --- État "Ajouté !" : léger zoom + pop de l'icône check --- */
.action-btn.added--active {
  transform: translateY(-2px) scale(1.04);
}

.action-btn.added--active :deep(.v-icon) {
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

/* ================================================================
   RESPONSIVE
   ================================================================ */

@media (max-width: 959px) {
  .product-grid-section {
    padding-block: 2.5rem;
  }
}

@media (max-width: 600px) {
  .product-actions {
    flex-direction: column;
  }

  .action-btn {
    width: 100%;
  }
}
</style>
