/**
 * Directive `v-reveal` – Animation d'apparition au scroll.
 *
 * Ajoute un attribut `data-reveal` (variante d'animation) puis bascule
 * la classe `reveal--active` lorsque l'élément entre dans le viewport.
 * Les styles associés sont définis dans `src/styles/global.css`.
 *
 * Utilisation :
 *   v-reveal                          → fade-up par défaut
 *   v-reveal="'zoom-in'"              → variante par nom
 *   v-reveal="{ delay: 120 }"         → options (stagger de listes)
 *   v-reveal="{ variant: 'fade-left', threshold: 0.2, once: false }"
 *
 * ─────────────────────────────────────────────────────────────────
 *  CORRECTIF DÉFINITIF (bug de navigation – pages vides) :
 *  Cause : le reveal du contenu visible au chargement dépendait du
 *  callback ASYNCHRONE de l'IntersectionObserver. Lors d'une navigation
 *  interne (transition `mode="out-in"` + chunk lazy-loaded), ce callback
 *  peut être délivré à un instant où l'élément est mesuré "non intersecté"
 *  (géométrie non stabilisée, scroll pas encore réinitialisé) → l'élément
 *  restait bloqué à `opacity: 0` → page vide, sans erreur console, réparée
 *  par F5 (nouveau montage = nouveau callback).
 *
 *  Correctif (3 volets complémentaires, aucun ne peut échouer seul) :
 *   1. Vérification synchrone à la position réelle (getBoundingClientRect)
 *      au montage + après le premier rendu → le contenu visible au chargement
 *      ne dépend plus JAMAIS du timing de l'IO.
 *   2. IntersectionObserver conservé pour le reveal au scroll du contenu
 *      sous la ligne de flottaison.
 *   3. Filet de sécurité GLOBAL (un seul listener partagé) : à chaque
 *      scroll / resize, tout élément encore masqué ET réellement dans le
 *      viewport est révélé immédiatement. Un contenu visible ne peut donc
 *      plus rester masqué, quel que soit l'ordre des événements navigateur.
 * ─────────────────────────────────────────────────────────────────
 */
import type { Directive, DirectiveBinding } from 'vue';

export type RevealVariant =
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'zoom-in';

export interface RevealOptions {
  /** Variante d'animation (par défaut : fade-up) */
  variant?: RevealVariant;
  /** Délai avant l'animation, en ms (utile pour les listes en cascade) */
  delay?: number;
  /** Proportion de l'élément visible pour déclencher (0-1) */
  threshold?: number;
  /** true = animer une seule fois, false = animer à chaque entrée/sortie */
  once?: boolean;
}

interface RevealElement extends HTMLElement {
  __revealObserver?: IntersectionObserver;
}

const DEFAULT: Required<RevealOptions> = {
  variant: 'fade-up',
  delay: 0,
  threshold: 0.12,
  once: true,
};

/** Normalise la valeur du binding (string = variante, objet = options). */
function normalize(
  value: RevealVariant | RevealOptions | undefined,
): Required<RevealOptions> {
  if (typeof value === 'string') return { ...DEFAULT, variant: value };
  if (value && typeof value === 'object') return { ...DEFAULT, ...value };
  return { ...DEFAULT };
}

/** Détecte la préférence système de réduction des animations. */
function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Nettoie la propriété `will-change` une fois l'animation terminée :
 * évite de garder des couches GPU actives inutilement sur toutes les
 * cartes / sections déjà révélées (micro-optimisation).
 */
function clearWillChange(el: RevealElement): void {
  el.style.willChange = 'auto';
}

/**
 * Vérifie si l'élément est réellement dans le viewport (mesure DOM
 * synchrone et fiable à n'importe quel instant du rendu).
 */
