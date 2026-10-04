import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.min.css';
import { createVuetify } from 'vuetify';

/**
 * THÈME PREMIUM « OR » – boutique élégante
 * ---------------------------------------------------------------
 * Palette unique appliquée automatiquement à tous les composants
 * (les styles du projet utilisent rgb(var(--v-theme-*)) partout,
 * donc ce thème recolore l'ensemble de l'application).
 *
 * - Background : #FAFAFA   (gris très clair, doux)
 * - Surface    : #FFFFFF   (cartes, menus, champs)
 * - Texte      : #1F2937   (gris ardoise, contraste confortable)
 * - Primaire   : #D4AF37   (or élégant – CTAs, accents, liens)
 * - Secondaire : #6B7280   (texte d'appui, icônes)
 * - Bordures   : #E5E7EB   (traits fins uniformes)
 * - Succès     : #16A34A   ·  Erreur : #DC2626
 */
export const vuetify = createVuetify({
  theme: {
    defaultTheme: 'premiumLight',
    themes: {
      premiumLight: {
        dark: false,
        colors: {
          // --- Fonds ---
          background: '#FAFAFA',
          surface: '#FFFFFF',
          'surface-variant': '#F3F4F6',
          'surface-bright': '#FFFFFF',
          'surface-dim': '#F3F4F6',

          // --- Textes ---
          'on-background': '#1F2937',
          'on-surface': '#1F2937',
          'on-surface-variant': '#6B7280',
          'on-surface-bright': '#1F2937',

          // --- Primaire (or) & secondaire ---
          primary: '#D4AF37',
          'primary-darken-1': '#B8962E',
          'primary-lighten-1': '#E3C95C',
          // Texte sombre sur or : meilleur contraste (accessibilité)
          // et rendu premium des CTA (lisibilité > 6:1).
          'on-primary': '#1F2937',
          secondary: '#6B7280',
          'secondary-darken-1': '#4B5563',
          'on-secondary': '#FFFFFF',

          // --- Bordures / contours ---
          outline: '#E5E7EB',
          'outline-variant': '#EEF0F3',

          // --- États ---
          success: '#16A34A',
          'on-success': '#FFFFFF',
          error: '#DC2626',
          'on-error': '#FFFFFF',
          info: '#3B82F6',
          'on-info': '#FFFFFF',
          warning: '#F59E0B',
          'on-warning': '#FFFFFF',
        },
      },
    },
  },
  // ====== Harmonisation des rayons par défaut ======
  // Les composants qui précisent déjà rounded="xl"/"pill" gardent leur
  // valeur explicite ; ceux qui n'en précisent pas héritent de ces
  // valeurs cohérentes (mêmes coins arrondis partout).
  defaults: {
    VCard: { rounded: 'xl', elevation: 0 },
    VTextField: { rounded: 'lg' },
    VTextarea: { rounded: 'lg' },
    VAlert: { rounded: 'lg' },
    VList: { rounded: 'lg' },
  },
  icons: {
    defaultSet: 'mdi',
  },
});
