/**
 * Mock Data – Données de simulation centralisées.
 *
 * Toutes les données factices sont définies ici et importées
 * par les services. Cela permet de :
 * - Garder les données mockées au même endroit
 * - Faciliter le remplacement par une vraie API
 * - Réutiliser les données entre plusieurs services
 */
import type { Product } from '../types/product';

// ====== Produits de démonstration ======
export const mockProducts: Product[] = [
  {
    id: 'p1',
    name: 'Blazer Céleste',
    description: 'Veste structurée en lin bio, coupe oversize intemporelle.',
    price: 149.0,
    category: 'femme',
    badge: 'new',
  },
  {
    id: 'p2',
    name: 'Chemise Ébène',
    description: 'Chemise en coton égyptien, coupe ajustée et col classique.',
    price: 89.0,
    originalPrice: 120.0,
    category: 'homme',
    badge: 'promotion',
  },
  {
    id: 'p3',
    name: 'Robe Corail',
    description: 'Robe légère en viscose, imprimé floral et taille cintrée.',
    price: 99.0,
    category: 'femme',
    badge: 'new',
  },
  {
    id: 'p4',
    name: 'Sneakers Minimal',
    description: 'Baskets en cuir blanc, semelle crêpe et finitions contrastées.',
    price: 129.0,
    category: 'accessoires',
  },
  {
    id: 'p5',
    name: 'Sac Cabas Nature',
    description: 'Grand cabas en jute recyclé, bandoulière en cuir amovible.',
    price: 79.0,
    category: 'accessoires',
  },
  {
    id: 'p6',
    name: 'Pull Mérinos',
    description: 'Pull col rond en laine mérinos, gris perle et finitions côtelées.',
    price: 109.0,
    originalPrice: 145.0,
    category: 'homme',
    badge: 'promotion',
  },
  {
    id: 'p7',
    name: 'Lunettes Solaires',
    description: 'Monture acétate noire, verres polarisés anti-reflets.',
    price: 159.0,
    category: 'accessoires',
    badge: 'new',
  },
  {
    id: 'p8',
    name: 'Jupe Plissée',
    description: 'Jupe midi plissée en satin, taille élastique confortable.',
    price: 69.0,
    category: 'femme',
  },
];

/** Simule un délai réseau réaliste */
export function simulateDelay(ms = 400): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
