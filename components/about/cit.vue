<template>
  <section class="about">
    <img :src="getImage('citCategoryImage')" alt="">
    <div class="container">
      <h1>{{ getString('citCategoryName') }}</h1>
      <p>{{ getString('citValue') }}</p>
    </div>
  </section>
</template>