<script setup>
// Macros
defineProps({
  disabled: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <button class="mb-buttom" :disabled="disabled" :class="{ 'mb-btn-disabled': disabled }">
    <div class="mb-buttom-content">
      <span>
        <slot name="icon" />
      </span>
      <span class="mb-buttom-text">
        <slot>Continuar</slot>
      </span>
    </div>
  </button>
</template>

<style scoped>
.mb-buttom {
  background-color: var(--mb-orange);
  color: var(--mb-white);
  padding: 0.75rem 2rem;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  margin: 0.5rem;
  transition: 0.4s;
}
.mb-buttom-content {
  display: flex;
  justify-content: center;
  align-items: center;
}
.mb-buttom-text {
  font-size: 14px;
  font-weight: var(--mb-text-bold);
}
.mb-btn-disabled {
  background-color: var(--mb-black-mute);
  opacity: 0.45;
  pointer-events: none;
  /* color: var(--mb-black-soft) !important; */
}

@media (hover: hover) {
  .mb-buttom:hover {
    background-color: var(--mb-orange-acent);
  }
}
</style>
