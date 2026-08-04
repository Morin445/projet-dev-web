/**
 * Products Store – Gestion des produits avec service API et fallback mock.
 *
 * Utilise `productService` pour charger les produits. Le service
 * tente d'abord l'API réelle ; en cas d'échec, il retourne les
 * données mockées. Le store reste ainsi fonctionnel sans backend.
 *
 * Les produits de démonstration (mockProducts) sont initialisés
 * directement dans le state pour un affichage immédiat.
 */
import { defineStore } from 'pinia';
import type { Product } from '../types/product';
import { productService, mockProducts } from '../services';

export const useProductsStore = defineStore('products', {
  state: () => ({
    /** Produits chargés (mockés au démarrage, remplacés par l'API si dispo) */
    products: [...mockProducts] as Product[],
    /** Indique si un chargement est en cours */
    loading: false,
    /** Indique si les données proviennent de l'API réelle */
    fromApi: false,
  }),

  actions: {
    /**
     * Charge les produits depuis le service.
     *
     * Le service s'occupe lui-même du fallback : si l'API est
     * indisponible, il retourne les données mockées.
     * Le flag `fromApi` permet aux composants de savoir si les
     * données sont réelles ou de démonstration.
     */
    /**
     * Charge les produits depuis le service.
     * @param force - Si true, force le rechargement même si déjà chargés depuis l'API
     */
    async fetchProducts(force = false): Promise<void> {
      if (this.fromApi && !force) return; // Déjà chargé depuis l'API

      this.loading = true;
      try {
        const data = await productService.getAll();
        this.products = data;
        this.fromApi = true;
      } catch {
        // Les mockProducts sont déjà dans le state
        this.fromApi = false;
      } finally {
        this.loading = false;
      }
    },
  },
});
