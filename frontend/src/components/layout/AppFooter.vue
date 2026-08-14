<template>
  <!-- ====== Footer principal ====== -->
  <footer class="app-footer">
    <!-- ====== Contenu principal ====== -->
    <v-container class="footer-container">
      <v-row>
        <!-- ====== Colonne 1 – Boutique ====== -->
        <v-col cols="12" md="3" class="footer-col">
          <div class="brand-wrapper">
            <v-icon color="primary" size="28" class="brand-icon">mdi-storefront-outline</v-icon>
            <span class="text-h6 font-weight-bold text-primary brand-name">Boutique</span>
          </div>
          <p class="brand-description text-body-2 text-medium-emphasis mt-3">
            Votre destination mode pour des vêtements et accessoires élégants,
            responsables et intemporels. Créée en 2020, notre boutique vous
            accompagne au quotidien avec des pièces soigneusement sélectionnées.
          </p>

          <!-- Réseaux sociaux -->
          <div class="social-links mt-4">
            <v-btn
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              icon
              variant="text"
              size="small"
              class="social-btn"
              :aria-label="social.name"
            >
              <v-icon size="20">{{ social.icon }}</v-icon>
            </v-btn>
          </div>
        </v-col>

        <!-- ====== Colonne 2 – Navigation ====== -->
        <v-col cols="6" md="3" class="footer-col">
          <h4 class="footer-heading text-subtitle-2 font-weight-bold text-uppercase mb-3">
            Navigation
          </h4>
          <ul class="footer-links">
            <li v-for="link in navLinks" :key="link.label">
              <v-btn
                variant="text"
                size="small"
                class="footer-link text-body-2"
                :to="link.to"
              >
                {{ link.label }}
              </v-btn>
            </li>
          </ul>
        </v-col>

        <!-- ====== Colonne 3 – Informations ====== -->
        <v-col cols="6" md="3" class="footer-col">
          <h4 class="footer-heading text-subtitle-2 font-weight-bold text-uppercase mb-3">
            Informations
          </h4>
          <ul class="footer-links">
            <li v-for="info in infoLinks" :key="info.label">
              <v-btn
                variant="text"
                size="small"
                class="footer-link text-body-2"
                :to="info.to"
              >
                {{ info.label }}
              </v-btn>
            </li>
          </ul>
        </v-col>

        <!-- ====== Colonne 4 – Newsletter ====== -->
        <v-col cols="12" md="3" class="footer-col">
          <h4 class="footer-heading text-subtitle-2 font-weight-bold text-uppercase mb-3">
            Newsletter
          </h4>
          <p class="text-body-2 text-medium-emphasis mb-3 newsletter-desc">
            Recevez nos offres exclusives et les dernières tendances directement
            dans votre boîte mail.
          </p>
          <v-form
            class="newsletter-form"
            @submit.prevent="onSubscribe"
          >
            <v-text-field
              v-model="email"
              variant="solo-filled"
              density="compact"
              placeholder="Votre adresse e-mail"
              hide-details
              flat
              rounded="pill"
              single-line
              type="email"
              class="newsletter-input"
              :error-messages="emailError"
            />
            <v-btn
              type="submit"
              color="primary"
              variant="elevated"
              rounded="pill"
              size="small"
              class="newsletter-btn mt-2"
              :disabled="!email"
            >
              S'abonner
              <v-icon end size="16">mdi-send</v-icon>
            </v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-container>

    <!-- ====== Barre inférieure ====== -->
    <div class="footer-bottom">
      <v-container>
        <v-row align="center" justify="space-between" no-gutters>
          <v-col cols="12" md="auto" class="text-center text-md-start">
            <p class="text-caption text-medium-emphasis mb-0">
              &copy; {{ currentYear }} Boutique. Tous droits réservés.
            </p>
          </v-col>
          <v-col cols="12" md="auto" class="text-center text-md-end mt-2 mt-md-0">
            <!-- Bouton Retour en haut -->
            <v-btn
              variant="text"
              size="small"
              class="back-to-top text-caption"
              @click="scrollToTop"
              aria-label="Retour en haut"
            >
              <v-icon start size="16">mdi-arrow-up</v-icon>
              Retour en haut
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </footer>
</template>

<script setup lang="ts">
/**
 * AppFooter.vue – Pied de page principal de la boutique.
 *
 * Affiche 4 colonnes (Boutique, Navigation, Informations, Newsletter),
 * les liens vers les réseaux sociaux, une ligne de copyright et un
 * bouton "Retour en haut" avec défilement fluide.
 */
import { ref } from 'vue';

defineOptions({ name: 'AppFooter' });

// ====== Année courante ======
const currentYear = new Date().getFullYear();

// ====== Newsletter ======
const email = ref('');
const emailError = ref<string | undefined>(undefined);

function onSubscribe(): void {
  const trimmed = email.value.trim();
  if (!trimmed) {
    emailError.value = 'Veuillez entrer une adresse e-mail.';
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    emailError.value = 'Adresse e-mail invalide.';
    return;
  }
  emailError.value = undefined;
  // Logique d'abonnement placeholder
  email.value = '';
}

// ====== Retour en haut ======
function scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ====== Données statiques ======

