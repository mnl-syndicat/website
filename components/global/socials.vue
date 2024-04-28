<template>
  <section>
    <h2>NOS RÉSEAUX</h2>
    <div class="icon-list">
      <a :href="social.link" class="icon-list-el" v-for="social in getSocials()">
        <img :src="social.icon" alt="">
        <p>{{ social.name }}</p>
      </a>
    </div>
  </section>
</template>