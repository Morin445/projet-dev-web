<template>
  <!-- ====== Barre de navigation principale ====== -->
  <v-app-bar
    elevation="2"
    color="white"
    class="app-header"
    density="comfortable"
    scroll-behavior="elevate"
  >
    <!-- Hamburger (mobile seulement) -->
    <template #prepend>
      <v-app-bar-nav-icon
        variant="text"
        class="d-md-none"
        @click.stop="mobileDrawer = !mobileDrawer"
        aria-label="Menu de navigation"
      />
    </template>

    <!-- Logo / Titre "Boutique" -->
    <template #title>
      <v-toolbar-title
        class="font-weight-bold text-primary cursor-pointer text-h6 text-sm-h5"
        @click="router.push('/')"
        aria-label="Retour à l'accueil"
      >
        Boutique
      </v-toolbar-title>
    </template>

    <!-- ====== Liens centraux + barre de recherche – visible à partir de md ====== -->
    <template #default>
      <div class="d-none d-md-flex align-center ga-1 flex-grow-1 justify-center">
        <v-btn
          v-for="link in navLinks"
          :key="link.label"
          variant="text"
          :to="link.to"
          :active="route.path === link.to"
          :prepend-icon="link.icon"
          class="text-body-2 font-weight-medium nav-link"
          rounded="lg"
        >
          {{ link.label }}
        </v-btn>

        <!-- MegaMenu : dropdown "Catégories" -->
        <v-menu
          :close-on-content-click="false"
          offset="8"
          transition="slide-y-transition"
        >
          <template #activator="{ props }">
            <v-btn
              v-bind="props"
              variant="text"
              rounded="lg"
              class="text-body-2 font-weight-medium nav-link"
            >
              <v-icon start>mdi-shape-outline</v-icon>
              Catégories
              <v-icon end>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <MegaMenu class="pa-2" />
        </v-menu>

        <!-- ====== Barre de recherche (desktop – visible à partir de lg) ====== -->
        <v-text-field
          v-model="searchQuery"
          variant="solo-filled"
          density="compact"
          placeholder="Rechercher un produit..."
          hide-details
          flat
          rounded="pill"
          single-line
          clearable
          prepend-inner-icon="mdi-magnify"
          class="search-bar-desktop d-none d-lg-flex mx-4"
          @keydown.enter="handleSearch"
          @click:clear="searchQuery = ''"
          @click:prepend-inner="handleSearch"
        />
      </div>
    </template>

    <!-- ====== Icônes actions (droite) ====== -->
    <template #append>
      <!-- Recherche mobile : icône de loupe (visible jusqu'à lg) -->
      <v-btn
        icon
        variant="text"
        class="d-lg-none action-icon"
        @click="mobileSearchOpen = !mobileSearchOpen"
        aria-label="Rechercher"
      >
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <!-- Favoris avec badge (caché sur très petit écran) → page Mes favoris -->
      <v-btn
        icon
        variant="text"
        class="action-icon d-none d-sm-flex"
        :class="{ 'icon-bump': favBump }"
        to="/favorites"
        aria-label="Mes favoris"
        @animationend="favBump = false"
      >
        <v-badge
          :content="favoritesStore.count"
          color="error"
          :model-value="favoritesStore.count > 0"
        >
          <v-icon>mdi-heart-outline</v-icon>
        </v-badge>
      </v-btn>

      <!-- Panier avec badge -->
      <v-btn
        icon
        variant="text"
        class="action-icon"
        :class="{ 'icon-bump': cartBump }"
        @click="cartDrawer = !cartDrawer"
        aria-label="Panier"
        @animationend="cartBump = false"
      >
        <v-badge
          :content="cartStore.count"
          color="primary"
          :model-value="cartStore.count > 0"
        >
          <v-icon>mdi-cart-outline</v-icon>
        </v-badge>
      </v-btn>

      <!-- Compte : menu dropdown si connecté, lien login sinon -->
      <template v-if="authStore.isAuthenticated">
        <v-menu min-width="200" offset="6">
          <template #activator="{ props }">
            <v-btn icon variant="text" v-bind="props" aria-label="Mon compte" class="action-icon">
              <v-icon>mdi-account</v-icon>
            </v-btn>
          </template>
          <v-list density="compact" nav>
            <v-list-item
              prepend-icon="mdi-account-circle-outline"
              :title="authStore.userEmail"
              subtitle="Connecté"
              density="comfortable"
            />
            <v-divider />
            <v-list-item
              prepend-icon="mdi-logout-variant"
              title="Déconnexion"
              value="logout"
              @click="handleDesktopLogout"
            />
          </v-list>
        </v-menu>
      </template>
      <template v-else>
        <v-btn icon variant="text" to="/login" aria-label="Connexion" class="action-icon">
          <v-icon>mdi-account-outline</v-icon>
        </v-btn>
      </template>
    </template>

    <!-- ====== Barre de recherche mobile (extension sous le header) ====== -->
    <template #extension>
      <transition name="search-slide">
        <div v-if="mobileSearchOpen" class="pa-2 w-100 bg-white">
          <v-text-field
            v-model="searchQuery"
            variant="solo-filled"
            density="compact"
            placeholder="Rechercher un produit..."
            hide-details
            flat
            rounded="pill"
            single-line
            clearable
            prepend-inner-icon="mdi-magnify"
            autofocus
            @keydown.enter="handleSearch"
            @click:clear="searchQuery = ''"
          />
        </div>
      </transition>
    </template>
  </v-app-bar>

  <!-- ====== Navigation drawer mobile ====== -->
  <v-navigation-drawer
    v-model="mobileDrawer"
    temporary
    location="left"
    :width="mobileDrawerWidth"
    class="mobile-drawer"
  >
    <!-- En-tête du drawer -->
    <template #prepend>
      <v-list-item class="pa-4" lines="two">
        <template #prepend>
          <v-avatar color="primary" variant="tonal" size="40">
            <v-icon>mdi-store-outline</v-icon>
          </v-avatar>
        </template>
        <v-list-item-title class="font-weight-bold text-primary">
          Boutique
        </v-list-item-title>
        <v-list-item-subtitle v-if="authStore.isAuthenticated" class="text-caption">
          {{ authStore.userEmail }}
        </v-list-item-subtitle>
        <template #append>
          <v-btn icon variant="text" size="small" @click="mobileDrawer = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
      </v-list-item>
      <v-divider />
    </template>

    <!-- Liens de navigation mobile -->
    <v-list density="compact" nav>
      <v-list-item
        v-for="link in mobileNavLinks"
        :key="link.label"
        :prepend-icon="link.icon"
        :title="link.label"
        :to="link.to"
        :value="link.label"
        @click="handleMobileNavClick(link)"
        rounded="xl"
        class="my-1"
      />
      <v-divider class="my-2" />

      <!-- Catégories via MegaMenu dans le drawer mobile -->
      <v-list-subheader class="text-uppercase text-caption font-weight-bold text-medium-emphasis mt-2">
        Catégories
      </v-list-subheader>
      <MegaMenu class="mobile-mega-menu" />
    </v-list>
  </v-navigation-drawer>

  <!-- ====== Drawer panier (droite) ====== -->
  <v-navigation-drawer
    v-model="cartDrawer"
    temporary
    location="right"
    :width="cartDrawerWidth"
    class="cart-drawer-panel"
  >
    <CartDrawer @close="cartDrawer = false" />
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, computed, watch, defineAsyncComponent } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useDisplay } from 'vuetify';
import { useCartStore } from '../../stores/cart.store';
import { useAuthStore } from '../../stores/auth.store';
import { useFavoritesStore } from '../../stores/favorites.store';

