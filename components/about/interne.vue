<template>
  <section class="about">
    <div class="container">
      <h1>{{ getString('interneCategoryName') }}</h1>
      <p>{{ getString('interneValue') }}</p>
    </div>
    <img :src="getImage('interneCategoryImage')" alt="">
  </section>
</template>
