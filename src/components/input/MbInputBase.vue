<script setup>
// Macros
defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  label: {
    type: [String, Boolean],
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  errorMsg: {
    type: [String, Boolean],
    default: false
  }
})
</script>

<template>
  <div class="mb-input-wrap">
    <label v-if="label" class="mb-text-small mb-font-bold mb-mb-1">{{ label }}</label>
    <input
      v-bind="$attrs"
      :type="type"
      :style="{ border: errorMsg ? '2px solid red' : '' }"
      :value="modelValue"
      :disabled="disabled"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <span v-show="errorMsg" class="mb-input-error mb-text-xs mb-mt-1">{{ errorMsg }}</span>
  </div>
</template>

<style scoped>
.mb-input-wrap {
  display: flex;
  flex-direction: column;
  margin: 20px;
}
.mb-input-wrap input {
  padding: 10px 12px;
  font-size: var(--mb-font-size-large);
  border: 1.5px solid var(--mb-black-mute);
  border-radius: 5px;
  transition: 0.3s;
  outline: none;
  color: var(--mb-black-mute);
}
.mb-input-wrap input:focus {
  border: 1.5px solid var(--mb-orange);
}
.mb-input-error {
  color: red;
}
</style>
