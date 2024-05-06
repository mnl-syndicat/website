<template>
  <section>
    <h1>NOS RÉSEAUX</h1>
    <div class="icon-list">
      <a :href="social.link" class="icon-list-el" v-for="social in getSocials()">
        <NuxtImg quality="10" :src="social.icon" alt="" />
        <p>{{ social.name }}</p>
      </a>
    </div>
  </section>
</template>