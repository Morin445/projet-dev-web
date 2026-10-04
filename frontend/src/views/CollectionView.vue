<template>
  <!-- ====== PAGE COLLECTION ====== -->
  <section class="collection-view">

    <!-- ====== HERO ====== -->
    <div class="collection-hero">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="8" lg="6" class="text-center">
            <!-- v-reveal : apparition en cascade du titre / sous-titre -->
            <h1
              class="hero-title text-h2 text-sm-h1 font-weight-bold mb-3"
              v-reveal
            >
              Notre collection
            </h1>
            <p
              class="hero-subtitle text-body-1 text-medium-emphasis mx-auto"
              v-reveal="{ delay: 120 }"
            >
              Des pièces soigneusement sélectionnées pour exprimer votre style,
              du minimalisme élégant aux tendances audacieuses.
            </p>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <!-- ====== BARRE DE RECHERCHE ====== -->
    <v-container class="search-bar-container">
      <v-row justify="center">
        <v-col cols="12" md="8" lg="6">
          <v-text-field
            v-model="searchQuery"
            variant="solo-filled"
            density="comfortable"
            placeholder="Rechercher un produit..."
            hide-details
            flat
            rounded="pill"
            single-line
            clearable
            prepend-inner-icon="mdi-magnify"
            class="collection-search"
            @click:clear="searchQuery = ''"
          />
        </v-col>
      </v-row>
    </v-container>

    <!-- ====== FILTRES PAR CATÉGORIE ====== -->
    <v-container class="filters-container">
      <div class="filters-wrapper">
        <v-chip-group
          v-model="selectedCategory"
          mandatory
          column
          class="category-chips"
          color="primary"
          selected-class="chip--active"
        >
          <v-chip
            v-for="filter in categoryFilters"
            :key="filter.value"
            :value="filter.value"
            variant="outlined"
            size="default"
            class="category-chip"
            filter
            :prepend-icon="filter.icon"
          >
            {{ filter.label }}
          </v-chip>
        </v-chip-group>
      </div>

      <!-- Compteur de résultats -->
      <div class="results-count text-center text-body-2 text-medium-emphasis mt-2">
        <template v-if="filteredProducts.length === 0">
          Aucun produit trouvé
        </template>
        <template v-else>
          {{ filteredProducts.length }} produit{{ filteredProducts.length > 1 ? 's' : '' }} trouvé{{ filteredProducts.length > 1 ? 's' : '' }}
        </template>
      </div>
    </v-container>

    <!-- ====== ÉTAT VIDE (aucun résultat) ====== -->
    <v-container v-if="filteredProducts.length === 0" class="empty-state-container">
      <v-row justify="center">
        <v-col cols="12" md="6" class="text-center py-8">
          <v-icon size="80" color="grey-lighten-2" class="mb-4">
            mdi-package-variant-closed
          </v-icon>
          <h2 class="text-h5 font-weight-bold mb-2">Aucun produit trouvé</h2>
          <p class="text-body-1 text-medium-emphasis mb-4">
            Essayez de modifier vos filtres ou votre recherche.
          </p>
          <v-btn
            variant="outlined"
            color="primary"
            rounded="pill"
            size="small"
            @click="resetFilters"
          >
            <v-icon start size="16">mdi-filter-remove-outline</v-icon>
            Réinitialiser les filtres
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <!-- ====== GRILLE PRODUITS ====== -->
    <ProductGrid
      v-else
      :products="filteredProducts"
      title=""
      subtitle=""
      @add-to-cart="onAddToCart"
    />

  </section>
</template>

<script setup lang="ts">
/**
 * CollectionView.vue – Page collection avec recherche, filtres et grille produits.
 *
 * Affiche l'ensemble des produits avec une interface de recherche et des filtres
 * par catégorie. Les produits sont filtrés localement côté client par nom,
 * description et catégorie. Affiche un état vide quand aucun produit ne correspond.
 */
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { LocationQueryRaw } from 'vue-router';
import { useProductsStore } from '../stores/products.store';
import { useCartStore } from '../stores/cart.store';
import ProductGrid from '../components/product/ProductGrid.vue';
import type { Product } from '../types/product';

defineOptions({ name: 'CollectionView' });

// ====== Route & Stores ======
const route = useRoute();
const router = useRouter();
const productsStore = useProductsStore();
const cartStore = useCartStore();

// ====== État local (miroir de l'URL, cf. sync plus bas) ======
const searchQuery = ref('');
const selectedCategory = ref('toutes');

