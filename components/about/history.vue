<template>
  <section class="about">
    <div class="container">
      <h1>{{ getString('historyCategoryName') }}</h1>
      <p>{{ getString('historyValue') }}</p>
    </div>
    <img :src="getImage('historyCategoryImage')" alt="">
  </section>
</template>