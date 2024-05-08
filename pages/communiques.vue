<script setup lang="ts">

</script>

<template>
  <top-bar current-tab="/communiques"/>
  <section class="communiques">
    <h1>COMMUNIQUÉS</h1>
    <div class="card-grid">
      <router-link v-for="communique in getCommuniques()" :to="'/communique/' + communique.link" class="card">
        <img :src="communique.image" alt="">
        <h3>{{ communique.title }}</h3>
        <p>{{ communique.date }}</p>
      </router-link>
    </div>
  </section>
</template>

<style scoped lang="scss">

</style>