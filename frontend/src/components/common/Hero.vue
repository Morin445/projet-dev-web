<template>
  <!-- ====== Section Héro de la boutique ====== -->
  <section class="hero-section">
    <v-container class="hero-container">
      <v-row align="center" justify="space-between" no-gutters>
        <!-- ====== Colonne texte (gauche) ====== -->
        <v-col cols="12" md="6" class="hero-text-col">
          <div class="hero-text-wrapper">
            <!-- Étiquette "Nouvelle collection" -->
            <span class="hero-badge text-caption font-weight-bold text-uppercase">
              <v-icon start size="14" class="badge-icon">mdi-sparkles</v-icon>
              Nouvelle collection été 2026
            </span>

            <!-- Grand titre -->
            <h1 class="hero-title">
              Exprimez votre
              <span class="text-primary">style</span>
              <br />
              avec élégance
            </h1>

            <!-- Sous-titre -->
            <p class="hero-subtitle text-body-1 text-medium-emphasis">
              Découvrez une sélection raffinée de vêtements et accessoires
              pour homme, femme et enfant. Des pièces intemporelles pour
              celles et ceux qui aiment la mode.
            </p>

            <!-- Boutons d'action -->
            <div class="hero-actions">
              <v-btn
                size="large"
                color="primary"
                variant="elevated"
                rounded="pill"
                class="hero-btn-primary"
                to="/collection"
                aria-label="Découvrir la collection"
              >
                Découvrir la collection
                <v-icon end size="20">mdi-arrow-right</v-icon>
              </v-btn>

              <v-btn
                size="large"
                color="primary"
                variant="outlined"
                rounded="pill"
                class="hero-btn-secondary"
                :to="{ path: '/collection', query: { categorie: 'promotions' } }"
                aria-label="Voir les promotions"
              >
                <v-icon start size="18">mdi-tag-outline</v-icon>
                Nos promotions
              </v-btn>
            </div>
          </div>
        </v-col>

        <!-- ====== Colonne image / illustration (droite) ====== -->
        <v-col cols="12" md="6" class="hero-image-col">
          <div class="hero-image-wrapper">
            <!-- Image héro de la collection -->
            <figure class="hero-image-figure">
              <img
                :src="heroImage"
                alt="Aperçu de la nouvelle collection été 2026"
                class="hero-image"
                width="1584"
                height="672"
                decoding="async"
                fetchpriority="high"
                draggable="false"
              />
            </figure>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup lang="ts">
/**
 * Hero.vue – Section héro principale de la boutique.
 *
 * Affiche un grand titre, un sous-titre, deux CTA et l'image de la
 * collection. Design responsive : empilement vertical sur mobile,
 * disposition côte à côte sur desktop.
 *
 * L'image est importée via Vite (asset hashé, WebP optimisé) et
 * affichée avec object-fit pour ne jamais être déformée.
 *
 * Aucune donnée dynamique ni logique backend – simple composant
 * de présentation.
 */

import heroImage from '../../assets/images/hero/hero-fashion.webp';

defineOptions({ name: 'Hero' });
</script>

<style scoped>
/* ================================================================
   SECTION HERO
   ================================================================ */

.hero-section {
  position: relative;
  overflow: hidden;
  min-height: 85vh;
  display: flex;
  align-items: center;

  /* Dégradé de fond : blanc → très léger violet/primary sur la gauche */
  background: linear-gradient(
    135deg,
    rgba(var(--v-theme-primary), 0.04) 0%,
    rgba(var(--v-theme-primary), 0.01) 40%,
    rgb(var(--v-theme-background)) 100%
  );
}

.hero-container {
  padding-block: 4rem 2rem;
}

/* ================================================================
   COLONNE TEXTE
   ================================================================ */

.hero-text-col {
  position: relative;
  z-index: 2;
}

.hero-text-wrapper {
  max-width: 560px;
  margin: 0 auto;
}

