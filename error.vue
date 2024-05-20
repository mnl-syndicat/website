<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <top-bar />
  <section>
    <h1 v-if="error!.statusCode === 404">Erreur 404 — La page demandée n'existe pas</h1>
    <h1 v-else-if="error!.statusCode === 500">Erreur 500 — Une erreur est survenue sur le serveur</h1>
    <h1 v-else-if="error!.statusCode === 403">Erreur 403 — Vous n'avez pas les droits pour accéder à cette page</h1>
    <h1 v-else-if="error!.statusCode === 401">Erreur 401 — Vous devez être connecté pour accéder à cette page</h1>
    <h1 v-else-if="error!.statusCode === 400">Erreur 400 — Requête invalide</h1>
    <h1 v-else-if="error!.statusCode === 429">Erreur 429 — Trop de requêtes ont été effectuées</h1>
    <h1 v-else-if="error!.statusCode === 503">Erreur 503 — Service indisponible</h1>
    <h1 v-else-if="error!.statusCode === 504">Erreur 504 — Délai d'attente dépassé</h1>
    <h1 v-else>Erreur {{ error!.statusCode }} — {{ error!.message }}</h1>
    <p v-if="error!.statusCode === 500">Ne vous inquiétez pas, nous avons été notifiés de l'erreur et nous allons la corriger au plus vite.</p>
    <btn @click="handleError" label="Retour à l'accueil" icon="ph:house-bold"/>
  </section>
  <foot />
</template>