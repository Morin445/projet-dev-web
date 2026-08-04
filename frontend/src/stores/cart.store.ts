/**
 * Cart Store – Gestion du panier avec quantités, prix total et badge.
 *
 * Chaque article est représenté par CartItem (produit + quantité) pour
 * permettre l'ajout multiple, la modification des quantités et le
 * calcul automatique du total.
 */
import { defineStore } from 'pinia';
import type { Product } from '../types/product';

// ====== Type représentant un article dans le panier ======
export interface CartItem {
  product: Product;
  quantity: number;
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
    },

    /**
     * Supprime complètement un article du panier par son id produit.
     */
    removeItem(productId: string): void {
      this.items = this.items.filter((item) => item.product.id !== productId);
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
      }
    },

    /**
     * Vide complètement le panier.
     */
    clearCart(): void {
      this.items = [];
    },
  },
});
