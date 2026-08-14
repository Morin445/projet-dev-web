<template>
  <!-- ====== PAGE INTROUVABLE (404) ====== -->
  <section class="not-found-view">
    <v-container>
      <v-row justify="center" align="center" class="not-found-row">
        <v-col cols="12" md="7" lg="6" class="text-center" v-reveal>
          <!-- Grand 404 décoratif -->
          <h1 class="not-found-code text-primary">404</h1>

          <v-icon size="64" color="grey-lighten-1" class="mb-4">
            mdi-compass-outline
          </v-icon>

          <h2 class="text-h4 font-weight-bold mb-2">Page introuvable</h2>
          <p class="text-body-1 text-medium-emphasis mx-auto mb-6 not-found-subtitle">
            La page que vous recherchez n'existe pas ou a été déplacée.
            Pas d'inquiétude, la boutique est toujours ouverte !
          </p>

          <div class="d-flex justify-center flex-wrap ga-3">
            <v-btn
              color="primary"
              variant="elevated"
              size="large"
              rounded="pill"
              class="not-found-btn"
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
              class="not-found-btn"
              to="/collection"
              aria-label="Voir la collection"
            >
              Voir la collection
              <v-icon end>mdi-arrow-right</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup lang="ts">
/**
 * NotFoundView.vue – Page 404.
 *
 * Affiche un message clair avec deux actions de retour (accueil / collection).
 * Atteinte par la route catch-all pour toute URL inconnue, ce qui évite
 * toute page blanche lors de la navigation.
 */
defineOptions({ name: 'NotFoundView' });
</script>

<style scoped>
/* ================================================================
   PAGE 404
   ================================================================ */

.not-found-view {
  background: linear-gradient(
    160deg,
    rgba(var(--v-theme-primary), 0.05) 0%,
    rgb(var(--v-theme-background)) 50%,
    rgba(var(--v-theme-secondary), 0.03) 100%
  );
  min-height: 72vh;
  display: flex;
  align-items: center;
  padding-block: 3rem;
}

.not-found-row {
  width: 100%;
  margin: 0;
}

/* --- Grand 404 en serif (Playfair) --- */
.not-found-code {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(5rem, 14vw, 9rem);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.02em;
  opacity: 0.85;
  margin-bottom: 1rem;
  user-select: none;
}

.not-found-subtitle {
  max-width: 460px;
  line-height: 1.7;
}

/* --- Boutons --- */
.not-found-btn {
  text-transform: none !important;
  font-weight: 600;
  letter-spacing: 0.01em;
  padding-inline: 28px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.not-found-btn:hover {
  transform: translateY(-2px);
}

/* ================================================================
   RESPONSIVE
   ================================================================ */

@media (max-width: 600px) {
  .not-found-view {
    min-height: 60vh;
    padding-block: 2rem;
  }

  .not-found-btn {
    width: 100%;
  }
}
</style>