interface FooterLink {
  label: string;
  to: string;
}

interface SocialLink {
  name: string;
  icon: string;
  url: string;
}

const navLinks: FooterLink[] = [
  { label: 'Accueil', to: '/' },
  { label: 'Collection', to: '/collection' },
  { label: 'À propos', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

const infoLinks: FooterLink[] = [
  { label: 'FAQ', to: '/faq' },
  { label: 'Politique de confidentialité', to: '/politique-confidentialite' },
  { label: 'Conditions générales', to: '/conditions-generales' },
  { label: 'Livraison', to: '/livraison' },
];

const socialLinks: SocialLink[] = [
  { name: 'Facebook', icon: 'mdi-facebook', url: 'https://facebook.com' },
  { name: 'Instagram', icon: 'mdi-instagram', url: 'https://instagram.com' },
  { name: 'X (Twitter)', icon: 'mdi-twitter', url: 'https://x.com' },
  { name: 'TikTok', icon: 'mdi-music', url: 'https://tiktok.com' },
];
</script>

<style scoped>
/* ================================================================
   FOOTER PRINCIPAL
   ================================================================ */

.app-footer {
  background: linear-gradient(
    180deg,
    rgb(var(--v-theme-surface)) 0%,
    rgba(var(--v-theme-primary), 0.03) 100%
  );
  border-top: 1px solid rgba(var(--v-theme-on-surface), 0.08);
}

.footer-container {
  padding-block: 3rem 2rem;
}

/* ================================================================
   COLONNES
   ================================================================ */

.footer-col {
  margin-bottom: 1.5rem;
}

/* --- Colonne 1 : Brand --- */
.brand-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.brand-icon {
  transition: transform 0.3s ease;
}

.brand-wrapper:hover .brand-icon {
  transform: rotate(-10deg) scale(1.1);
}

.brand-description {
  line-height: 1.7;
  max-width: 300px;
}

/* --- Colonne 2 & 3 : Liens --- */
.footer-heading {
  color: rgb(var(--v-theme-on-background));
  letter-spacing: 0.06em;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-link {
  text-transform: none !important;
  font-weight: 500;
  color: rgba(var(--v-theme-on-surface), 0.7);
  justify-content: flex-start;
  padding-inline: 0 !important;
  margin-bottom: 2px;
  transition: color 0.2s ease, transform 0.2s ease;
}

.footer-link:hover {
  color: rgb(var(--v-theme-primary));
  transform: translateX(4px);
  background: transparent !important;
}

/* --- Colonne 4 : Newsletter --- */
.newsletter-desc {
  line-height: 1.6;
  max-width: 280px;
}

.newsletter-form {
  max-width: 320px;
}

.newsletter-input :deep(.v-field) {
  background-color: rgba(var(--v-theme-surface-variant), 0.35) !important;
  transition: background-color 0.2s ease, box-shadow 0.2s ease;
}

.newsletter-input :deep(.v-field):hover,
.newsletter-input:focus-within :deep(.v-field) {
  background-color: rgba(var(--v-theme-surface-variant), 0.6) !important;
}

.newsletter-btn {
  text-transform: none !important;
  font-weight: 600;
  letter-spacing: 0.01em;
  min-width: 140px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.newsletter-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(var(--v-theme-primary), 0.3) !important;
}

/* ================================================================
   RÉSEAUX SOCIAUX
   ================================================================ */

.social-links {
  display: flex;
  gap: 4px;
}

.social-btn {
  transition: transform 0.2s ease, color 0.2s ease;
  color: rgba(var(--v-theme-on-surface), 0.5);
}

.social-btn:hover {
  transform: scale(1.2);
  color: rgb(var(--v-theme-primary));
}

/* ================================================================
   BARRE INFÉRIEURE (copyright + back-to-top)
   ================================================================ */

.footer-bottom {
  border-top: 1px solid rgba(var(--v-theme-on-surface), 0.06);
  padding-block: 1rem;
  background: rgba(var(--v-theme-primary), 0.02);
}

.back-to-top {
  text-transform: none !important;
  font-weight: 600;
  color: rgba(var(--v-theme-on-surface), 0.5);
  transition: color 0.2s ease, transform 0.2s ease;
}

.back-to-top:hover {
  color: rgb(var(--v-theme-primary));
  transform: translateY(-2px);
  background: transparent !important;
}

/* ================================================================
   RESPONSIVE
   ================================================================ */

@media (max-width: 959px) {
  .footer-container {
    padding-block: 2.5rem 1.5rem;
  }

  .brand-description {
    max-width: 100%;
  }
}

@media (max-width: 600px) {
  .footer-container {
    padding-block: 2rem 1rem;
  }

  .footer-col {
    text-align: center;
  }

  .brand-wrapper {
    justify-content: center;
  }

  .social-links {
    justify-content: center;
  }

  /* Aligner les liens centrés sous les titres centrés */
  .footer-links li {
    display: flex;
    justify-content: center;
  }

  .footer-link {
    justify-content: center !important;
  }

  .newsletter-form {
    margin-inline: auto;
  }

  .newsletter-desc {
    margin-inline: auto;
  }
}
</style>
