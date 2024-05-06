<template>
  <section class="about">
    <img :src="getImage('enCategoryImage')" alt="">
    <div class="container">
      <h1>{{ getString('enCategoryName') }}</h1>
      <p>{{ getString('enValue') }}</p>
    </div>
  </section>
</template>