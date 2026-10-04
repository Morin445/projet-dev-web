<template>
  <!-- ====== PAGE POLITIQUE DE CONFIDENTIALITÉ ====== -->
  <section class="legal-view">
    <v-container>

      <!-- ====== En-tête ====== -->
      <div class="page-header text-center mb-8" v-reveal>
        <div class="page-header-icon">
          <v-icon size="32" color="primary">mdi-shield-lock-outline</v-icon>
        </div>
        <h1 class="text-h3 text-sm-h2 font-weight-bold mb-2">
          Politique de confidentialité
        </h1>
        <p class="text-body-1 text-medium-emphasis mx-auto page-header-subtitle">
          Dernière mise à jour : janvier 2026. Nous protégeons vos données
          personnelles et respectons votre vie privée avec la plus grande attention.
        </p>
      </div>

      <!-- ====== Sections ====== -->
      <v-row justify="center">
        <v-col cols="12" md="9" lg="8">
          <div
            v-for="(section, index) in sections"
            :key="section.title"
            class="legal-section"
            v-reveal="{ variant: 'fade-up', delay: index * 60 }"
          >
            <div class="legal-section-head">
              <span class="legal-section-num text-primary">{{ String(index + 1).padStart(2, '0') }}</span>
              <h2 class="legal-section-title text-h5 font-weight-bold">
                {{ section.title }}
              </h2>
            </div>
            <p
              v-for="paragraph in section.paragraphs"
              :key="paragraph"
              class="legal-paragraph"
            >
              {{ paragraph }}
            </p>
          </div>
        </v-col>
      </v-row>

      <!-- ====== Retour ====== -->
      <div class="text-center mt-10" v-reveal>
        <v-btn
          color="primary"
          variant="elevated"
          size="large"
          rounded="pill"
          class="cta-btn"
          to="/"
          aria-label="Retour à l'accueil"
        >
          <v-icon start>mdi-home-outline</v-icon>
          Retour à l'accueil
        </v-btn>
        <v-btn
          color="primary"
          variant="outlined"
          size="large"
          rounded="pill"
          class="cta-btn cta-btn-outline"
          to="/collection"
          aria-label="Voir la collection"
        >
          Voir la collection
          <v-icon end>mdi-arrow-right</v-icon>
        </v-btn>
      </div>

    </v-container>
  </section>
</template>

<script setup lang="ts">
/**
 * PrivacyPolicyView.vue – Page Politique de confidentialité.
 *
 * Affiche les grandes lignes de la politique de protection des données
 * (collecte, usage, cookies, droits). Contenu placeholder temporaire,
 * cohérent avec la boutique, à compléter par le responsable légal.
 */
defineOptions({ name: 'PrivacyPolicyView' });

interface Section {
  title: string;
  paragraphs: string[];
}

const sections: Section[] = [
  {
    title: 'Données collectées',
    paragraphs: [
      'Lors de votre navigation et de vos commandes, nous collectons uniquement ' +
        'les informations nécessaires : nom, adresse e-mail, adresse de livraison ' +
        'et données de paiement (traitées par nos prestataires sécurisés).',
      'Nous ne collectons jamais de données sensibles sans votre consentement ' +
        'explicite et préalable.',
    ],
  },
  {
    title: 'Utilisation de vos données',
    paragraphs: [
      'Vos données sont utilisées pour traiter vos commandes, vous livrer vos ' +
        'articles, améliorer notre service et, avec votre accord, vous envoyer ' +
        'notre newsletter et nos offres personnalisées.',
      'Vos informations ne sont jamais revendues à des tiers.',
    ],
  },
  {
    title: 'Cookies',
    paragraphs: [
      'Notre site utilise des cookies essentiels au bon fonctionnement de la ' +
        'boutique (panier, session, préférences) ainsi que des cookies de mesure ' +
        'd’audience anonymisés.',
      'Vous pouvez à tout moment configurer votre navigateur pour refuser les ' +
        'cookies non essentiels, sans impact sur votre expérience d’achat.',
    ],
  },
  {
    title: 'Partage des données',
    paragraphs: [
      'Vos données sont partagées uniquement avec nos prestataires de paiement ' +
        'et de livraison, dans la stricte mesure nécessaire à l’exécution de votre ' +
        'commande.',
      'Ils sont tenus de respecter la réglementation en vigueur et ne peuvent ' +
        'utiliser vos données à d’autres fins.',
    ],
  },
  {
    title: 'Vos droits',
    paragraphs: [
      'Conformément au RGPD, vous disposez d’un droit d’accès, de rectification, ' +
        'd’effacement et d’opposition sur vos données personnelles.',
      'Pour exercer ces droits, contactez-nous via la page Contact ou à ' +
        'l’adresse suivante : confidentialite@boutique.fr. Nous répondons sous ' +
        '30 jours.',
    ],
  },
];
</script>

<style scoped>
/* ================================================================
   PAGE LÉGALE (confidentialité / CGV)
   ================================================================ */

.legal-view {
  background: linear-gradient(
    160deg,
    rgba(var(--v-theme-primary), 0.04) 0%,
    rgb(var(--v-theme-background)) 45%
  );
  padding-block: 3rem 5rem;
  min-height: 72vh;
}

/* --- En-tête --- */
.page-header-icon {
  width: 72px;
  height: 72px;
  margin: 0 auto 1rem;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(var(--v-theme-primary), 0.1);
}

.page-header-subtitle {
  max-width: 560px;
  line-height: 1.7;
}

/* --- Sections --- */
.legal-section {
  background: rgb(var(--v-theme-surface));
  border: 1px solid rgba(var(--v-theme-on-surface), 0.08);
  border-radius: 20px;
  padding: 1.75rem 2rem;
  margin-bottom: 1.25rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.legal-section:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(var(--v-theme-primary), 0.06);
}

.legal-section-head {
  display: flex;
  align-items: baseline;
  gap: 14px;
  margin-bottom: 0.75rem;
}

.legal-section-num {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1;
}

.legal-section-title {
  color: rgb(var(--v-theme-on-background));
}

.legal-paragraph {
  color: rgba(var(--v-theme-on-surface), 0.72);
  line-height: 1.75;
  margin-bottom: 0.75rem;
}

.legal-paragraph:last-child {
  margin-bottom: 0;
}

/* --- Boutons de retour --- */
.cta-btn {
  text-transform: none !important;
  font-weight: 600;
  padding-inline: 28px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.cta-btn:hover {
  transform: translateY(-2px);
}

.cta-btn-outline {
  border-width: 2px;
}

/* ================================================================
   RESPONSIVE
   ================================================================ */

@media (max-width: 959px) {
  .legal-view {
    padding-block: 2.5rem 3.5rem;
  }
}

@media (max-width: 600px) {
  .legal-view {
    padding-block: 2rem 2.5rem;
  }

  .legal-section {
    padding: 1.25rem 1.25rem;
  }

  .cta-btn {
    width: 100%;
    margin-bottom: 0.5rem;
  }
}
</style>
