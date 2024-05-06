<template>
  <section class="materiel">
    <h1>MATÉRIEL MILITANT</h1>

    <div class="card-grid">
      <div class="card" v-for="materiel of getMateriel()">
        <a :href="materiel.file">
          <img :src="materiel.image" alt="">
          <h3>{{ materiel.title }}</h3>
        </a>
      </div>
    </div>
  </section>
</template>