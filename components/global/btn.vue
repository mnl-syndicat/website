<script setup lang="ts">
const props = defineProps(['label', 'href', 'icon'])
</script>

<template>
  <a class="btn" :href="props.href"><Icon v-if="icon" :name="icon" /> {{props.label}}</a>
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
  transition: 0.1s ease-in-out;
  display: flex;
  align-items: center;
  gap: 7.5px;

  .icon {
    width: 24px;
    height: 24px;
  }
}

a:hover {
  background: var(--darker-cta-color);
  transform: scale(1.01);
}
</style>