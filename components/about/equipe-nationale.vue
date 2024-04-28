<template>
  <section class="about">
    <img :src="getImage('enCategoryImage')" alt="">
    <div class="container">
      <h2>{{ getString('enCategoryName') }}</h2>
      <p>{{ getString('enValue') }}</p>
      <btn to="/contact" :label="getString('enButton')"/>
    </div>
  </section>
</template>