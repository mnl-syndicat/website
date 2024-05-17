<script setup lang="ts">
const selectedCategory = ref('all');

useHead({
  title: 'MNL — Articles',
  meta: [
    {name: 'description', content: 'Retrouvez tous les articles du Mouvement National Lycéen'},
    {name: 'og:title', content: 'Mouvement National Lycéen — Articles'},
    {name: 'og:description', content: 'Retrouvez tous les articles du Mouvement National Lycéen'},
  ],
})

const getFilteredArticles = () => {
  if (selectedCategory.value === 'all') return getArticles();
  return getArticles().filter(article => article.category === selectedCategory.value);
}
</script>

<template>
  <top-bar current-tab="/articles" />
  <section>
    <h1>ARTICLES</h1>
    <div class="category-chooser">
      <a v-for="category in getArticlesCategories()" @click="selectedCategory = category" :class="{ active: selectedCategory === category }">{{ category }}</a>
    </div>
    <div class="card-grid">
      <router-link v-for="article in getFilteredArticles()" :to="'/article/' + article.link" class="card">
        <img :src="article.image" alt="">
        <h3>{{ article.title }}</h3>
        <p>{{ article.category }} · {{ article.date }}</p>
      </router-link>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import 'static/scss/base.scss';

.category-chooser {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  a {
    padding: 10px 20px;
    border-radius: 5px;
    background: var(--surface-background-color);
    @include main-border;
    cursor: pointer;
    &.active {
      background: var(--main-cta-color);
      color: white;
    }
  }
}
</style>