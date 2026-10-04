/**
 * Auth Service – Couche d'accès aux endpoints d'authentification.
 *
 * Tente d'abord un appel à l'API REST. En cas d'échec, utilise une
 * simulation locale avec validation des champs (identique au comportement
 * actuel du store, mais externalisé pour préparer la vraie API).
 *
 * Format de réponse attendu du backend (POST /auth/login, POST /auth/register) :
 * ```json
 * { "token": "jwt...", "email": "user@example.com" }
 * ```
 */
import api from './api';
import type { LoginRequest, LoginResponse, RegisterResponse } from './types';
import { simulateDelay } from './mock-data';

// ====== Constantes ======

const ENDPOINT = '/auth';

// ====== Service ======

export const authService = {
  /**
   * Connecte un utilisateur avec email et mot de passe.
   * @param credentials - Identifiants (email, password)
   * @returns Token et email de l'utilisateur
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await api.post<LoginResponse>(
        `${ENDPOINT}/login`,
        credentials,
      );
      return response.data;
    } catch {
      // Fallback : simulation locale si le backend n'est pas disponible
      await simulateDelay(600);

      // Validation côté client
      if (
        !credentials.email ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.email)
      ) {
        throw new Error('Adresse e-mail invalide.');
      }
      if (!credentials.password || credentials.password.length < 6) {
        throw new Error('Le mot de passe doit contenir au moins 6 caractères.');
      }

      // Compte démo
      if (
        credentials.email === 'demo@boutique.fr' &&
        credentials.password !== 'demo123'
      ) {
        throw new Error('Mot de passe incorrect pour le compte démo.');
      }

      // Génération d'un token factice
      const fakeToken = `tok_${Date.now()}_${btoa(credentials.email)}_sim`;
      return { token: fakeToken, email: credentials.email };
    }
  },

  /**
   * Inscrit un nouvel utilisateur.
   * @param credentials - Informations d'inscription (email, password)
   * @returns Token et email de l'utilisateur créé
   */
  async register(credentials: LoginRequest): Promise<RegisterResponse> {
    try {
      const response = await api.post<RegisterResponse>(
        `${ENDPOINT}/register`,
        credentials,
      );
      return response.data;
    } catch {
      // Fallback : simulation locale
      await simulateDelay(600);

      if (
        !credentials.email ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.email)
      ) {
        throw new Error('Adresse e-mail invalide.');
      }
      if (!credentials.password || credentials.password.length < 6) {
        throw new Error('Le mot de passe doit contenir au moins 6 caractères.');
      }

      const fakeToken = `tok_${Date.now()}_${btoa(credentials.email)}_reg`;
      return { token: fakeToken, email: credentials.email };
    }
  },
};
