<template>
  <section class="icon-list">
    <div class="icon-list-el" v-for="stat in getStatistics()">
      <img :src="stat.icon" alt="">
      <h2>{{ stat.value }}</h2>
      <p>{{ stat.title }}</p>
    </div>
  </section>
</template>