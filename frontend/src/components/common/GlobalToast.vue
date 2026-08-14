<template>
  <!-- ====== Toast global (feedback discret) ======
       Piloté par le store toast : message, couleur et visibilité.
       Le minuteur est géré par le store (timeout="-1" désactive
       l'auto-fermeture Vuetify, la fermeture vient du store). -->
  <v-snackbar
    v-model="toast.visible"
    :color="toast.color"
    location="bottom center"
    rounded="pill"
    timeout="-1"
    transition="scroll-y-transition"
    class="global-toast"
  >
    <div class="d-flex align-center">
      <v-icon start size="18">{{ icon }}</v-icon>
      <span class="text-body-2 font-weight-medium">{{ toast.message }}</span>
    </div>

    <template #actions>
      <v-btn
        icon
        variant="text"
        size="small"
        class="toast-close-btn"
        aria-label="Fermer la notification"
        @click="toast.hide()"
      >
        <v-icon size="16">mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
/**
 * GlobalToast.vue – Snackbar global affiché en bas d'écran.
 *
 * Consomme le store toast (singleton) : tous les composants de
 * l'application peuvent déclencher un feedback via
 * `useToastStore().show('message', 'success')`.
 */
import { computed } from 'vue';
import { useToastStore } from '../../stores/toast.store';

defineOptions({ name: 'GlobalToast' });

const toast = useToastStore();

const icon = computed<string>(() => {
  if (toast.color === 'error') return 'mdi-alert-circle-outline';
  if (toast.color === 'info') return 'mdi-information-outline';
  return 'mdi-check-circle-outline';
});
</script>

<style scoped>
/* --- Fond du toast : tonalité semi-transparente sur la couleur --- */
.global-toast :deep(.v-snackbar__wrapper) {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.16) !important;
  backdrop-filter: blur(6px);
}

.toast-close-btn {
  margin-left: 8px;
}

/* --- Hauteur de pile : le toast passe au-dessus des drawers --- */
.global-toast {
  z-index: 4000;
}
</style>