// ====== Composants découpés en chunks dédiés (code-splitting) ======
// Le MegaMenu et le CartDrawer sont importés dynamiquement : ils forment
// des chunks séparés (meilleur cache navigateur, bundle principal allégé).
// NB : le v-menu desktop ne les instancie qu'à la première ouverture ;
// le drawer mobile, toujours monté, déclenche le téléchargement du chunk
// dès le chargement de la page (chunk léger, ~1-4 kB).
const MegaMenu = defineAsyncComponent(() => import('./MegaMenu.vue'));
const CartDrawer = defineAsyncComponent(() => import('./CartDrawer.vue'));

/* ---- États locaux ---- */
const mobileDrawer = ref(false);
const cartDrawer = ref(false);
const mobileSearchOpen = ref(false);
const searchQuery = ref('');

/* ---- Micro-animations : badge panier & favoris ---- */
// Un petit "bounce" est déclenché à chaque changement de quantité / favori
// pour attirer l'œil vers l'icône correspondante.
const cartBump = ref(false);
const favBump = ref(false);

/* ---- Breakpoints réactifs (largeurs responsives des drawers) ---- */
const display = useDisplay();

// Drawer navigation : pleine largeur sur très petits écrans, sinon 300px
const mobileDrawerWidth = computed<number>(() =>
  display.xs.value ? Math.min(300, display.width.value) : 300,
);

// Drawer panier : pleine largeur sur mobile (< sm), sinon 420px
const cartDrawerWidth = computed<number>(() =>
  display.xs.value ? display.width.value : 420,
);

/* ---- Stores & routeurs ---- */
const router = useRouter();
const route = useRoute();
const cartStore = useCartStore();
const authStore = useAuthStore();
const favoritesStore = useFavoritesStore();

/* ---- Watchers : bump des badges (placés APRÈS les stores) ---- */
watch(
  () => cartStore.count,
  () => {
    cartBump.value = false;
    requestAnimationFrame(() => {
      cartBump.value = true;
    });
  },
);

watch(
  () => favoritesStore.count,
  () => {
    favBump.value = false;
    requestAnimationFrame(() => {
      favBump.value = true;
    });
  },
);

