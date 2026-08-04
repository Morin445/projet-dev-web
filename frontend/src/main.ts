import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { router } from './router';
import { vuetify } from './plugins/vuetify';
import { useAuthStore } from './stores/auth.store';
import { useFavoritesStore } from './stores/favorites.store';

// ====== Styles globaux & design tokens (voir src/styles/global.css) ======
// Contient aussi les transitions de page, le reveal au scroll et
// le support de prefers-reduced-motion.
import './styles/global.css';

// ====== Directive globale `v-reveal` (apparition animée au scroll) ======
import reveal from './directives/reveal';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(vuetify);

// Directive réutilisable sur toutes les sections / cartes de l'application
app.directive('reveal', reveal);

// Restaurer la session utilisateur depuis le localStorage
const authStore = useAuthStore();
authStore.initFromStorage();

// Restaurer les favoris depuis le localStorage (survit au F5)
const favoritesStore = useFavoritesStore();
favoritesStore.initFromStorage();

app.mount('#app');