// ====== Catégories de filtre ======
interface CategoryFilter {
  label: string;
  value: string;
  icon: string;
}

// NB : 'nouveautes' et 'promotions' correspondent aux liens du MegaMenu ;
// ce ne sont pas des catégories produit mais des filtres basés sur le badge.
const categoryFilters: CategoryFilter[] = [
  { label: 'Toutes',      value: 'toutes',      icon: 'mdi-view-grid-outline' },
  { label: 'Nouveautés',  value: 'nouveautes',  icon: 'mdi-flash-outline' },
  { label: 'Promotions',  value: 'promotions',  icon: 'mdi-percent-outline' },
  { label: 'Homme',       value: 'homme',       icon: 'mdi-tshirt-crew-outline' },
  { label: 'Femme',       value: 'femme',       icon: 'mdi-tshirt-crew-outline' },
  { label: 'Enfants',     value: 'enfants',     icon: 'mdi-seat-outline' },
  { label: 'Chaussures',  value: 'chaussures',   icon: 'mdi-shoe-sneaker' },
  { label: 'Accessoires', value: 'accessoires',  icon: 'mdi-bag-personal-outline' },
];

// ====== Produits filtrés ======
const filteredProducts = computed<Product[]>(() => {
  const sourceProducts = productsStore.products;

  if (sourceProducts.length === 0) {
    return [];
  }

  const category = selectedCategory.value;

  return sourceProducts.filter((product) => {
    // Filtre par catégorie / sélection spéciale (Nouveautés, Promotions)
    if (category === 'nouveautes') {
      if (product.badge !== 'new') return false;
    } else if (category === 'promotions') {
      if (!product.originalPrice && product.badge !== 'promotion') return false;
    } else if (category !== 'toutes' && product.category !== category) {
      return false;
    }

    // Filtre par recherche (sur nom, description et catégorie)
    if (searchQuery.value.trim()) {
      const q = searchQuery.value.trim().toLowerCase();
      const matchesName = product.name.toLowerCase().includes(q);
      const matchesDescription = product.description.toLowerCase().includes(q);
      const matchesCategory = (product.category ?? '').toLowerCase().includes(q);
      if (!matchesName && !matchesDescription && !matchesCategory) {
        return false;
      }
    }

    return true;
  });
});

// ================================================================
// SYNCHRONISATION URL ⇄ ÉTAT LOCAL
// La query string est la source de vérité : à chaque navigation
// (retour navigateur inclus), le filtre appliqué correspond
// exactement à l'URL. Cela évite la Collection vide causée par un
// paramètre ?search= resté dans l'URL alors que le champ avait été
// effacé, ou une catégorie non re-synchronisée.
// ================================================================

// --- URL → local ---
watch(
  () => route.query.search,
  (search) => {
    // Paramètre absent → on VIDE la recherche (corrige le filtre fantôme)
    searchQuery.value = search && typeof search === 'string' ? search : '';
  },
  { immediate: true },
);

watch(
  () => route.query.categorie,
  (categorie) => {
    // Paramètre absent → retour à "Toutes"
    selectedCategory.value =
      categorie && typeof categorie === 'string' ? categorie : 'toutes';
  },
  { immediate: true },
);

// --- Local → URL (router.replace : n'ajoute pas d'entrée d'historique) ---
watch(searchQuery, (value) => {
  const search = value.trim() || undefined;
  updateUrlParams({ search });
});

watch(selectedCategory, (value) => {
  updateUrlParams({ categorie: value === 'toutes' ? undefined : value });
});

/**
 * Met à jour la query string si nécessaire. La comparaison avec l'URL
 * courante évite les boucles de réactivité (URL → local → URL → ...).
 */
function updateUrlParams(params: Record<string, string | undefined>): void {
  // LocationQueryRaw accepte les valeurs de route.query (string | null | string[])
  const query: LocationQueryRaw = { ...route.query };
  for (const [key, value] of Object.entries(params)) {
    if (value) query[key] = value;
    else delete query[key];
  }

  const current = Object.entries(route.query)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}=${String(v)}`);
  const next = Object.entries(query)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}=${String(v)}`);

  if (JSON.stringify(current) !== JSON.stringify(next)) {
    router.replace({ query });
  }
}

// ====== Actions ======
function onAddToCart(product: Product): void {
  cartStore.addItem(product);
}

function resetFilters(): void {
  searchQuery.value = '';
  selectedCategory.value = 'toutes';
}
</script>

<style scoped>
/* ================================================================
   PAGE COLLECTION
   ================================================================ */

