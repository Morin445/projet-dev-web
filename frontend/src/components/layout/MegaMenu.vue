<template>
  <!-- ====== MegaMenu – Grille des catégories boutique ======
       Utilisé à la fois :
       - dans le dropdown "Catégories" du Header desktop
       - dans le Drawer mobile via la classe "mobile-mega-menu"   -->
  <v-sheet class="mega-menu" rounded="lg">
    <v-list density="compact" nav>
      <v-list-item
        v-for="cat in categories"
        :key="cat.label"
        :prepend-icon="cat.icon"
        :title="cat.label"
        :to="cat.to"
        rounded="lg"
        class="mega-item"
        color="primary"
      />
    </v-list>
  </v-sheet>
</template>

<script setup lang="ts">
/**
 * Interface d'une catégorie du méga-menu.
 * Ajoutez simplement un objet dans le tableau `categories`
 * pour ajouter une nouvelle entrée.
 */
interface Category {
  /** Texte affiché */
  label: string;
  /** Route de destination (chemin + query params) */
  to: { path: string; query: Record<string, string> };
  /** Icône Material Design (MDI) */
  icon: string;
}

/**
 * Liste des catégories de la boutique.
 * Chaque catégorie pointe vers `/collection` avec un filtre `categorie`
 * passé en query param, exploitable côté CollectionView sans backend.
 */
const categories: Category[] = [
  { label: 'Nouveautés',   to: { path: '/collection', query: { categorie: 'nouveautes' } },  icon: 'mdi-flash-outline' },
  { label: 'Homme',        to: { path: '/collection', query: { categorie: 'homme' } },       icon: 'mdi-human-male' },
  { label: 'Femme',        to: { path: '/collection', query: { categorie: 'femme' } },       icon: 'mdi-human-female' },
  { label: 'Enfants',      to: { path: '/collection', query: { categorie: 'enfants' } },     icon: 'mdi-human-child' },
  { label: 'Chaussures',   to: { path: '/collection', query: { categorie: 'chaussures' } },  icon: 'mdi-shoe-sneaker' },
  { label: 'Accessoires',  to: { path: '/collection', query: { categorie: 'accessoires' } }, icon: 'mdi-bag-personal-outline' },
  { label: 'Promotions',   to: { path: '/collection', query: { categorie: 'promotions' } },  icon: 'mdi-percent-outline' },
];
</script>

<style scoped>
/* ====== Conteneur du menu ====== */
.mega-menu {
  min-width: 220px;
  background: transparent !important;
}

/* ====== Chaque entrée du menu ====== */
.mega-item {
  margin: 2px 4px;
  border-radius: 10px;
  transition: background-color 0.2s ease, transform 0.15s ease;
}

/* --- Hover : fond teinté primary + léger décalage --- */
.mega-item.v-list-item--variant-text:hover {
  background-color: rgba(var(--v-theme-primary), 0.08);
  transform: translateX(4px);
}

/* --- Icône : taille et couleur harmonisées --- */
.mega-item :deep(.v-list-item__prepend > .v-icon) {
  font-size: 1.25rem;
  color: rgb(var(--v-theme-primary));
  opacity: 0.85;
  transition: opacity 0.2s ease;
}

.mega-item:hover :deep(.v-list-item__prepend > .v-icon) {
  opacity: 1;
}

/* --- Titre : texte légèrement renforcé --- */
.mega-item :deep(.v-list-item-title) {
  font-weight: 500;
  font-size: 0.9rem;
}

/* ====== Responsive : adapte la largeur sur mobile ====== */
@media (max-width: 600px) {
  .mega-menu {
    min-width: auto;
    width: 100%;
  }
}
</style>
