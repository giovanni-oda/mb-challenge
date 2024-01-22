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
  <mb-buttom-base
    class="mb-btn-outlined"
    :style="{ color: color ? color : '', border: color ? `1px solid ${color}` : '' }"
  >
    <span class="mb-btn-outlined-text">
      <slot>Voltar</slot>
    </span>
  </mb-buttom-base>
</template>

<style scoped>
.mb-btn-outlined {
  background-color: var(--color-background);
  color: var(--mb-orange);
  border: 1px solid var(--mb-orange);
}
.mb-btn-outlined-text {
  font-weight: var(--mb-text-bold);
}
.mb-btn-outlined.mb-btn-disabled {
  color: var(--mb-black-mute);
  border: 1px solid var(--mb-black-mute);
}

@media (hover: hover) {
  .mb-btn-outlined:hover {
    background-color: rgba(239, 71, 35, 0.1);
  }
}
</style>
