<template>
  <!-- ====== Section À propos ====== -->
  <section class="about-section">
    <v-container>
      <v-row align="center" justify="space-between" no-gutters>
        <!-- ====== Colonne texte (gauche) ====== -->
        <!-- v-reveal : slide depuis la gauche à l'entrée dans le viewport -->
        <v-col cols="12" md="6" class="about-text-col" v-reveal="'fade-right'">
          <div class="about-text-wrapper">
            <!-- Étiquette -->
            <span class="about-badge text-caption font-weight-bold text-uppercase">
              <v-icon start size="14" class="badge-icon">mdi-ribbon-outline</v-icon>
              Notre histoire
            </span>

            <!-- Titre -->
            <h2 class="about-title">
              Une mode qui vous ressemble,
              <span class="text-primary">responsable</span> et intemporelle
            </h2>

            <!-- Paragraphes -->
            <p class="about-paragraph text-body-1 text-medium-emphasis">
              Née en 2020 d'une conviction simple — la mode ne devrait pas
              sacrifier l'éthique sur l'autel de l'esthétique — notre boutique
              s'est donné pour mission de proposer des vêtements et accessoires
              qui allient élégance, qualité et respect de l'environnement.
            </p>

            <p class="about-paragraph text-body-1 text-medium-emphasis">
              Chaque pièce de notre collection est soigneusement sélectionnée
              auprès d'artisans et de manufactures européennes qui partagent
              nos valeurs : matières premières durables, conditions de travail
              équitables et savoir-faire traditionnel.
            </p>

            <p class="about-paragraph text-body-1 text-medium-emphasis">
              Nous croyons en une consommation plus réfléchie. Plutôt que de
              suivre les tendances éphémères, nous privilégions des créations
              intemporelles qui traversent les saisons avec grâce.
            </p>

            <!-- Bouton CTA -->
            <v-btn
              size="large"
              color="primary"
              variant="elevated"
              rounded="pill"
              class="about-btn"
              to="/about"
              aria-label="En savoir plus sur la marque"
            >
              En savoir plus
              <v-icon end size="20">mdi-arrow-right</v-icon>
            </v-btn>
          </div>
        </v-col>

        <!-- ====== Colonne illustration (droite) ====== -->
        <!-- v-reveal : slide depuis la droite avec léger délai -->
        <v-col cols="12" md="5" class="about-image-col" v-reveal="{ variant: 'fade-left', delay: 150 }">
          <div class="about-image-wrapper">
            <div class="about-placeholder" aria-hidden="true">
              <!-- Cercles décoratifs -->
              <div class="deco-circle deco-circle-1" />
              <div class="deco-circle deco-circle-2" />

              <!-- Icône centrale -->
              <div class="placeholder-icon">
                <v-icon size="72" color="primary" class="placeholder-main-icon">
                  mdi-leaf-circle-outline
                </v-icon>
              </div>

              <!-- Mini étiquettes -->
              <div class="deco-tag deco-tag-1">
                <v-icon size="14" color="white">mdi-tshirt-crew-outline</v-icon>
                <span class="text-caption font-weight-bold">Éco-responsable</span>
              </div>
              <div class="deco-tag deco-tag-2">
                <v-icon size="14" color="white">mdi-hand-heart-outline</v-icon>
                <span class="text-caption font-weight-bold">Artisanat</span>
              </div>
              <div class="deco-tag deco-tag-3">
                <v-icon size="14" color="white">mdi-leaf-outline</v-icon>
                <span class="text-caption font-weight-bold">Durable</span>
              </div>

              <!-- Motif points -->
              <div class="dot-pattern" />
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup lang="ts">
/**
 * AboutSection.vue – Section éditoriale "À propos" de la marque.
 *
 * Présente l'histoire, les valeurs et la mission de la boutique
 * avec une mise en page texte/image responsive.
 */

defineOptions({ name: 'AboutSection' });
</script>

<style scoped>
/* ================================================================
   SECTION À PROPOS
   ================================================================ */

.about-section {
  position: relative;
  overflow: hidden;
  padding-block: 4rem;
  background: linear-gradient(
    135deg,
    rgb(var(--v-theme-background)) 0%,
    rgba(var(--v-theme-primary), 0.03) 60%,
    rgba(var(--v-theme-primary), 0.01) 100%
  );
}

/* ================================================================
   COLONNE TEXTE
   ================================================================ */

.about-text-col {
  position: relative;
  z-index: 2;
}

.about-text-wrapper {
  max-width: 560px;
  margin: 0 auto;
}

