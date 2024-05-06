<template>
  <section class="about">
    <div class="container">
      <h1>{{ getString('missionsCategoryName') }}</h1>
      <div class="mission" v-for="mission in getMissions()">
        <h3>{{ mission.title }}</h3>
        <p>{{ mission.description }}</p>
      </div>
    </div>
  </section>
</template>