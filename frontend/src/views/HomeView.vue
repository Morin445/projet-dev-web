<template>
  <main>
    <Hero />
    <TrustBadges />
    <Testimonials />
    <AboutSection />
  </main>
</template>

<script setup lang="ts">
/**
 * HomeView.vue - Page d'accueil
 *
 * Affiche les composants communs dans l'ordre :
 * Hero → TrustBadges → Testimonials → AboutSection
 */
import Hero from '../components/common/Hero.vue';
import TrustBadges from '../components/common/TrustBadges.vue';
import Testimonials from '../components/common/Testimonials.vue';
import AboutSection from '../components/common/AboutSection.vue';
</script>