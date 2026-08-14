/**
 * Product – Représentation d'un produit dans la boutique.
 */
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image?: string;
  imageUrl?: string;
  badge?: 'new' | 'promotion';
  category?: string;
  inStock?: boolean;
}
