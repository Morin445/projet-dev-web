<template>
  <!-- ====== PAGE LIVRAISON ====== -->
  <section class="delivery-view">
    <v-container>

      <!-- ====== En-tête ====== -->
      <div class="page-header text-center mb-8" v-reveal>
        <div class="page-header-icon">
          <v-icon size="32" color="primary">mdi-truck-outline</v-icon>
        </div>
        <h1 class="text-h3 text-sm-h2 font-weight-bold mb-2">Livraison</h1>
        <p class="text-body-1 text-medium-emphasis mx-auto page-header-subtitle">
          Nous livrons partout en Europe et dans le monde. Découvrez nos
          différentes options, leurs délais et leurs tarifs.
        </p>
      </div>

      <!-- ====== Options de livraison ====== -->
      <v-row justify="center">
        <v-col
          v-for="(option, index) in deliveryOptions"
          :key="option.title"
          cols="12"
          sm="6"
          md="4"
          v-reveal="{ variant: 'fade-up', delay: index * 100 }"
        >
          <v-card class="delivery-card" elevation="0" rounded="xl">
            <div class="delivery-icon" :class="`delivery-icon--${option.color}`">
              <v-icon size="28">{{ option.icon }}</v-icon>
            </div>
            <h2 class="text-h6 font-weight-bold mb-1">{{ option.title }}</h2>
            <p class="delivery-delay text-caption text-primary font-weight-bold text-uppercase mb-2">
              {{ option.delay }}
            </p>
            <p class="delivery-desc text-body-2 text-medium-emphasis mb-3">
              {{ option.description }}
            </p>
            <span class="delivery-price text-h6 font-weight-bold">
              {{ option.price }}
            </span>
          </v-card>
        </v-col>
      </v-row>

      <!-- ====== Suivi de commande ====== -->
      <v-row justify="center" class="mt-4">
        <v-col cols="12" md="9" lg="8" v-reveal="{ variant: 'zoom-in', delay: 150 }">
          <div class="delivery-tracking">
            <v-icon size="28" color="primary" class="me-2">mdi-package-variant-closed</v-icon>
            <div class="delivery-tracking-text">
              <p class="text-body-1 font-weight-bold mb-1">Suivi de commande</p>
              <p class="text-body-2 text-medium-emphasis mb-0">
                Dès l’expédition, vous recevez un e-mail avec votre numéro de
                suivi pour suivre votre colis en temps réel, étape par étape.
              </p>
            </div>
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
 * DeliveryView.vue – Page Livraison.
 *
 * Présente les options de livraison (standard, express, point relais),
 * le suivi de commande et les retours. Contenu placeholder temporaire,
 * cohérent avec la boutique.
 */
defineOptions({ name: 'DeliveryView' });

interface DeliveryOption {
  icon: string;
  color: 'standard' | 'express' | 'relay';
  title: string;
  delay: string;
  description: string;
  price: string;
}

const deliveryOptions: DeliveryOption[] = [
  {
    icon: 'mdi-truck-outline',
    color: 'standard',
    title: 'Livraison standard',
    delay: '3 à 5 jours ouvrés',
    description:
      'Livrée à domicile, du lundi au samedi. Idéale pour vos commandes ' +
      'sans urgence.',
    price: 'Offerte dès 50 €',
  },
  {
    icon: 'mdi-rocket-launch-outline',
    color: 'express',
    title: 'Livraison express',
    delay: '24 à 48 heures',
    description:
      'Expédition prioritaire avec livraison le lendemain ou surlendemain, ' +
      'du lundi au samedi.',
    price: '6,90 €',
  },
  {
    icon: 'mdi-map-marker-outline',
    color: 'relay',
    title: 'Point relais',
    delay: '3 à 5 jours ouvrés',
    description:
      'Retirez votre colis au point relais de votre choix, à l’heure qui ' +
      'vous convient. 7 jours sur 7.',
    price: 'Offerte dès 30 €',
  },
];
</script>

<style scoped>
/* ================================================================
   PAGE LIVRAISON
   ================================================================ */

.delivery-view {
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

/* --- Cartes d'options --- */
.delivery-card {
  height: 100%;
  border: 1px solid rgba(var(--v-theme-on-surface), 0.08) !important;
  background: rgb(var(--v-theme-surface));
  padding: 1.75rem 1.5rem;
  text-align: center;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.delivery-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(var(--v-theme-primary), 0.10) !important;
}

.delivery-icon {
  width: 56px;
  height: 56px;
  margin: 0 auto 1rem;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.delivery-icon--standard {
  background: linear-gradient(135deg, #42a5f5 0%, #1565c0 100%);
}

.delivery-icon--express {
  background: linear-gradient(135deg, #ff8f00 0%, #e65100 100%);
}

.delivery-icon--relay {
  background: linear-gradient(135deg, #66bb6a 0%, #2e7d32 100%);
}

.delivery-delay {
  letter-spacing: 0.05em;
}

.delivery-desc {
  line-height: 1.6;
}

.delivery-price {
  color: rgb(var(--v-theme-primary));
}

/* --- Suivi de commande --- */
.delivery-tracking {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 1.25rem 1.5rem;
  border-radius: 20px;
  border: 1px solid rgba(var(--v-theme-primary), 0.15);
  background: rgba(var(--v-theme-primary), 0.04);
}

.delivery-tracking-text {
  flex: 1;
  min-width: 0;
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
  .delivery-view {
    padding-block: 2.5rem 3.5rem;
  }
}

@media (max-width: 600px) {
  .delivery-view {
    padding-block: 2rem 2.5rem;
  }

  .delivery-tracking {
    flex-direction: column;
    text-align: center;
  }

  .cta-btn {
    width: 100%;
    margin-bottom: 0.5rem;
  }
}
</style>
