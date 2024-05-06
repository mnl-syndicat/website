<script setup>
useHead({
  title: 'Mouvement National Lycéen',
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'theme-color', content: '#5A3C5A' },
    { name: 'description', content: 'Premier syndicat lycéen écologiste, antiraciste, antifasciste et révolutionnaire !' },
    { name: 'og:title', content: 'Mouvement National Lycéen' },
    { name: 'og:description', content: 'Premier syndicat lycéen écologiste, antiraciste, antifasciste et révolutionnaire !' },
    { name: 'og:image', content: getImage('orgIllusImage') },
    { name: 'twitter:card', content: getImage('orgIllusImage') },
    { name: 'twitter:image', content: getImage('orgIllusImage') },
    { name: 'twitter:site', content: '@mnl_national' },
    { name: 'twitter:creator', content: '@mnl_national' },
    { name: 'twitter:title', content: 'Mouvement National Lycéen' },
    { name: 'twitter:description', content: 'Premier syndicat lycéen écologiste, antiraciste, antifasciste et révolutionnaire !' },
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: getImage('orgLogo') },
    { rel: 'apple-touch-icon', href: getImage('orgLogo') },
  ],
  htmlAttrs: {
    lang: 'fr',
  },
})
</script>

<template>
  <top-bar />
  <NuxtPage/>
  <foot />
</template>

<style scoped lang="scss">

</style>