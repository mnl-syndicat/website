<script setup>
const config = useRuntimeConfig();
</script>

<template>
  <section>
    <p>
      <Icon name="mdi:world"/> Site web réalisé par les bénévoles du MNL publié sous licence <a href="https://www.gnu.org/licenses/agpl-3.0.en.html">AGPL-3.0</a>.
      <br> <Icon name="mdi:git" /> Source code disponible sur <a href="https://github.com/ebanDev/mnl-website">GitHub</a>, commit actuel
      <a :href="'https://github.com/ebanDev/mnl-website/commit/' + config.public.COMMIT_SHA">{{ config.public.COMMIT_SHA.slice(0, 7) }}</a>.
    </p>
  </section>
</template>

<style scoped lang="scss">
a {
  color: var(--main-cta-color);
  font-weight: 500;
  text-decoration: underline;
}
</style>