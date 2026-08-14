<template>
  <section class="contact-view pa-6">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8" lg="6" v-reveal>
          <h1 class="text-h3 font-weight-bold mb-4 text-center">Contact</h1>
          <v-divider class="mb-6" />
          <p class="text-body-1 text-medium-emphasis mb-6">
            Une question ? Une suggestion ? N'hésitez pas à nous écrire.
          </p>

          <v-card variant="outlined" class="pa-4">
            <v-list>
              <v-list-item prepend-icon="mdi-email-outline" title="Email" subtitle="contact@boutique.com" />
              <v-list-item prepend-icon="mdi-phone-outline" title="Téléphone" subtitle="+33 1 23 45 67 89" />
              <v-list-item prepend-icon="mdi-map-marker-outline" title="Adresse" subtitle="Paris, France" />
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup lang="ts">
// Contact page – statique, prête pour éditions futures
</script>
