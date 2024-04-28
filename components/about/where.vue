<template>
  <section class="about">
    <div class="container">
      <h2>{{ getString('whereCategoryName') }}</h2>
      <p>{{ getString('whereValue') }}</p>
      <btn href="/contact" :label="getString('whereButton')"/>
    </div>
    <img :src="getImage('valuesIllus')" alt="">
  </section>
</template>