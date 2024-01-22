<script setup>
// Imports
import { useRouter } from 'vue-router'

import MbButtomBase from '@/components/buttom/MbButtomBase.vue'
import MbButtomText from '@/components/buttom/MbButtomText.vue'

// Macros
defineProps({
  isValid: {
    type: Boolean,
    default: true
  }
})

// consts
const router = useRouter()
const emit = defineEmits(['do-login'])
</script>

<template>
  <div class="mb-form-actions">
    <mb-buttom-base class="mb-mx-0" @click="emit('do-login')" :disabled="!isValid">
      Entrar
    </mb-buttom-base>
    <mb-buttom-text
      class="mb-mx-0"
      @click="router.push({ name: 'RegistrationPage' })"
      :disabled="false"
    >
      Ainda não tem conta? Cadastre-se.
    </mb-buttom-text>
  </div>
</template>

<style scoped>
.mb-form-actions {
  display: flex;
  flex-direction: column;
}
</style>
