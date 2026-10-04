<template>
  <!-- ====== PAGE CONDITIONS GÉNÉRALES ====== -->
  <section class="legal-view">
    <v-container>

      <!-- ====== En-tête ====== -->
      <div class="page-header text-center mb-8" v-reveal>
        <div class="page-header-icon">
          <v-icon size="32" color="primary">mdi-file-document-outline</v-icon>
        </div>
        <h1 class="text-h3 text-sm-h2 font-weight-bold mb-2">
          Conditions générales de vente
        </h1>
        <p class="text-body-1 text-medium-emphasis mx-auto page-header-subtitle">
          Les présentes conditions régissent les ventes conclues sur notre
          boutique. Dernière mise à jour : janvier 2026.
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
 * TermsView.vue – Page Conditions générales de vente.
 *
 * Affiche les principales dispositions applicables aux commandes
 * (prix, paiement, livraison, retours…). Contenu placeholder
 * temporaire, cohérent avec la boutique, à valider juridiquement.
 */
defineOptions({ name: 'TermsView' });

interface Section {
  title: string;
  paragraphs: string[];
}

const sections: Section[] = [
  {
    title: 'Objet',
    paragraphs: [
      'Les présentes conditions générales de vente s’appliquent à toutes les ' +
        'commandes passées sur notre boutique en ligne. Toute commande vaut ' +
        'acceptation des présentes conditions.',
    ],
  },
  {
    title: 'Commandes et prix',
    paragraphs: [
      'Les prix sont indiqués en euros, toutes taxes comprises, hors frais de ' +
        'livraison (offerts pour la livraison standard).',
      'La boutique se réserve le droit de modifier ses prix à tout moment ; ' +
        'le produit est facturé au prix en vigueur au moment de la commande.',
    ],
  },
  {
    title: 'Paiement',
    paragraphs: [
      'Le paiement s’effectue en ligne, de manière sécurisée, par carte bancaire ' +
        'ou via les solutions de paiement proposées. La commande n’est confirmée ' +
        'qu’après validation du paiement.',
    ],
  },
  {
    title: 'Livraison',
    paragraphs: [
      'Les commandes sont expédiées sous 24 à 48 h ouvrées. Les délais de ' +
        'livraison sont donnés à titre indicatif et peuvent varier selon la ' +
        'destination. Voir notre page Livraison pour plus de détails.',
    ],
  },
  {
    title: 'Retours et remboursements',
    paragraphs: [
      'Conformément à la législation en vigueur, vous disposez d’un délai de ' +
        '14 jours pour exercer votre droit de rétractation, prolongé à 30 jours ' +
        'par notre politique de retour.',
      'Les remboursements sont effectués sous 14 jours après réception et ' +
        'contrôle des articles retournés.',
    ],
  },
  {
    title: 'Propriété intellectuelle',
    paragraphs: [
      'L’ensemble des contenus du site (textes, visuels, logos, photographies) ' +
        'est protégé par le droit d’auteur. Toute reproduction sans autorisation ' +
        'est interdite.',
    ],
  },
  {
    title: 'Droit applicable',
    paragraphs: [
      'Les présentes conditions sont soumises au droit français. En cas de ' +
        'litige, une solution amiable sera recherchée avant toute action judiciaire.',
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
