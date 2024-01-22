<script setup>
// Imports
import MbButtomBase from '@/components/buttom/MbButtomBase.vue'

// Macros
defineProps({
  color: {
    type: [String, Boolean],
    default: false
  }
})
</script>

<template>
  <mb-buttom-base class="mb-btn-text" :style="{ color: color ? color : '' }">
    <slot />
  </mb-buttom-base>
</template>

<style scoped>
.mb-btn-text {
  background-color: var(--color-background);
  color: var(--mb-orange);
}
.mb-btn-text.mb-btn-disabled {
  color: var(--mb-black-mute);
}

@media (hover: hover) {
  .mb-btn-text:hover {
    background-color: rgba(239, 71, 35, 0.1);
  }
}
</style>
