<script setup lang="ts">
const props = defineProps({
  label: String,
  icon: String,
  weight: {
    type: String,
    default: 'primary'
  },
  href: String
})
</script>

<template>
  <NuxtLink :class="'btn ' + weight" :to="props.href"><Icon v-if="icon" :name="icon" /> {{props.label}}</NuxtLink>
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

  &:hover {
    background: var(--darker-cta-color);
  }
}

a.secondary {
  background: var(--surface-background-color);
  color: var(--main-cta-color);
  border: 2px solid var(--main-cta-color);

  &:hover {
    background: var(--main-cta-color);
    color: #FFF;
  }
}
</style>