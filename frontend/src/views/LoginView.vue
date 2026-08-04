<template>
  <!-- ====== PAGE CONNEXION ====== -->
  <section class="login-view">
    <v-container>
      <v-row justify="center" align="center" class="login-row">

        <!-- ====== Carte de connexion ====== -->
        <v-col cols="12" sm="10" md="6" lg="5" xl="4">
          <v-card class="login-card" elevation="0" rounded="xl">

            <!-- En-tête -->
            <div class="login-header text-center pa-6 pb-0">
              <v-avatar color="primary" variant="tonal" size="64" class="mb-3">
                <v-icon size="32">mdi-account-circle-outline</v-icon>
              </v-avatar>
              <h1 class="text-h4 font-weight-bold mb-1">Connexion</h1>
              <p class="text-body-2 text-medium-emphasis">
                Connectez-vous pour accéder à votre compte
              </p>
            </div>

            <!-- Formulaire -->
            <v-card-text class="pa-6">
              <v-form ref="formRef" @submit.prevent="handleLogin" class="login-form">

                <!-- Email -->
                <v-text-field
                  v-model="email"
                  label="Adresse e-mail"
                  placeholder="exemple@email.com"
                  variant="outlined"
                  type="email"
                  prepend-inner-icon="mdi-email-outline"
                  :rules="emailRules"
                  :error-messages="emailError"
                  autocomplete="email"
                  class="mb-3"
                  density="comfortable"
                  rounded="lg"
                  @update:model-value="clearErrors"
                />

                <!-- Mot de passe -->
                <v-text-field
                  v-model="password"
                  label="Mot de passe"
                  placeholder="Votre mot de passe"
                  variant="outlined"
                  :type="showPassword ? 'text' : 'password'"
                  prepend-inner-icon="mdi-lock-outline"
                  :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  :rules="passwordRules"
                  :error-messages="passwordError"
                  autocomplete="current-password"
                  class="mb-2"
                  density="comfortable"
                  rounded="lg"
                  @click:append-inner="showPassword = !showPassword"
                  @update:model-value="clearErrors"
                />

                <!-- Liens (mot de passe oublié – décoratif) -->
                <div class="d-flex justify-end mb-4">
                  <a
                    href="#"
                    class="text-caption text-primary font-weight-medium forgot-link"
                    @click.prevent
                  >
                    Mot de passe oublié ?
                  </a>
                </div>

                <!-- Message d'erreur global -->
                <v-alert
                  v-if="globalError"
                  type="error"
                  variant="tonal"
                  density="compact"
                  closable
                  class="mb-4 global-error"
                  @click:close="globalError = ''"
                >
                  <v-icon start size="18" class="me-1">mdi-alert-circle-outline</v-icon>
                  {{ globalError }}
                </v-alert>

                <!-- Message de succès (redirection) -->
                <v-alert
                  v-if="loginSuccess"
                  type="success"
                  variant="tonal"
                  density="compact"
                  class="mb-4"
                >
                  <v-icon start size="18" class="me-1">mdi-check-circle-outline</v-icon>
                  Connexion réussie ! Redirection...
                </v-alert>

                <!-- Bouton de connexion -->
                <v-btn
                  block
                  color="primary"
                  variant="elevated"
                  size="large"
                  rounded="pill"
                  type="submit"
                  :loading="isLoading"
                  :disabled="isLoading"
                  class="login-btn"
                >
                  <v-icon start size="20">mdi-login</v-icon>
                  Se connecter
                </v-btn>

              </v-form>
            </v-card-text>

            <!-- Pied de carte -->
            <v-card-text class="text-center pa-6 pt-0">
              <p class="text-body-2 text-medium-emphasis mb-3">
                Vous n'avez pas de compte ?
              </p>
              <v-btn
                variant="outlined"
                color="primary"
                rounded="pill"
                size="small"
                class="register-btn"
                to="/login"
              >
                Créer un compte
              </v-btn>
            </v-card-text>

            <!-- Infos démo -->
            <v-divider />
            <v-card-text class="pa-4 bg-grey-lighten-4 rounded-b-xl">
              <p class="text-caption text-medium-emphasis text-center">
                <v-icon start size="14">mdi-information-outline</v-icon>
                Compte démo : <strong>demo@boutique.fr</strong> / <strong>demo123</strong>
              </p>
            </v-card-text>

          </v-card>
        </v-col>

      </v-row>
    </v-container>
  </section>
</template>

