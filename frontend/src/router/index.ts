import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CollectionView from '../views/CollectionView.vue';
import ProductView from '../views/ProductView.vue';
import CartView from '../views/CartView.vue';
import LoginView from '../views/LoginView.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/collection', name: 'collection', component: CollectionView },
    { path: '/product/:id', name: 'product', component: ProductView, props: true },
    { path: '/cart', name: 'cart', component: CartView },
    { path: '/login', name: 'login', component: LoginView },
  ],
});
