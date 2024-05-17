<script setup lang="ts">
useHead({
  title: 'MNL — Matériel Militant',
  meta: [
    {name: 'description', content: 'Retrouvez tout le matériel militant du Mouvement National Lycéen'},
    {name: 'og:title', content: 'Mouvement National Lycéen — Matériel Militant'},
    {name: 'og:description', content: 'Retrouvez tout le matériel militant du Mouvement National Lycéen'},
  ],
})
</script>

<template>
  <top-bar current-tab="/interne/materiel" :internal="true"/>
  <section class="materiel">
    <h1>MATÉRIEL MILITANT</h1>

    <div class="card-grid">
      <a class="card" v-for="materiel of getMateriel()" :href="materiel.file" target="_blank" >
        <img :src="materiel.image" alt="">
        <h3>{{ materiel.title }}</h3>
      </a>
    </div>
  </section>
</template>