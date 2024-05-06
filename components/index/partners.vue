<template>
  <section>
    <h1>PARTENAIRES</h1>
    <div class="icon-list">
      <a :href="partner.link" class="icon-list-el" v-for="partner in getPartners()">
        <NuxtImg quality="10" :src="partner.icon" alt="" />
        <p>{{ partner.name }}</p>
      </a>
    </div>
  </section>
</template>

<style scoped lang="scss">
.icon-list-el img {
  width: 70px;
  height: 70px;
}
</style>