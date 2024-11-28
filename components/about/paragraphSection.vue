<template>
  <section class="about">
    <div class="container">
      <h1>{{ title }}</h1>
      <p>{{ paragraph }}</p>
      <btn v-if="buttonUrl && buttonLabel" :href="buttonUrl" :label="buttonLabel" :icon="buttonIcon" />
    </div>
    <img v-if="imageUrl" :src="imageUrl" alt="" :style="{ order: imageLocation === 'left' ? -1 : 1 }" />
  </section>
</template>

<script setup lang="ts">
defineProps({
  title: String,
  paragraph: String,
  imageUrl: String,
  imageLocation: {
    type: String,
    default: 'right',
  },
  buttonLabel: String,
  buttonUrl: String,
  buttonIcon: String,
})
</script>