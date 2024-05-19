<script setup lang="ts">
useHead({
  title: 'À Propos — MNL',
  meta: [
    {name: 'description', content: 'En savoir plus sur le Mouvement National Lycéen'},
    {name: 'og:title', content: 'À propos — Mouvement National Lycéen'},
    {name: 'og:description', content: 'En savoir plus sur le Mouvement National Lycéen'},
  ],
})
</script>

<template>
  <top-bar current-tab="/about" />
  <about-where/>
  <about-missions/>
  <about-equipe-nationale/>
  <about-interne/>
  <about-history/>
  <socials/>

</template>

<style lang="scss">
section.about {
  flex-direction: row;

  img {
    width: 25vw;
    border: 1px solid #000;
    object-fit: cover;
    border-radius: 3px;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 20px;

    p {
      font-size: 20px;
    }
  }
}

@media (max-width: 768px) {
  section.about img {
    display: none;
  }

  .container {
    gap: 10px;
  }
}
</style>