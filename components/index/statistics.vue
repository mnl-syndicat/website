<script setup lang="ts">
const statistics = ref([
  { icon: 'ph:users-bold', value: 0, title: 'Membres', live: false },
]);

statistics.value = await getStatistics()
</script>

<template>
  <section >
    <div class="icon-list">
      <div class="icon-list-el" v-for="stat in statistics">
        <Icon :name="stat.icon" />
        <h1>{{ stat.value }} <Icon v-if="stat.live" name="ph:broadcast-bold" /></h1>
        <p>{{ stat.title }}</p>
      </div>
    </div>

    <p>
      Les statistiques avec l'icône <Icon name="ph:broadcast-bold" /> sont en temps réel.
    </p>
  </section>
</template>

<style scoped>
@keyframes colorize {
  0% {
    color: var(--lighter-cta-color);
  }
  50% {
    color: var(--darker-cta-color);
  }
  100% {
    color: var(--lighter-cta-color);
  }
}

section{
  flex-direction: column;

  h1:has(.icon) {
    display: flex;
    align-items: start;
    padding-left: 24px;
    .icon {
      font-size: 24px;
      transition: 1s ease-in-out;
      animation: colorize 1s ease-in-out infinite;
    }
  }

  p .icon {
    transition: 1s ease-in-out;
    animation: colorize 1s ease-in-out infinite;
  }
}
</style>