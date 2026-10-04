<template>
  <!-- ====== Section Réassurance ====== -->
  <section class="trust-badges-section">
    <v-container>
      <v-row>
        <v-col
          v-for="(badge, index) in badges"
          :key="badge.title"
          cols="12"
          sm="6"
          md="3"
        >
          <!-- v-reveal : apparition en cascade (stagger) de chaque carte -->
          <v-card
            v-reveal="{ delay: index * 100 }"
            class="trust-card"
            variant="outlined"
            elevation="0"
            rounded="xl"
          >
            <v-card-item class="trust-card-content">
              <!-- Icône Material Design -->
              <div class="trust-icon-wrapper">
                <v-icon
                  size="36"
                  color="primary"
                  class="trust-icon"
                >
                  {{ badge.icon }}
                </v-icon>
              </div>

              <!-- Titre -->
              <h3 class="trust-title text-h6 font-weight-bold mt-3 mb-1">
                {{ badge.title }}
              </h3>

              <!-- Description -->
              <p class="trust-description text-body-2 text-medium-emphasis mb-0">
                {{ badge.description }}
              </p>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup lang="ts">
/**
 * TrustBadges.vue – Section de réassurance client.
 *
 * Affiche 4 cartes responsives (icône + titre + description)
 * renforçant la confiance de l'utilisateur.
 */

defineOptions({ name: 'TrustBadges' });

interface Badge {
  icon: string;
  title: string;
  description: string;
}

const badges: Badge[] = [
  {
    icon: 'mdi-truck-fast-outline',
    title: 'Livraison rapide',
    description:
      'Expédié sous 24 à 48h ouvrées. Livraison offerte dès 80 € d’achat.',
  },
  {
    icon: 'mdi-lock-check-outline',
    title: 'Paiement sécurisé',
    description:
      'Transactions chiffrées via Stripe. Vos données bancaires sont protégées.',
  },
  {
    icon: 'mdi-receipt-text-check-outline',
    title: 'Satisfait ou remboursé',
    description:
      '30 jours pour changer d’avis. Retours gratuits sous emballage d’origine.',
  },
  {
    icon: 'mdi-headset-outline',
    title: 'Service client',
    description:
      'Une équipe à votre écoute 6j/7 par chat, e-mail ou téléphone.',
  },
];
</script>

<style scoped>
/* ================================================================
   SECTION RÉASSURANCE
   ================================================================ */

.trust-badges-section {
  padding-block: 3rem;
  background: rgb(var(--v-theme-background));
}

/* --- Carte individuelle --- */
.trust-card {
  height: 100%;
  border: 1px solid rgba(var(--v-theme-on-surface), 0.08) !important;
  background: rgb(var(--v-theme-surface));
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  cursor: default;
}

.trust-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 32px rgba(var(--v-theme-primary), 0.10) !important;
  border-color: rgba(var(--v-theme-primary), 0.25) !important;
}

.trust-card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem 1.5rem;
}

/* --- Icône --- */
.trust-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: rgba(var(--v-theme-primary), 0.08);
  transition: background 0.3s ease, transform 0.3s ease;
}

.trust-card:hover .trust-icon-wrapper {
  background: rgba(var(--v-theme-primary), 0.14);
  transform: scale(1.08);
}

.trust-icon {
  transition: transform 0.3s ease;
}

.trust-card:hover .trust-icon {
  transform: scale(1.1);
}

/* --- Titre --- */
.trust-title {
  color: rgb(var(--v-theme-on-background));
  line-height: 1.3;
}

/* --- Description --- */
.trust-description {
  max-width: 260px;
  margin-inline: auto;
  line-height: 1.6;
}

/* ================================================================
   RESPONSIVE
   ================================================================ */

@media (max-width: 959px) {
  .trust-badges-section {
    padding-block: 2.5rem;
  }
}

@media (max-width: 600px) {
  .trust-card-content {
    padding: 1.5rem 1rem;
  }
}
</style>
