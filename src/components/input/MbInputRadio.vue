<script setup>
// imports
import { ref } from 'vue'

// Macros
defineProps({
  items: {
    required: true,
    type: Array,
    default: () => []
  },
  errorMsg: {
    type: [String, Boolean],
    default: false
  }
})

// Data
const selectedType = ref('')
</script>

<template>
  <div class="mb-input-radio">
    <div v-for="(item, index) in items" :key="index" class="mb-radio-group">
      <input
        v-bind="$attrs"
        v-model="selectedType"
        :id="`item${index}`"
        :value="item.value"
        type="radio"
        name="registrationType"
        @change="$emit('input', selectedType)"
      />
      <label class="mb-text-regular mb-font-bold" for="`item${index}`"> {{ item.label }} </label>
    </div>
  </div>
  <span v-show="errorMsg" class="mb-input-error mb-text-xs">{{ errorMsg }}</span>
</template>

<style scoped>
.mb-input-radio {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.mb-radio-group {
  display: flex;
  align-items: center;
  margin: 10px 10px 0 10px;
}
.mb-radio-group label {
  margin-left: 10px;
}
input[type='radio'] {
  accent-color: var(--mb-orange);
}
.mb-input-error {
  color: red;
}
</style>
