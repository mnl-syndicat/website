<script setup>
useHead({
  title: 'MNL — Articles',
  meta: [
    {name: 'description', content: 'Retrouvez tous les articles du Mouvement National Lycéen'},
    {name: 'og:title', content: 'Mouvement National Lycéen — Articles'},
    {name: 'og:description', content: 'Retrouvez tous les articles du Mouvement National Lycéen'},
  ],
})
</script>

<template>
  <section>
    <h1>ARTICLES</h1>
    <div class="card-grid">
      <router-link v-for="article in getArticles()" :to="'/article/' + article.link" class="card">
        <img :src="article.image" alt="">
        <h3>{{ article.title }}</h3>
        <p>{{ article.date }}</p>
      </router-link>
    </div>
  </section>
</template>