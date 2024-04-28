<script setup lang="ts">
const props = defineProps(['label', 'href'])
</script>

<template>
  <a class="btn" :href="props.href">{{props.label}}</a>
</template>

<style scoped lang="scss">
@import 'static/scss/fonts.scss';

a {
  background: var(--main-cta-color);
  color: #FFF;
  padding: 15px 20px;
  @include title-font;
  cursor: pointer;
  font-weight: 800;
  font-size: 18px;
  border-radius: 3px;
  transition: 0.2s ease-in-out;
}

a:hover {
  background: var(--darker-cta-color);
  transform: scale(1.01);
}
</style>