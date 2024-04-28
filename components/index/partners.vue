<template>
  <section>
    <h2>PARTENAIRES</h2>
    <div class="icon-list">
      <a :href="partner.link" class="icon-list-el" v-for="partner in getPartners()">
        <img :src="partner.icon" alt="">
        <p>{{ partner.name }}</p>
      </a>
    </div>
  </section>
</template>

<style scoped lang="scss">
.icon-list-el img {
  transform: scale(1.3);
}
</style>