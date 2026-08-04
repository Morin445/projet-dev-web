<template>
  <!-- ====== Section Témoignages ====== -->
  <section class="testimonials-section">
    <v-container>
      <!-- En-tête : apparition douce au scroll -->
      <div class="section-header text-center mb-8" v-reveal>
        <span class="section-badge text-caption font-weight-bold text-uppercase">
          <v-icon start size="14" class="badge-icon">mdi-star-circle-outline</v-icon>
          Ils nous font confiance
        </span>
        <h2 class="section-title text-h3 font-weight-bold mt-3 mb-3">
          Ce que disent nos clients
        </h2>
        <p class="section-subtitle text-body-1 text-medium-emphasis mx-auto">
          Des milliers de clients satisfaits partagent leur expérience.
        </p>
      </div>

      <!-- Cartes témoignages -->
      <v-row>
        <v-col
          v-for="(testimonial, index) in testimonials"
          :key="testimonial.name"
          cols="12"
          md="4"
        >
          <!-- v-reveal : apparition en cascade (stagger) de chaque carte -->
          <v-card
            v-reveal="{ delay: index * 120 }"
            class="testimonial-card"
            elevation="0"
            rounded="xl"
            variant="outlined"
          >
            <v-card-item class="testimonial-card-content">
              <!-- Étoiles -->
              <div class="stars-wrapper mb-3">
                <v-icon
                  v-for="i in 5"
                  :key="i"
                  size="18"
                  :color="i <= testimonial.rating ? 'warning' : 'grey-lighten-2'"
                  class="star-icon"
                >
                  {{ i <= testimonial.rating ? 'mdi-star' : 'mdi-star-outline' }}
                </v-icon>
              </div>

              <!-- Commentaire -->
              <blockquote class="testimonial-text text-body-1 mb-4">
                « {{ testimonial.comment }} »
              </blockquote>

              <!-- Auteur -->
              <div class="testimonial-author">
                <v-avatar
                  :color="testimonial.avatarColor"
                  size="44"
                  class="author-avatar"
                >
                  <span class="text-body-2 font-weight-bold text-white">
                    {{ testimonial.initials }}
                  </span>
                </v-avatar>
                <div class="author-info">
                  <span class="author-name text-subtitle-2 font-weight-bold">
                    {{ testimonial.name }}
                  </span>
                  <span class="author-role text-caption text-medium-emphasis">
                    {{ testimonial.role }}
                  </span>
                </div>
              </div>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup lang="ts">
/**
 * Testimonials.vue – Section de témoignages clients.
 *
 * Affiche 3 cartes responsives avec notes, commentaires et avatars.
 * Données statiques de démonstration.
 */

defineOptions({ name: 'Testimonials' });

interface Testimonial {
  name: string;
  initials: string;
  role: string;
  comment: string;
  rating: number;
  avatarColor: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Sophie Moreau',
    initials: 'SM',
    role: 'Cliente régulière',
    comment:
      'Une expérience d\'achat remarquable. La qualité des vêtements dépasse mes attentes et la livraison a été très rapide. Je recommande vivement !',
    rating: 5,
    avatarColor: '#f093fb',
  },
  {
    name: 'Thomas Lefèvre',
    initials: 'TL',
    role: 'Acheteur occasionnel',
    comment:
      'Catalogue varié et de grande qualité. Le service client a été très réactif pour m\'aider à choisir ma taille. Un vrai professionnalisme.',
    rating: 5,
    avatarColor: '#4facfe',
  },
  {
    name: 'Camille Roussel',
    initials: 'CR',
    role: 'Nouvelle cliente',
    comment:
      'Je suis agréablement surprise par la qualité des matériaux et le soin apporté aux finitions. Le site est agréable et la navigation intuitive.',
    rating: 4,
    avatarColor: '#fa709a',
  },
];
</script>

<style scoped>
/* ================================================================
   SECTION TÉMOIGNAGES
   ================================================================ */

.testimonials-section {
  padding-block: 4rem;
  background: linear-gradient(
    180deg,
    rgba(var(--v-theme-primary), 0.02) 0%,
    rgb(var(--v-theme-background)) 100%
  );
}

/* --- En-tête --- */
.section-header {
  max-width: 600px;
  margin-inline: auto;
}

.section-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 16px;
  border-radius: 100px;
  background: rgba(var(--v-theme-primary), 0.08);
  color: rgb(var(--v-theme-primary));
  letter-spacing: 0.05em;
}

.badge-icon {
  animation: sparkle 2s ease-in-out infinite;
}

.section-title {
  color: rgb(var(--v-theme-on-background));
  line-height: 1.2;
}

.section-subtitle {
  max-width: 480px;
}

/* --- Carte témoignage --- */
.testimonial-card {
  height: 100%;
  border: 1px solid rgba(var(--v-theme-on-surface), 0.08) !important;
  background: rgb(var(--v-theme-surface));
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

.testimonial-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 40px rgba(var(--v-theme-primary), 0.08) !important;
  border-color: rgba(var(--v-theme-primary), 0.20) !important;
}

.testimonial-card-content {
  display: flex;
  flex-direction: column;
  padding: 2rem 1.5rem;
  height: 100%;
}

/* --- Étoiles --- */
.stars-wrapper {
  display: flex;
  gap: 2px;
}

.star-icon {
  transition: transform 0.2s ease;
}

.testimonial-card:hover .star-icon {
  animation: star-pulse 0.4s ease;
}

/* --- Commentaire --- */
.testimonial-text {
  flex: 1;
  color: rgb(var(--v-theme-on-surface));
  line-height: 1.7;
  font-style: italic;
  quotes: none;
}

/* --- Auteur --- */
.testimonial-author {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid rgba(var(--v-theme-on-surface), 0.06);
}

.author-avatar {
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.testimonial-card:hover .author-avatar {
  transform: scale(1.1);
}

.author-info {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.author-name {
  color: rgb(var(--v-theme-on-background));
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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

@keyframes star-pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}

/* ================================================================
   RESPONSIVE
   ================================================================ */

@media (max-width: 959px) {
  .testimonials-section {
    padding-block: 2.5rem;
  }

  .testimonial-card-content {
    padding: 1.5rem 1.25rem;
  }
}

@media (max-width: 600px) {
  .section-title {
    font-size: 1.75rem;
  }

  .testimonial-card-content {
    padding: 1.25rem 1rem;
  }
}
</style>
