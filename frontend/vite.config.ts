import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';

export default defineConfig({
  plugins: [
    vue(),
    vuetify({ autoImport: true }),
  ],
  build: {
    // Limite de warning relevée pour les gros chunks Vuetify
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        // ============================================================
        // CODE-SPLITTING – découpage des dépendances en chunks stables
        // Améliore le cache navigateur (les librairies ne sont pas
        // re-téléchargées à chaque déploiement) et le chargement initial.
        // Combiné au lazy loading des routes dans router/index.ts.
        // ============================================================
        manualChunks(id: string): string | undefined {
          if (id.includes('node_modules/vuetify')) return 'vuetify';
          if (id.includes('node_modules/@mdi')) return 'mdi-icons';
          if (id.includes('node_modules/axios')) return 'axios';
          if (
            id.includes('node_modules/vue') ||
            id.includes('node_modules/@vue') ||
            id.includes('node_modules/pinia') ||
            id.includes('node_modules/vue-router')
          ) {
            return 'vue-vendor';
          }
          // Les autres dépendances restent dans le chunk applicatif
          return undefined;
        },
      },
    },
  },
});
