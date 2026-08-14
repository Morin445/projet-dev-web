/**
 * Product Service – Couche d'accès aux données produits.
 *
 * Tente d'abord un appel à l'API REST. En cas d'échec (backend
 * indisponible), retourne les données mockées. Ce comportement
 * permet de développer sans backend tout en préparant la vraie API.
 *
 * Pour basculer définitivement sur l'API, il suffit de supprimer
 * les blocs catch qui renvoient les mocks.
 */
import api from './api';
import type { Product } from '../types/product';
import type { ProductFilters } from './types';
import { mockProducts, simulateDelay } from './mock-data';

// ====== Constantes ======

/** Préfixe du endpoint produits */
const ENDPOINT = '/products';

// ====== Fonctions utilitaires ======

/**
 * Filtre les produits mockés selon les critères donnés.
 * Utile pour la recherche côté client en mode fallback.
 */
function filterMockProducts(filters?: ProductFilters): Product[] {
  let results = [...mockProducts];

  if (filters?.category) {
    results = results.filter((p) => p.category === filters.category);
  }

  if (filters?.search) {
    const q = filters.search.toLowerCase();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.category ?? '').toLowerCase().includes(q),
    );
  }

  if (filters?.page && filters?.limit) {
    const start = (filters.page - 1) * filters.limit;
    results = results.slice(start, start + filters.limit);
  }

  return results;
}

// ====== Service ======

export const productService = {
  /**
   * Récupère la liste complète des produits.
   * @param filters - Filtres optionnels (catégorie, recherche, pagination)
   */
  async getAll(filters?: ProductFilters): Promise<Product[]> {
    try {
      const params: Record<string, string> = {};
      if (filters?.category) params.category = filters.category;
      if (filters?.search) params.search = filters.search;
      if (filters?.page) params.page = String(filters.page);
      if (filters?.limit) params.limit = String(filters.limit);

      const response = await api.get<Product[]>(ENDPOINT, { params });
      return response.data;
    } catch {
      // Fallback : données mockées avec délai simulé
      await simulateDelay(300);
      return filterMockProducts(filters);
    }
  },

  /**
   * Récupère un produit par son identifiant.
   * @param id - Identifiant unique du produit
   */
  async getById(id: string): Promise<Product | null> {
    try {
      const response = await api.get<Product>(`${ENDPOINT}/${id}`);
      return response.data;
    } catch {
      // Fallback : recherche dans les données mockées
      await simulateDelay(200);
      return mockProducts.find((p) => p.id === id) ?? null;
    }
  },
};