.collection-view {
  background: rgb(var(--v-theme-background));
  padding-bottom: 3rem;
}

/* ================================================================
   HERO
   ================================================================ */

.collection-hero {
  position: relative;
  padding-block: 4.5rem 3rem;
  background: linear-gradient(
    160deg,
    rgba(var(--v-theme-primary), 0.06) 0%,
    rgba(var(--v-theme-secondary), 0.04) 50%,
    transparent 100%
  );
  overflow: hidden;
}

.collection-hero::before {
  content: '';
  position: absolute;
  top: -40%;
  right: -10%;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(var(--v-theme-primary), 0.08) 0%,
    transparent 70%
  );
  pointer-events: none;
}

.collection-hero::after {
  content: '';
  position: absolute;
  bottom: -30%;
  left: -10%;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(var(--v-theme-secondary), 0.06) 0%,
    transparent 70%
  );
  pointer-events: none;
}

.hero-title {
  color: rgb(var(--v-theme-on-background));
  line-height: 1.15;
  letter-spacing: -0.02em;
  position: relative;
  z-index: 1;
}

.hero-subtitle {
  max-width: 560px;
  line-height: 1.7;
  position: relative;
  z-index: 1;
}

/* ================================================================
   BARRE DE RECHERCHE
   ================================================================ */

.search-bar-container {
  margin-top: -1rem;
  position: relative;
  z-index: 2;
}

.collection-search {
  max-width: 600px;
  margin-inline: auto;
}

.collection-search :deep(.v-field) {
  background-color: rgb(var(--v-theme-surface)) !important;
  border: 1px solid rgba(var(--v-theme-on-surface), 0.08) !important;
  box-shadow: 0 4px 20px rgba(var(--v-theme-primary), 0.06) !important;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
}

.collection-search :deep(.v-field):hover {
  border-color: rgba(var(--v-theme-primary), 0.25) !important;
}

.collection-search:focus-within :deep(.v-field) {
  border-color: rgb(var(--v-theme-primary)) !important;
  box-shadow: 0 4px 28px rgba(var(--v-theme-primary), 0.12) !important;
}

.collection-search :deep(.v-field__prepend-inner) {
  color: rgba(var(--v-theme-on-surface), 0.4);
  transition: color 0.2s ease;
}

.collection-search:focus-within :deep(.v-field__prepend-inner) {
  color: rgb(var(--v-theme-primary));
}

/* ================================================================
   FILTRES
   ================================================================ */

.filters-container {
  padding-block: 1.5rem;
}

.filters-wrapper {
  display: flex;
  justify-content: center;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  padding-bottom: 4px;
}

.filters-wrapper::-webkit-scrollbar {
  display: none;
}

.category-chips {
  justify-content: center;
  gap: 4px;
}

.category-chip {
  font-weight: 600 !important;
  text-transform: none !important;
  letter-spacing: 0.01em;
  padding-inline: 18px !important;
  border-width: 1.5px !important;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.3s ease !important;
}

.category-chip:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(var(--v-theme-primary), 0.12);
}

.category-chip.chip--active {
  background-color: rgb(var(--v-theme-primary)) !important;
  color: rgb(var(--v-theme-on-primary)) !important;
  border-color: rgb(var(--v-theme-primary)) !important;
  box-shadow: 0 4px 16px rgba(var(--v-theme-primary), 0.25);
}

/* ================================================================
   COMPTEUR DE RÉSULTATS
   ================================================================ */

.results-count {
  opacity: 0.7;
  font-weight: 500;
}

/* ================================================================
   ÉTAT VIDE (aucun résultat)
   ================================================================ */

.empty-state-container {
  padding-block: 2rem 4rem;
}

/* ================================================================
   RESPONSIVE
   ================================================================ */

@media (max-width: 959px) {
  .collection-hero {
    padding-block: 3rem 2.5rem;
  }

  .hero-title {
    font-size: 2.25rem !important;
  }

  .category-chips {
    flex-wrap: nowrap;
    justify-content: flex-start;
  }

  .filters-wrapper {
    justify-content: flex-start;
    padding-inline: 4px;
  }
}

@media (max-width: 600px) {
  .collection-hero {
    padding-block: 2.5rem 2rem;
  }

  .hero-title {
    font-size: 1.75rem !important;
  }

  .hero-subtitle {
    font-size: 0.925rem !important;
  }

  .category-chip {
    font-size: 0.8125rem !important;
    padding-inline: 14px !important;
  }

  .search-bar-container {
    margin-top: -0.5rem;
  }
}
</style>
