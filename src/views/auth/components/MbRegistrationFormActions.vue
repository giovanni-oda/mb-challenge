<script setup>
// Imports
import { useRouter } from 'vue-router'

import MbButtomBase from '@/components/buttom/MbButtomBase.vue'
import MbButtomOutlined from '@/components/buttom/MbButtomOutlined.vue'
import MbButtomText from '@/components/buttom/MbButtomText.vue'

// Macros
defineProps({
  step: {
    type: Number,
    default: 1
  },
  disabled: {
    type: Boolean,
    defalt: false
  }
})
defineEmits(['prevClick', 'nextClick', 'doneClick'])

// consts
const router = useRouter()
</script>

<template>
  <div class="mb-form-actions">
    <div class="mb-btn-steps">
      <mb-buttom-outlined
        v-if="step > 1"
        class="mb-ml-0 mb-w-75"
        :class="{ 'mb-mr-2': step > 1 }"
        @click="$emit('prevClick')"
      />
      <mb-buttom-base
        class="mb-mx-0 mb-w-100"
        :class="{ 'mb-ml-2': step > 1 }"
        :disabled="disabled"
        @click="$emit('nextClick')"
      >
        {{ step < 4 ? 'Continuar' : 'Cadastrar' }}
      </mb-buttom-base>
    </div>
    <mb-buttom-text
      v-if="step === 1"
      class="m-mx-0"
      @click="router.push({ name: 'Login' })"
      :disabled="false"
    >
      Já tem conta? Acesse sua conta
    </mb-buttom-text>
  </div>
</template>

<style scoped>
.mb-form-actions {
  display: flex;
  flex-direction: column;
}
.mb-btn-steps {
  display: flex;
}
</style>
