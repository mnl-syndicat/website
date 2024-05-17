<script setup lang="ts">
useHead({
  title: 'MNL — Adhérer',
  meta: [
    {name: 'description', content: 'Adhérer au Mouvement National Lycéen'},
    {name: 'og:title', content: 'Mouvement National Lycéen — Adhérer'},
    {name: 'og:description', content: 'Adhérer au Mouvement National Lycéen'},
  ],
})
</script>

<template>
  <top-bar />
  <section id="adherer">
    <h1>ADHÉRER</h1>
    <iframe :src="getString('adhererLink')"></iframe>
  </section>
</template>

<style scoped lang="scss">
@import 'static/scss/base.scss';

section#adherer {
  width: 100vw;
  display: flex;
  padding: 50px 15vw;
  flex-direction: column;
  gap: 50px;

  iframe {
    width: 50vw;
    height: 100vh;
    @include main-border;
    @include main-border-radius;
    padding: 20px;
    background: var(--surface-background-color);
  }
}

@media (max-width: 768px) {
  section#adherer {
    padding: 30px 5vw;

    iframe {
      width: 90vw;
    }
  }
}
</style>