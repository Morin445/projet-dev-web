/**
 * Favorites Store – Gestion des produits favoris (wishlist).
 *
 * Chaque produit est identifié par son id. Le store permet d'ajouter,
 * retirer et vérifier le statut d'un favori, avec un compteur réactif.
 *
 * Persistance : la liste des favoris est sauvegardée dans le localStorage
 * (`boutique_favorites`) et restaurée au démarrage (initFromStorage) afin
 * que les favoris survivent à un rechargement de page (F5).
 */
import { defineStore } from 'pinia';

/** Clé de stockage des favoris dans le localStorage */
const STORAGE_KEY = 'boutique_favorites';

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    /** Liste des ids des produits favoris */
    favoriteIds: [] as string[],
  }),

  getters: {
    /** Nombre total de favoris */
    count: (state): number => state.favoriteIds.length,

    /**
     * Vérifie si un produit est dans les favoris.
     * Retourne une fonction pour une utilisation réactive dans le template.
     */
    isFavorite:
      (state) =>
      (productId: string): boolean =>
        state.favoriteIds.includes(productId),
  },

  actions: {
    /**
     * Restaure les favoris depuis le localStorage (appelé au démarrage).
     * Ignore les données corrompues et ne conserve que des ids valides.
     */
    initFromStorage(): void {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed: unknown = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            this.favoriteIds = parsed.filter(
              (id): id is string => typeof id === 'string',
            );
          }
        }
      } catch {
        // Données corrompues ou stockage indisponible → on repart de zéro
        this.favoriteIds = [];
      }
    },

    /** Sauvegarde la liste des favoris dans le localStorage. */
    _persist(): void {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.favoriteIds));
      } catch {
        // Stockage indisponible (navigation privée, etc.) → silencieux
      }
    },

    /**
     * Ajoute ou retire un produit des favoris (toggle).
     * Retourne le nouveau statut (true = favori, false = retiré).
     */
    toggleFavorite(productId: string): boolean {
      const index = this.favoriteIds.indexOf(productId);
      if (index === -1) {
        this.favoriteIds.push(productId);
        this._persist();
        return true;
      }
      this.favoriteIds.splice(index, 1);
      this._persist();
      return false;
    },

    /** Ajoute un produit aux favoris (sans effet si déjà présent) */
    addFavorite(productId: string): void {
      if (!this.favoriteIds.includes(productId)) {
        this.favoriteIds.push(productId);
        this._persist();
      }
    },

    /** Retire un produit des favoris (sans effet si absent) */
    removeFavorite(productId: string): void {
      const index = this.favoriteIds.indexOf(productId);
      if (index !== -1) {
        this.favoriteIds.splice(index, 1);
        this._persist();
      }
    },
  },
});
