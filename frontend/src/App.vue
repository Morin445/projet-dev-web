<template>
  <v-app>
    <AppHeader />
    <v-main>
      <!-- ============================================================
           Transition fluide entre les pages (Vue Router)
           Fade + léger slide vertical + très léger zoom, mode out-in.
           Les classes `page-*` sont définies dans src/styles/global.css.
           ============================================================ -->
      <router-view v-slot="{ Component }">
        <!-- Transition fluide entre les pages (fade + léger slide + zoom).
             Sans mode "out-in" : la nouvelle vue est rendue IMMÉDIATEMENT
             (l'ancienne se fond en fondu). La machine à états out-in pouvait
             rester bloquée après une navigation (chunk lazy + sortie non
             terminée), laissant la page vide sans erreur console. -->
        <transition name="page" appear>
          <component :is="Component" />
        </transition>
      </router-view>
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script setup lang="ts">
import AppHeader from './components/layout/AppHeader.vue';
import AppFooter from './components/layout/AppFooter.vue';
</script>

<style>
/* ================================================================
   GLOBAL – garde-fou responsive
   Empêche tout débordement horizontal involontaire sur tous les
   écrans (éléments décoratifs, dégradés, longues chaînes de texte...).
   `clip` est utilisé (plutôt que `hidden`) pour ne pas créer de
   conteneur de défilement et préserver le `position: sticky`
   (carte résumé du panier sur desktop).
   ================================================================ */
html {
  overflow-x: clip;
}

body {
  overflow-x: clip;
}
</style>