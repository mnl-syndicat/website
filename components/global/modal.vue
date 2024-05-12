<script setup lang="ts">
const props = defineProps<{
  type: 'error' | 'information',
  message: string
}>()

const icon = computed(() => {
  switch (props.type) {
    case 'error':
      return 'ph:warning-bold'
    case 'information':
      return 'ph:info-bold'
  }
})
</script>

<template>
  <div class="popup" :class="props.type">
    <h2>
      <Icon :name="icon"/>
      {{ props.type }}
    </h2>
    <p>{{ props.message }}</p>
    <btn class="close" @click="$emit('close')" icon="ph:x-bold" weight="secondary" label="Close" />
  </div>
</template>

<style scoped lang="scss">
.popup {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 30px;
  border-radius: 3px;
  font-weight: 500;
  z-index: 100;
  box-shadow: 0 0 0 1000px rgba(0, 0, 0, 0.6);
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  background: var(--surface-background-color);

  h2 {
    text-transform: capitalize;
    text-align: center;
    font-size: 32px;
  }

  .btn {
    width: 100%;
    font-size: 20px;

    &.icon {
      font-size: 20px;
    }
  }
}
</style>