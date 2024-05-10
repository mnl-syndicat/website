<template>
  <section class="icon-list">
    <div class="icon-list-el" v-for="stat in getStatistics()">
      <Icon :name="stat.icon" />
      <h1>{{ stat.value }}</h1>
      <p>{{ stat.title }}</p>
    </div>
  </section>
</template>