/* --- Badge "Nouvelle collection" --- */
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 16px;
  border-radius: 100px;
  background: rgba(var(--v-theme-primary), 0.08);
  color: rgb(var(--v-theme-primary));
  letter-spacing: 0.05em;
  margin-bottom: 24px;

  /* Animation */
  animation: fade-up 0.6s ease-out both;
  animation-delay: 0.1s;
}

.badge-icon {
  animation: sparkle 2s ease-in-out infinite;
}

/* --- Titre principal --- */
.hero-title {
  font-size: clamp(2.2rem, 5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: rgb(var(--v-theme-on-background));
  margin-bottom: 20px;

  /* Animation */
  animation: fade-up 0.6s ease-out both;
  animation-delay: 0.2s;
}

/* --- Sous-titre --- */
.hero-subtitle {
  max-width: 480px;
  line-height: 1.7;
  margin-bottom: 36px;

  /* Animation */
  animation: fade-up 0.6s ease-out both;
  animation-delay: 0.3s;
}

/* --- Boutons d'action --- */
.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;

  /* Animation */
  animation: fade-up 0.6s ease-out both;
  animation-delay: 0.4s;
}

.hero-btn-primary {
  text-transform: none !important;
  font-weight: 600;
  letter-spacing: 0.01em;
  padding-inline: 32px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.hero-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(var(--v-theme-primary), 0.35) !important;
}

.hero-btn-secondary {
  text-transform: none !important;
  font-weight: 600;
  letter-spacing: 0.01em;
  padding-inline: 28px;
  border-width: 2px;
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.hero-btn-secondary:hover {
  transform: translateY(-2px);
  background-color: rgba(var(--v-theme-primary), 0.06);
}

/* ================================================================
   COLONNE IMAGE / ILLUSTRATION
   ================================================================ */

.hero-image-col {
  position: relative;
  z-index: 1;
}

.hero-image-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.25rem 1.5rem 1.25rem 2rem;

  /* Animation */
  animation: fade-scale 0.7s ease-out both;
  animation-delay: 0.3s;
}

/* --- Image héro --- */
.hero-image-figure {
  position: relative;
  width: 100%;
  max-width: 560px;
  /* Ratio natif de l'image (1584 × 672) pour éviter toute déformation */
  aspect-ratio: 1584 / 672;
  margin: 0;
  border-radius: 36px;
  overflow: hidden;
  border: 1px solid rgba(var(--v-theme-primary), 0.12);
  box-shadow: 0 28px 72px rgba(var(--v-theme-primary), 0.20);
}

.hero-image {
  display: block;
  width: 100%;
  height: 100%;
  /* Ajuste l'image dans son cadre sans jamais la déformer */
  object-fit: cover;
  object-position: center 22%;
  transform: scale(1.001);
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

/* Zoom subtil au survol (uniquement souris, pas tactile) */
@media (hover: hover) and (pointer: fine) {
  .hero-image-figure:hover .hero-image {
    transform: scale(1.06);
  }
}

/* ================================================================
   ANIMATIONS
   ================================================================ */

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-scale {
  from {
    opacity: 0;
    transform: scale(0.92);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes sparkle {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.15);
  }
}

/* ================================================================
   RESPONSIVE – mobile (< md)
   ================================================================ */

@media (max-width: 959px) {
  .hero-section {
    min-height: auto;
    padding-block: 3rem 1rem;
  }

  .hero-container {
    padding-block: 2rem 1rem;
  }

  .hero-text-wrapper {
    text-align: center;
    max-width: 100%;
  }

  .hero-subtitle {
    margin-inline: auto;
  }

  .hero-actions {
    justify-content: center;
  }

  .hero-image-wrapper {
    padding-block: 3rem 1rem;
  }

  .hero-image-figure {
    max-width: 360px;
  }
}

@media (max-width: 600px) {
  .hero-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .hero-btn-primary,
  .hero-btn-secondary {
    width: 100%;
  }

  .hero-image-figure {
    max-width: 280px;
    border-radius: 24px;
  }
}
</style>