/* --- Badge --- */
.about-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 16px;
  border-radius: 100px;
  background: rgba(var(--v-theme-primary), 0.08);
  color: rgb(var(--v-theme-primary));
  letter-spacing: 0.05em;
  margin-bottom: 24px;
}

.badge-icon {
  animation: sparkle 2s ease-in-out infinite;
}

/* --- Titre --- */
.about-title {
  font-size: clamp(1.8rem, 3.5vw, 2.5rem);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.015em;
  color: rgb(var(--v-theme-on-background));
  margin-bottom: 24px;
}

/* --- Paragraphes --- */
.about-paragraph {
  line-height: 1.8;
  margin-bottom: 18px;
}

.about-paragraph:last-of-type {
  margin-bottom: 32px;
}

/* --- Bouton --- */
.about-btn {
  text-transform: none !important;
  font-weight: 600;
  letter-spacing: 0.01em;
  padding-inline: 32px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.about-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(var(--v-theme-primary), 0.35) !important;
}

/* ================================================================
   COLONNE ILLUSTRATION
   ================================================================ */

.about-image-col {
  position: relative;
}

.about-image-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 1rem;
}

/* --- Placeholder --- */
.about-placeholder {
  position: relative;
  width: 100%;
  max-width: 420px;
  aspect-ratio: 1 / 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 32px;
  background: linear-gradient(
    145deg,
    rgba(var(--v-theme-primary), 0.06) 0%,
    rgba(var(--v-theme-primary), 0.02) 100%
  );
  border: 1px solid rgba(var(--v-theme-primary), 0.08);
  overflow: hidden;
}

/* --- Cercles décoratifs --- */
.deco-circle {
  position: absolute;
  border-radius: 50%;
}

.deco-circle-1 {
  width: 240px;
  height: 240px;
  background: radial-gradient(
    circle,
    rgba(var(--v-theme-primary), 0.10) 0%,
    transparent 70%
  );
  top: -30px;
  right: -50px;
}

.deco-circle-2 {
  width: 160px;
  height: 160px;
  background: radial-gradient(
    circle,
    rgba(var(--v-theme-primary), 0.06) 0%,
    transparent 70%
  );
  bottom: -20px;
  left: -30px;
}

/* --- Icône centrale --- */
.placeholder-icon {
  position: relative;
  z-index: 2;
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: rgba(var(--v-theme-primary), 0.08);
  backdrop-filter: blur(4px);
}

.placeholder-main-icon {
  animation: float 4s ease-in-out infinite;
}

/* --- Mini étiquettes --- */
.deco-tag {
  position: absolute;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 100px;
  background: rgb(var(--v-theme-primary));
  color: white;
  box-shadow: 0 4px 16px rgba(var(--v-theme-primary), 0.25);
  white-space: nowrap;
  opacity: 0;
  animation: fade-up 0.5s ease-out forwards;
}

.deco-tag-1 {
  top: 15%;
  right: 10%;
  animation-delay: 0.5s;
}

.deco-tag-2 {
  bottom: 20%;
  left: 8%;
  animation-delay: 0.7s;
}

.deco-tag-3 {
  bottom: 5%;
  right: 14%;
  animation-delay: 0.9s;
}

/* --- Motif points --- */
.dot-pattern {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(
    rgba(var(--v-theme-primary), 0.06) 1px,
    transparent 1px
  );
  background-size: 24px 24px;
  z-index: 0;
}

/* ================================================================
   ANIMATIONS
   ================================================================ */

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

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

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

/* ================================================================
   RESPONSIVE
   ================================================================ */

@media (max-width: 959px) {
  .about-section {
    padding-block: 2.5rem;
  }

  .about-text-wrapper {
    text-align: center;
    max-width: 100%;
  }

  .about-paragraph {
    text-align: left;
  }

  .about-image-wrapper {
    padding-block: 3rem 0;
  }

  .about-placeholder {
    max-width: 340px;
  }
}

@media (max-width: 600px) {
  .about-title {
    font-size: 1.5rem;
  }

  .about-placeholder {
    max-width: 260px;
    border-radius: 24px;
  }

  .placeholder-icon {
    width: 90px;
    height: 90px;
  }

  .placeholder-main-icon {
    font-size: 52px !important;
  }

  .deco-tag {
    padding: 4px 10px;
    font-size: 0.7rem;
  }

  .deco-tag-1 {
    top: 10%;
    right: 5%;
  }

  .deco-tag-2 {
    left: 3%;
  }

  .deco-circle-1 {
    width: 160px;
    height: 160px;
  }

  .deco-circle-2 {
    width: 100px;
    height: 100px;
  }
}
</style>
