/**
 * Types API – Contrats de communication entre le frontend et le backend.
 *
 * Définit les structures attendues pour les requêtes et réponses
 * des endpoints de l'API. Ces types permettent de remplacer les mocks
 * par une vraie API sans modifier la logique métier des stores.
 */

// ====== Génériques ======

/** Réponse standard de l'API (wrapping) */
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

/** Erreur renvoyée par l'API Express */
export interface ApiError {
  message: string;
  issues?: Array<{ code: string; path: string[]; message: string }>;
}

// ====== Auth ======

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  email: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export type RegisterResponse = LoginResponse;

// ====== Produits ======

export interface ProductFilters {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}