/* ---- Liens de navigation (desktop) ---- */
interface NavLink {
  label: string;
  to: string;
  icon: string;
}

const navLinks: NavLink[] = [
  { label: 'Accueil', to: '/', icon: 'mdi-home-outline' },
  { label: 'Collection', to: '/collection', icon: 'mdi-view-grid-outline' },
  { label: 'À propos', to: '/about', icon: 'mdi-information-outline' },
  { label: 'Contact', to: '/contact', icon: 'mdi-email-outline' },
];

/* ---- Liens de navigation (mobile) – computed pour réactivité ---- */
const mobileNavLinks = computed<NavLink[]>(() => [
  ...navLinks,
  { label: 'Favoris', to: '/favorites', icon: 'mdi-heart-outline' },
  { label: 'Panier', to: '/cart', icon: 'mdi-cart-outline' },
  {
    label: authStore.isAuthenticated ? 'Déconnexion' : 'Connexion',
    to: authStore.isAuthenticated ? '#' : '/login',
    icon: authStore.isAuthenticated ? 'mdi-logout' : 'mdi-account-outline',
  },
]);

/* ---- Gestion de la déconnexion (desktop) ---- */
function handleDesktopLogout(): void {
  authStore.logout();
  router.push('/');
}

/* ---- Gestion du clic sur un lien mobile ---- */
function handleMobileNavClick(link: NavLink): void {
  mobileDrawer.value = false;

  // Seulement gérer le cas spécial de la déconnexion
  // Les autres liens sont gérés par :to sur le v-list-item
  if (link.label === 'Déconnexion') {
    authStore.logout();
    router.push('/');
  }
}

/* ---- Gestion de la recherche ---- */
/**
 * Redirige vers la page Collection avec le terme de recherche en paramètre.
 * Seule logique front-end : aucune requête backend directe.
 */
function handleSearch(): void {
  const query = searchQuery.value.trim();
  if (query) {
    // Fusionne avec la query actuelle : préserve un éventuel filtre
    // catégorie actif (ex: /collection?categorie=femme → recherche dédiée).
    router.push({
      path: '/collection',
      query: { ...route.query, search: query },
    });
    mobileSearchOpen.value = false;
  }
}
</script>

<style scoped>
/* ====== Conteneur principal du header ====== */
.app-header {
  transition: box-shadow 0.3s ease;
}

/* ====== Liens de navigation ====== */
.nav-link {
  text-transform: none !important;
  letter-spacing: 0.015em;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.nav-link:hover {
  background-color: rgba(var(--v-theme-primary), 0.06);
}

/* ====== Barre de recherche desktop ====== */
.search-bar-desktop {
  max-width: 260px;
  min-width: 180px;
  transition: max-width 0.3s ease;
}

.search-bar-desktop:focus-within {
  max-width: 320px;
}

.search-bar-desktop :deep(.v-field) {
  background-color: rgba(var(--v-theme-surface-variant), 0.4) !important;
  transition: background-color 0.2s ease, box-shadow 0.2s ease;
}

.search-bar-desktop :deep(.v-field):hover,
.search-bar-desktop:focus-within :deep(.v-field) {
  background-color: rgba(var(--v-theme-surface-variant), 0.7) !important;
}

/* ====== Boutons d'icônes d'action ====== */
.action-icon {
  transition: transform 0.2s ease;
}

.action-icon:hover {
  transform: scale(1.1);
}

/* --- Micro-animation "bump" quand un badge change (panier / favoris) --- */
.icon-bump {
  animation: icon-bump 0.4s var(--app-ease-snap);
}

@keyframes icon-bump {
  0% {
    transform: scale(1);
  }
  40% {
    transform: scale(1.22);
  }
  100% {
    transform: scale(1);
  }
}

/* ====== Drawer mobile ====== */
.mobile-drawer :deep(.v-list-item--nav) {
  margin-inline: 8px;
}

/* ====== MegaMenu dans le drawer mobile ====== */
.mobile-mega-menu :deep(a) {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  margin: 2px 8px;
  border-radius: 12px;
  color: rgba(0, 0, 0, 0.87);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: background-color 0.2s ease;
}

.mobile-mega-menu :deep(a:hover) {
  background-color: rgba(var(--v-theme-primary), 0.06);
}

.mobile-mega-menu :deep(a::before) {
  content: '›';
  font-size: 1.1rem;
  color: rgb(var(--v-theme-primary));
}

/* ====== Transition pour la barre de recherche mobile ====== */
.search-slide-enter-active {
  animation: search-slide-in 0.25s ease-out;
}

.search-slide-leave-active {
  animation: search-slide-in 0.2s ease-in reverse;
}

@keyframes search-slide-in {
  from {
    opacity: 0;
    transform: translateY(-8px);
    max-height: 0;
  }
  to {
    opacity: 1;
    transform: translateY(0);
    max-height: 60px;
  }
}
</style>