function isInViewport(el: RevealElement): boolean {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

// ================================================================
// FILET DE SÉCURITÉ GLOBAL (volet 3)
// Un unique listener scroll/resize, partagé par tous les éléments
// encore masqués : tant qu'un élément n'est pas révélé, chaque
// scroll / resize re-vérifie sa position réelle et le révèle si
// besoin. Élimine toute dépendance à l'ordre des événements du
// navigateur lors d'une navigation client.
// ================================================================
const pendingReveals = new Set<RevealElement>();

function checkPendingReveals(): void {
  pendingReveals.forEach((el) => {
    if (isInViewport(el)) {
      el.classList.add('reveal--active');
      pendingReveals.delete(el);
    }
  });
  if (pendingReveals.size === 0) {
    window.removeEventListener('scroll', checkPendingReveals);
    window.removeEventListener('resize', checkPendingReveals);
  }
}

function trackPendingReveal(el: RevealElement): void {
  if (pendingReveals.size === 0) {
    window.addEventListener('scroll', checkPendingReveals, { passive: true });
    window.addEventListener('resize', checkPendingReveals, { passive: true });
  }
  pendingReveals.add(el);
}

function untrackPendingReveal(el: RevealElement): void {
  pendingReveals.delete(el);
  if (pendingReveals.size === 0) {
    window.removeEventListener('scroll', checkPendingReveals);
    window.removeEventListener('resize', checkPendingReveals);
  }
}

export const reveal: Directive<RevealElement, RevealVariant | RevealOptions | undefined> = {
  mounted(el: RevealElement, binding: DirectiveBinding) {
    const opts = normalize(binding.value);

    // Accessibilité : affichage immédiat si l'animation est réduite côté OS
    if (prefersReducedMotion()) {
      el.dataset.reveal = opts.variant;
      requestAnimationFrame(() => {
        el.classList.add('reveal--active');
        clearWillChange(el);
      });
      return;
    }

    el.dataset.reveal = opts.variant;
    if (opts.delay) el.style.transitionDelay = `${opts.delay}ms`;

    // Supprime `will-change` quand l'animation d'entrée est terminée
    const onRevealEnd = (e: TransitionEvent): void => {
      if (e.propertyName === 'transform' || e.propertyName === 'opacity') {
        clearWillChange(el);
        el.removeEventListener('transitionend', onRevealEnd);
      }
    };
    el.addEventListener('transitionend', onRevealEnd);

    // Volet 2 – Observateur : reveal au scroll (contenu sous la ligne de
    // flottaison). Le callback croise le verdict de l'IO avec une mesure
    // DOM synchrone pour se prémunir d'un verdict périmé.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const actuallyInView = entry.isIntersecting || isInViewport(el);
          if (actuallyInView) {
            el.classList.add('reveal--active');
            if (opts.once) observer.unobserve(el);
            untrackPendingReveal(el);
          } else if (!opts.once) {
            // Variante "rejouable" : on masque à nouveau à la sortie
            el.classList.remove('reveal--active');
          }
        });
      },
      {
        threshold: opts.threshold,
        // Déclenche légèrement avant que l'élément atteigne le bas de l'écran
        rootMargin: '0px 0px -40px 0px',
      },
    );

    observer.observe(el);
    el.__revealObserver = observer;

    // Volet 3 – Filet de sécurité : tant que l'élément n'est pas révélé,
    // chaque scroll / resize re-vérifie sa position réelle.
    trackPendingReveal(el);

    // Volet 1 – Vérification synchrone après le premier rendu : si
    // l'élément est déjà dans le viewport (contenu au-dessus de la ligne
    // de flottaison), on le révèle immédiatement. La transition d'entrée
    // reste animée (le double rAF laisse le premier paint s'exécuter).
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (isInViewport(el)) {
          el.classList.add('reveal--active');
          // Respecte l'option `once` : pour une variante rejouable
          // (once: false), l'observateur reste actif pour re-masquer
          // l'élément à sa sortie du viewport.
          if (opts.once) observer.unobserve(el);
          untrackPendingReveal(el);
        }
      });
    });
  },

  updated(el: RevealElement, binding: DirectiveBinding) {
    // Met à jour le délai si la position dans une liste change (ex: filtrage)
    const opts = normalize(binding.value);
    el.style.transitionDelay = opts.delay ? `${opts.delay}ms` : '0ms';
  },

  unmounted(el: RevealElement) {
    el.__revealObserver?.disconnect();
    delete el.__revealObserver;
    untrackPendingReveal(el);
    // Nettoyage défensif de la propriété GPU si l'élément est démonté
    clearWillChange(el);
  },
};

export default reveal;
