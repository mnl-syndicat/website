<script setup lang="ts">

</script>

<template>
  <section>
    <div class="titleBar">
      <h1>DERNIERS ARTICLES</h1>
      <btn label="VOIR TOUT" href="/articles"></btn>
    </div>
    <div class="articles">
      <article v-for="article in getArticles().slice(0, 5)" :key="article.link">
        <router-link class="card" :to="'/article/' + article.link">
          <NuxtImg height="300" :src="article.image" alt="" />
          <h3>{{ article.title }}</h3>
        </router-link>
      </article>
    </div>
  </section>
</template>

<style scoped lang="scss">
section {
  flex-direction: column;
  gap: 30px;

  .titleBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .articles {
    display: flex;
    overflow-x: auto;
    width: 100vw;
    padding: 5px 30px 5px 15vw;
    gap: 40px;

    article a {
      height: min-content;
      width: 350px;

      &:hover {
        transform: scale(1.01);
      }

      p {
        align-self: start;
      }

      img {
        height: 200px;
        width: 100%;
        object-fit: cover;
        border-radius: 3px;
      }

      h3 {
        font-size: 25px;
        font-weight: 800;
      }
    }
  }
}

@media (max-width: 768px) {
  section {
    padding: 30px 5vw;
    gap: 15px !important;
  }

  .titleBar {
    flex-direction: column;
    align-items: start !important;
    margin-bottom: 0 !important;
  }

  .articles {
    width: 100vw !important;
    gap: 20px !important;
    padding: 5vw 5vw !important;
    margin-left: -5vw;

    article a {
      width: 70vw !important;
      padding: 15px;
      gap: 10px;

      img {
        height: 150px;
      }

      h3 {
        font-size: 20px;
      }
    }
  }
}
</style>