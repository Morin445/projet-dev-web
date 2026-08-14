/**
 * Services – Barrel d'export.
 *
 * Centralise les exports de tous les services et utilitaires
 * pour des imports plus propres dans les stores et composants.
 *
 * Exemple d'utilisation :
 * ```ts
 * import { api, productService } from '../services';
 * ```
 */

export { default as api } from './api';
export { productService } from './product.service';
export { authService } from './auth.service';

export * from './mock-data';
export * from './types';
