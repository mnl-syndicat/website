<template>
  <section class="about">
    <img :src="getImage('historyCategoryImage')" alt="">
    <div class="container">
      <h2>{{ getString('historyCategoryName') }}</h2>
      <p>{{ getString('historyValue') }}</p>
    </div>
  </section>
</template>