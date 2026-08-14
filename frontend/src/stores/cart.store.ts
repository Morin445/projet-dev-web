/**
 * Cart Store – Gestion du panier avec quantités, prix total et badge.
 *
 * Chaque article est représenté par CartItem (produit + quantité) pour
 * permettre l'ajout multiple, la modification des quantités et le
 * calcul automatique du total.
 *
 * Persistance : le panier est sauvegardé dans le localStorage
 * (`boutique_cart`) et restauré au démarrage (initFromStorage) afin
 * que le panier survive à un rechargement de page (F5), au même
 * titre que les favoris.
 */
import { defineStore } from 'pinia';
import type { Product } from '../types/product';

// ====== Type représentant un article dans le panier ======
export interface CartItem {
  product: Product;
  quantity: number;
}

/** Clé de stockage du panier dans le localStorage */
const STORAGE_KEY = 'boutique_cart';

/**
 * Valide qu'une valeur issue du localStorage est bien un article
 * de panier (forme minimale : produit avec id/nom/prix + quantité > 0).
 * Évite d'afficher des données corrompues après un F5.
 */
function isValidCartItem(value: unknown): value is CartItem {
  if (!value || typeof value !== 'object') return false;
  const item = value as Partial<CartItem>;
  const product = item.product as Partial<Product> | undefined;
  return Boolean(
    product &&
      typeof product.id === 'string' &&
      typeof product.name === 'string' &&
      typeof product.price === 'number' &&
      typeof item.quantity === 'number' &&
      item.quantity > 0,
  );
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
  }),

  getters: {
    /**
     * Nombre total d'articles (somme des quantités).
     * Utilisé dans le badge du Header.
     */
    count: (state): number =>
      state.items.reduce((sum, item) => sum + item.quantity, 0),

    /**
     * Total du panier en euros (prix × quantité).
     */
    total: (state): number =>
      state.items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0,
      ),
  },

  actions: {
    /**
     * Restaure le panier depuis le localStorage (appelé au démarrage).
     * Ignore les données corrompues et ne conserve que des articles valides.
     */
    initFromStorage(): void {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed: unknown = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            this.items = parsed.filter(isValidCartItem);
          }
        }
      } catch {
        // Données corrompues ou stockage indisponible → on repart de zéro
        this.items = [];
      }
    },

    /** Sauvegarde le panier dans le localStorage. */
    _persist(): void {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
      } catch {
        // Stockage indisponible (navigation privée, etc.) → silencieux
      }
    },

    /**
     * Ajoute un produit au panier.
     * Si le produit est déjà présent, incrémente la quantité.
     */
    addItem(product: Product): void {
      const existing = this.items.find((item) => item.product.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        this.items.push({ product, quantity: 1 });
      }
      this._persist();
    },

    /**
     * Supprime complètement un article du panier par son id produit.
     */
    removeItem(productId: string): void {
      this.items = this.items.filter((item) => item.product.id !== productId);
      this._persist();
    },

    /**
     * Modifie la quantité d'un article.
     * Si la quantité passe à 0 ou moins, l'article est retiré.
     */
    updateQuantity(productId: string, quantity: number): void {
      if (quantity <= 0) {
        this.removeItem(productId);
        return;
      }
      const item = this.items.find((item) => item.product.id === productId);
      if (item) {
        item.quantity = quantity;
        this._persist();
      }
    },

    /**
     * Vide complètement le panier.
     */
    clearCart(): void {
      this.items = [];
      this._persist();
    },
  },
});
