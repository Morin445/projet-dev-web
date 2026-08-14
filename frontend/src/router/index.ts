/**
 * Router – Configuration des routes avec guards d'authentification.
 *
 * Les routes marquées `meta: { requiresAuth: true }` nécessitent
 * une connexion active. Si l'utilisateur n'est pas connecté, il est
 * redirigé vers /login avec un paramètre `redirect` pour y revenir
 * après connexion.
 */
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth.store';

// ====== Définition des routes ======
// Les vues sont chargées à la demande (lazy loading) : chaque page
// devient un chunk séparé, téléchargé uniquement à la navigation.
// → bundle initial plus léger et temps de chargement réduit.
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/collection',
    name: 'collection',
    component: () => import('../views/CollectionView.vue'),
  },
  {
    path: '/product/:id',
    name: 'product',
    component: () => import('../views/ProductView.vue'),
    props: true,
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/CartView.vue'),
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: () => import('../views/FavoritesView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/ContactView.vue'),
  },
  // ====== Pages informations (footer) ======
  // Routes dédiées aux pages FAQ, confidentialité, CGV et livraison,
  // accessibles depuis le footer et directement par URL (survivent au F5).
  {
    path: '/faq',
    name: 'faq',
    component: () => import('../views/FaqView.vue'),
  },
  {
    path: '/politique-confidentialite',
    name: 'privacy-policy',
    component: () => import('../views/PrivacyPolicyView.vue'),
  },
  {
    path: '/conditions-generales',
    name: 'terms',
    component: () => import('../views/TermsView.vue'),
  },
  {
    path: '/livraison',
    name: 'delivery',
    component: () => import('../views/DeliveryView.vue'),
  },
  // ====== Catch-all 404 ======
  // Toute route réellement inconnue (URL tapée à la main ou lien obsolète)
  // affiche une page "introuvable" au lieu d'une page blanche.
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFoundView.vue'),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
  // Remonte en haut de page à chaque navigation (sauf retour arrière
  // où la position précédente est restaurée automatiquement).
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition;
    return { top: 0 };
  },
});

// ====== Guard d'authentification ======
// Aucune route ne nécessite actuellement de connexion (le panier est
// public ; la connexion sera exigée au checkout). Le guard est conservé :
// il suffit d'ajouter `meta: { requiresAuth: true }` à une route pour
// la protéger, la redirection vers /login se fera automatiquement.
router.beforeEach((to, _from, next) => {
  // Route publique → accès libre
  if (!to.meta?.requiresAuth) {
    next();
    return;
  }

  // Route protégée → vérifier l'authentification
  const authStore = useAuthStore();

  // S'assurer que le store est initialisé depuis le localStorage
  if (!authStore.token) {
    authStore.initFromStorage();
  }

  if (authStore.isAuthenticated) {
    next();
  } else {
    // Rediriger vers login avec l'URL de retour
    next({ path: '/login', query: { redirect: to.fullPath } });
  }
});
