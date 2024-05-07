<script setup>
useHead({
  title: 'MNL — Contact',
  meta: [
    {name: 'description', content: 'Contacter le Mouvement National Lycéen'},
    {name: 'og:title', content: 'Mouvement National Lycéen — Contact'},
    {name: 'og:description', content: 'Contacter le Mouvement National Lycéen'},
  ],
})
</script>

<template>
  <section>
    <h1>CONTACT</h1>
    <p>
      <Icon name="mdi:email" /> Mail : <a :href="'mailto:' + getString('orgEmail')">{{ getString('orgEmail') }}</a> <br>
      <Icon name="mdi:phone" /> Téléphone : <a :href="'tel:' + getString('orgPhone')">{{ getString('orgPhone') }}</a> <br>
      <Icon name="mdi:mail" /> Adresse : {{ getString('orgAddress') }}
    </p>
  </section>
  <socials/>
</template>

<style scoped lang="scss">
section {
  width: 100vw;
  display: flex;
  flex-direction: column;

  p {
    font-size: 25px;
    font-weight: 600;
    line-height: 1.8;

    a {
      color: var(--main-cta-color);
      font-weight: 800;
    }

    svg {
      width: 30px;
      height: 30px;
      margin-right: 10px;
    }
  }
}

@media (max-width: 768px) {
  section {
    p {
      font-size: 20px;

      svg {
        width: 26px;
        height: 26px;
        margin-right: 5px;
      }
    }
  }
}
</style>