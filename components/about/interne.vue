<template>
  <section class="about">
    <div class="container">
      <h2>{{ getString('interneCategoryName') }}</h2>
      <p>{{ getString('interneValue') }}</p>
    </div>
    <img :src="getImage('interneCategoryImage')" alt="">
  </section>
</template>
