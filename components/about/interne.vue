<template>
  <section class="about">
    <div class="container">
      <h1>{{ getString('interneCategoryName') }}</h1>
      <p>{{ getString('interneValue') }}</p>
      <btn :href="getString('statusFileUrl')" :label="getString('statusButtonLabel')" icon="ph:download-bold" />
    </div>
    <img :src="getImage('interneCategoryImage')" alt="">
  </section>
</template>
<script setup lang="ts">
</script>