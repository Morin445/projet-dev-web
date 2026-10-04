<template>
  <!-- ====== PAGE FAQ ====== -->
  <section class="faq-view">
    <v-container>

      <!-- ====== En-tête ====== -->
      <div class="page-header text-center mb-8" v-reveal>
        <div class="page-header-icon">
          <v-icon size="32" color="primary">mdi-help-circle-outline</v-icon>
        </div>
        <h1 class="text-h3 text-sm-h2 font-weight-bold mb-2">Questions fréquentes</h1>
        <p class="text-body-1 text-medium-emphasis mx-auto page-header-subtitle">
          Tout ce que vous devez savoir sur vos commandes, la livraison,
          les retours et nos produits. Une question reste sans réponse ?
          Notre équipe est là pour vous aider.
        </p>
      </div>

      <!-- ====== Accordéon FAQ ====== -->
      <v-row justify="center">
        <v-col cols="12" md="9" lg="8" v-reveal="{ variant: 'fade-up', delay: 100 }">
          <v-expansion-panels
            v-model="openPanels"
            variant="accordion"
            class="faq-panels"
          >
            <v-expansion-panel
              v-for="(item, index) in faqItems"
              :key="index"
              class="faq-panel"
            >
              <v-expansion-panel-title class="faq-question">
                <v-icon start color="primary" size="20">mdi-help-circle-outline</v-icon>
                {{ item.question }}
              </v-expansion-panel-title>
              <v-expansion-panel-text class="faq-answer">
                {{ item.answer }}
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>

          <!-- Aide supplémentaire -->
          <div class="faq-help-card mt-6" v-reveal="{ variant: 'zoom-in', delay: 150 }">
            <v-icon size="28" color="primary" class="me-2">mdi-email-outline</v-icon>
            <div class="faq-help-text">
              <p class="text-body-1 font-weight-bold mb-1">Une autre question ?</p>
              <p class="text-body-2 text-medium-emphasis mb-0">
                Contactez notre équipe : nous répondons sous 24 h ouvrées.
              </p>
            </div>
            <v-btn
              color="primary"
              variant="tonal"
              rounded="pill"
              size="small"
              class="faq-help-btn"
              to="/contact"
            >
              Nous contacter
              <v-icon end size="16">mdi-arrow-right</v-icon>
            </v-btn>
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
 * FaqView.vue – Page Questions fréquentes.
 *
 * Affiche un accordéon de questions/réponses courantes (livraison,
 * retours, paiement, tailles…) ainsi qu'un bloc de contact.
 * Contenu placeholder temporaire, cohérent avec la boutique.
 */
import { ref } from 'vue';

defineOptions({ name: 'FaqView' });

// Panneau ouvert par défaut (le premier)
const openPanels = ref<number[]>([0]);

interface FaqItem {
  question: string;
  answer: string;
}

const faqItems: FaqItem[] = [
  {
    question: 'Quels sont les délais de livraison ?',
    answer:
      'La livraison standard est offerte et prend 3 à 5 jours ouvrés. ' +
      'La livraison express (24 à 48 h) est disponible en option au moment ' +
      'de la commande. Toutes nos commandes sont expédiées depuis nos ' +
      'entrepôts en Europe.',
  },
  {
    question: 'Le retour est-il gratuit ?',
    answer:
      'Oui. Vous disposez de 30 jours après réception pour retourner vos ' +
      'articles, gratuitement. Les produits doivent être neufs, non portés ' +
      'et munis de leurs étiquettes d’origine.',
  },
  {
    question: 'Quels moyens de paiement acceptez-vous ?',
    answer:
      'Nous acceptons les principales cartes bancaires (Visa, Mastercard, ' +
      'American Express), ainsi que les paiements via Apple Pay et Google Pay. ' +
      'Tous les paiements sont sécurisés et chiffrés.',
  },
  {
    question: 'Comment choisir ma taille ?',
    answer:
      'Chaque fiche produit propose un guide des tailles détaillé. Nos ' +
      'modèles taillent normalement : si vous hésitez entre deux tailles, ' +
      'nous vous recommandons de choisir la plus grande pour un confort optimal.',
  },
  {
    question: 'Puis-je modifier ou annuler ma commande ?',
    answer:
      'Tant que votre commande n’a pas été expédiée, vous pouvez la modifier ' +
      'ou l’annuler en contactant notre équipe depuis la page Contact. Une ' +
      'fois expédiée, elle peut être retournée gratuitement sous 30 jours.',
  },
  {
    question: 'Mes articles sont-ils échangeables ?',
    answer:
      'Oui, les échanges sont possibles sous 30 jours selon disponibilité. ' +
      'Contactez-nous pour connaître la démarche et nous vous enverrons un ' +
      'bon d’échange accompagné d’une étiquette de retour prépayée.',
  },
];
</script>

<style scoped>
/* ================================================================
   PAGE FAQ
   ================================================================ */

.faq-view {
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

/* --- Accordéon --- */
.faq-panels {
  border: 1px solid rgba(var(--v-theme-on-surface), 0.08) !important;
  border-radius: 20px !important;
  overflow: hidden;
}

.faq-panel {
  background: rgb(var(--v-theme-surface)) !important;
}

.faq-panel + .faq-panel {
  border-top: 1px solid rgba(var(--v-theme-on-surface), 0.06);
}

.faq-question {
  font-weight: 600;
  color: rgb(var(--v-theme-on-background));
  min-height: 56px;
}

.faq-answer {
  color: rgba(var(--v-theme-on-surface), 0.75);
  line-height: 1.7;
}

/* --- Bloc d'aide --- */
.faq-help-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 1.25rem 1.5rem;
  border-radius: 20px;
  border: 1px solid rgba(var(--v-theme-primary), 0.15);
  background: rgba(var(--v-theme-primary), 0.04);
}

.faq-help-text {
  flex: 1;
  min-width: 0;
}

.faq-help-btn {
  text-transform: none !important;
  font-weight: 600;
  flex-shrink: 0;
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
  .faq-view {
    padding-block: 2.5rem 3.5rem;
  }
}

@media (max-width: 600px) {
  .faq-view {
    padding-block: 2rem 2.5rem;
  }

  .faq-help-card {
    flex-direction: column;
    text-align: center;
  }

  .cta-btn {
    width: 100%;
    margin-bottom: 0.5rem;
  }
}
</style>
