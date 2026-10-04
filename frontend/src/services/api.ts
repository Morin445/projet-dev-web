/**
 * Client Axios – Instance centralisée avec intercepteurs.
 *
 * Configuration de base :
 * - URL du backend depuis VITE_API_URL (fallback localhost:4000)
 * - Timeout de 10 secondes
 * - Injection automatique du token JWT dans le header Authorization
 * - Intercepteur de réponse pour normaliser les erreurs
 */
import axios from 'axios';
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from 'axios';
import type { ApiError } from './types';

// ====== Création de l'instance Axios ======
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:4000',
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ====== Intercepteur Requête : injection du token ======
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('boutique_auth');
    if (token) {
      try {
        const parsed = JSON.parse(token);
        if (parsed.token) {
          config.headers.Authorization = `Bearer ${parsed.token}`;
        }
      } catch {
        // Token corrompu dans le localStorage → on ignore
      }
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

// ====== Intercepteur Réponse : normalisation des erreurs ======
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    // Extraction du message d'erreur renvoyé par l'API
    const message =
      error.response?.data?.message ??
      error.message ??
      'Erreur réseau. Vérifiez votre connexion.';

    // Log en développement
    if (import.meta.env.DEV) {
      console.warn('[API Error]', message, error.config?.url);
    }

    return Promise.reject(new Error(message));
  },
);

export default api;
