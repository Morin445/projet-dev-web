/**
 * Toast Store – Feedback global discret (snackbar).
 *
 * Permet à n'importe quel composant d'afficher un petit message
 * temporaire (ex : "Produit ajouté au panier", "Ajouté aux favoris")
 * via un store Pinia singleton, affiché par le composant GlobalToast
 * monté dans App.vue. Un seul toast à la fois : un nouveau message
 * remplace le précédent et réinitialise le minuteur.
 */
import { defineStore } from 'pinia';

export type ToastColor = 'success' | 'error' | 'info';

/** Durée d'affichage par défaut (ms) */
const DEFAULT_DURATION_MS = 2200;

export const useToastStore = defineStore('toast', {
  state: () => ({
    message: '',
    visible: false,
    color: 'success' as ToastColor,
    _timer: undefined as ReturnType<typeof setTimeout> | undefined,
  }),

  actions: {
    /**
     * Affiche un toast temporaire.
     * @param message - Texte à afficher
     * @param color - Couleur du toast (success, error, info)
     * @param duration - Durée d'affichage en millisecondes
     */
    show(
      message: string,
      color: ToastColor = 'success',
      duration: number = DEFAULT_DURATION_MS,
    ): void {
      this.message = message;
      this.color = color;
      this.visible = true;

      if (this._timer) clearTimeout(this._timer);
      this._timer = setTimeout(() => {
        this.visible = false;
        this._timer = undefined;
      }, duration);
    },

    /** Masque immédiatement le toast (bouton de fermeture). */
    hide(): void {
      this.visible = false;
      if (this._timer) {
        clearTimeout(this._timer);
        this._timer = undefined;
      }
    },
  },
});
