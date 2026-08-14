/**
 * Auth Store – Gestion de l'authentification avec service API et fallback.
 *
 * Délègue les appels réseau à `authService` qui tente d'abord l'API
 * réelle et tombe en mode simulé si le backend est indisponible.
 * Le store gère la persistance du token et l'expiration côté client.
 */
import { defineStore } from 'pinia';
import { authService } from '../services';

// ====== Type représentant un utilisateur connecté ======
export interface AuthUser {
  email: string;
  token: string;
}

/** Durée de validité simulée du token (24h en millisecondes) */
const TOKEN_DURATION_MS = 24 * 60 * 60 * 1000;

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: '',
    userEmail: '',
    /** Timestamp d'émission du token (pour vérifier l'expiration) */
    _issuedAt: 0,
  }),

  getters: {
    /** L'utilisateur est authentifié si le token est valide et non expiré */
    isAuthenticated: (state): boolean => {
      if (!state.token) return false;
      const elapsed = Date.now() - state._issuedAt;
      if (elapsed > TOKEN_DURATION_MS) return false;
      return true;
    },

    /** Informations de l'utilisateur connecté */
    currentUser: (state): AuthUser | null => {
      if (!state.token) return null;
      return { email: state.userEmail, token: state.token };
    },
  },

  actions: {
    /**
     * Initialise la session depuis le localStorage (appelé au démarrage).
     * Restaure le token, l'email et la date d'émission si présents.
     */
    initFromStorage(): void {
      try {
        const stored = localStorage.getItem('boutique_auth');
        if (stored) {
          const data = JSON.parse(stored);
          this.token = data.token ?? '';
          this.userEmail = data.email ?? '';
          this._issuedAt = data.issuedAt ?? 0;
        }
      } catch {
        // Données corrompues → on efface
        this.clearSession();
      }
    },

    /**
     * Connecte l'utilisateur via le service d'authentification.
     *
     * Délègue l'appel à `authService.login()` qui gère lui-même
     * le fallback mock si le backend est indisponible.
     *
     * @param email - Adresse e-mail
     * @param password - Mot de passe
     * @returns Promise résolue avec les infos utilisateur
     * @throws Error si validation échoue ou credentials incorrects
     */
    async login(email: string, password: string): Promise<AuthUser> {
      const response = await authService.login({ email, password });

      this.token = response.token;
      this.userEmail = response.email;
      this._issuedAt = Date.now();

      // Persistance dans localStorage
      this._persist();

      return { email: response.email, token: response.token };
    },

    /**
     * Déconnecte l'utilisateur : efface le token et le localStorage.
     */
    logout(): void {
      this.token = '';
      this.userEmail = '';
      this._issuedAt = 0;
      localStorage.removeItem('boutique_auth');
    },

    /** Alias pour compatibilité avec le Header existant */
    clearSession(): void {
      this.logout();
    },

    /**
     * Sauvegarde la session dans le localStorage.
     */
    _persist(): void {
      try {
        localStorage.setItem(
          'boutique_auth',
          JSON.stringify({
            token: this.token,
            email: this.userEmail,
            issuedAt: this._issuedAt,
          }),
        );
      } catch {
        // Stockage indisponible (navigation privée, etc.) → silencieux
      }
    },
  },
});
