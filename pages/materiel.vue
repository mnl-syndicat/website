<script setup>
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
  <top-bar current-tab="/materiel" />
  <section class="materiel">
    <h1>MATÉRIEL MILITANT</h1>

    <div class="card-grid">
      <div class="card" v-for="materiel of getMateriel()">
        <a :href="materiel.file">
          <img :src="materiel.image" alt="">
          <h3>{{ materiel.title }}</h3>
        </a>
      </div>
    </div>
  </section>
</template>