<script setup lang="ts">
/**
 * LoginView.vue – Page de connexion avec validation des champs.
 *
 * Affiche un formulaire avec email et mot de passe, valide les champs
 * côté client, simule un appel API, et redirige l'utilisateur vers
 * la page précédente ou l'accueil après connexion réussie.
 *
 * Le champ `redirect` dans la query string permet de rediriger
 * après connexion (ex: ?redirect=/cart).
 */
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '../stores/auth.store';

defineOptions({ name: 'LoginView' });

// ====== Stores & routeurs ======
const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

// ====== Référence au formulaire Vuetify ======
const formRef = ref<InstanceType<typeof HTMLFormElement> | null>(null);

// ====== Champs du formulaire ======
const email = ref('');
const password = ref('');
const showPassword = ref(false);

// ====== États ======
const isLoading = ref(false);
const loginSuccess = ref(false);
const globalError = ref('');

// ====== Validation ======
const emailRules = [
  (v: string) => !!v || 'L\'adresse e-mail est requise.',
  (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Format d\'e-mail invalide.',
];

const passwordRules = [
  (v: string) => !!v || 'Le mot de passe est requis.',
  (v: string) => v.length >= 6 || 'Minimum 6 caractères.',
];

// ====== Erreurs individuelles (décoratives) ======
const emailError = ref('');
const passwordError = ref('');

function clearErrors(): void {
  globalError.value = '';
  emailError.value = '';
  passwordError.value = '';
}

// ====== Soumission du formulaire ======
async function handleLogin(): Promise<void> {
  // Validation via les règles Vuetify
  const { valid } = await (formRef.value as unknown as { validate: () => Promise<{ valid: boolean }> }).validate();
  if (!valid) return;

  isLoading.value = true;
  globalError.value = '';
  loginSuccess.value = false;

  try {
    await authStore.login(email.value, password.value);
    loginSuccess.value = true;

    // Redirection après connexion
    const redirectTo = (route.query.redirect as string) || '/';
    setTimeout(() => {
      router.push(redirectTo);
    }, 600);
  } catch (err: unknown) {
    globalError.value = err instanceof Error ? err.message : 'Erreur de connexion.';
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>
/* ================================================================
   PAGE CONNEXION
   ================================================================ */

.login-view {
  background: linear-gradient(
    160deg,
    rgba(var(--v-theme-primary), 0.03) 0%,
    rgba(var(--v-theme-background), 1) 50%,
    rgba(var(--v-theme-secondary), 0.02) 100%
  );
  min-height: calc(100vh - 64px - 200px);
  display: flex;
  align-items: center;
  padding-block: 3rem;
}

.login-row {
  width: 100%;
  margin: 0;
}

/* ================================================================
   CARTE DE CONNEXION
   ================================================================ */

.login-card {
  border: 1px solid rgba(var(--v-theme-on-surface), 0.08) !important;
  background: rgb(var(--v-theme-surface));
  overflow: hidden;
  animation: card-fade 0.4s ease-out;
}

@keyframes card-fade {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ================================================================
   FORMULAIRE
   ================================================================ */

.login-form :deep(.v-field) {
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.login-form :deep(.v-field--focused) {
  border-color: rgb(var(--v-theme-primary)) !important;
  box-shadow: 0 0 0 3px rgba(var(--v-theme-primary), 0.08) !important;
}

/* ================================================================
   BOUTON CONNEXION
   ================================================================ */

.login-btn {
  text-transform: none !important;
  font-weight: 600;
  letter-spacing: 0.01em;
  height: 48px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.login-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(var(--v-theme-primary), 0.3) !important;
}

/* ================================================================
   LIENS
   ================================================================ */

.forgot-link {
  text-decoration: none;
  transition: color 0.2s ease;
}

.forgot-link:hover {
  color: rgb(var(--v-theme-on-background)) !important;
}

.register-btn {
  text-transform: none !important;
  font-weight: 600;
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.register-btn:hover {
  transform: translateY(-2px);
  background-color: rgba(var(--v-theme-primary), 0.06);
}

/* ================================================================
   MESSAGES
   ================================================================ */

.global-error {
  border-radius: 10px;
}

/* ================================================================
   RESPONSIVE
   ================================================================ */

@media (max-width: 600px) {
  .login-view {
    padding-block: 2rem;
    min-height: calc(100vh - 56px - 300px);
  }

  .login-header h1 {
    font-size: 1.75rem !important;
  }

  .login-form :deep(.v-field__input) {
    font-size: 0.925rem;
  }
}
</style>
