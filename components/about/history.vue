<template>
  <section class="about">
    <img :src="getImage('historyCategoryImage')" alt="">
    <div class="container">
      <h1>{{ getString('historyCategoryName') }}</h1>
      <p>{{ getString('historyValue') }}</p>
    </div>
  </section>
</template>