<template>
  <section class="about">
    <div class="container">
      <h2>{{ getString('missionsCategoryName') }}</h2>
      <div class="mission" v-for="mission in getMissions()">
        <h3>{{ mission.title }}</h3>
        <p>{{ mission.description }}</p>
      </div>
    </div>
  </section>
</template>