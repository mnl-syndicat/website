<template>
  <section class="about">
    <div class="container">
      <h1>{{ getString('whereCategoryName') }}</h1>
      <p>{{ getString('whereValue') }}</p>
      <btn href="/federations" :label="getString('whereButton')"/>
    </div>
    <img :src="getImage('valuesIllus')" alt="">
  </section>
</template>