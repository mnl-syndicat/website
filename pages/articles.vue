<template>
  <top-bar/>

  <section>
    <h2>ARTICLES</h2>
    <div class="card-grid">
      <router-link v-for="article in getArticles()" :to="'/article/' + article.link" class="card">
        <img :src="article.image" alt="">
        <h3>{{ article.title }}</h3>
        <p>{{ article.date }}</p>
      </router-link>
    </div>
  </section>
</template>