<script setup>
// Imports
import { reactive, ref } from 'vue'

import MbLoginFormActions from './MbLoginFormActions.vue'
import MbInputBase from '@/components/input/MbInputBase.vue'

// Data
const formData = reactive({
  email: {
    value: '',
    error: false
  },
  password: {
    value: '',
    error: false
  }
})
let isValid = ref(true)

// Methods
const doLogin = () => {
  isValid.value = validateForm()
  if (isValid.value) {
    const payload = {
      email: formData.email.value,
      password: formData.password.value
    }
    console.log('Do Login', payload)
  }
}
const validateForm = () => {
  // email required
  let hasErrors = false
  if (!formData.email.value) {
    formData.email.error = 'Preencha o seu email'
    hasErrors = true
  }
  // valid email
  if (
    formData.email.value &&
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email.value)
  ) {
    formData.email.error = 'Email inválido'
    hasErrors = true
  }
  // password required
  if (!formData.password.value) {
    formData.password.error = 'Preencha sua senha'
    hasErrors = true
  }

  return hasErrors ? false : true
}
const resetErrorField = (field) => {
  if (formData[field].error) formData[field].error = false
  if (!formData.email.error && !formData.password.error) isValid.value = true
}
</script>

<template>
  <div class="mb-form-container mb-mt-3">
    <h2 class="mb-my-3 mb-font-medium">Login. Acesse sua conta.</h2>
    <form>
      <mb-input-base
        v-model="formData.email.value"
        :errorMsg="formData.email.error"
        name="email"
        type="email"
        class="mb-mx-0"
        label="Entre com seu email?"
        @input="resetErrorField('email')"
      />
      <mb-input-base
        v-model="formData.password.value"
        :errorMsg="formData.password.error"
        name="password"
        type="password"
        class="mb-mx-0"
        label="Password"
        @input="resetErrorField('password')"
      />
      <p class="mb-my-3 mb-text-caption">
        Ao continuar você aceita os <a href="#">Termos de uso</a> e a
        <a href="#">Política de Privacidade</a> do Mercado Bitcoin e declara não ser uma
        <a href="#">pessoa dos Estados Unidos</a>.
      </p>
    </form>
    <mb-login-form-actions :isValid="isValid" @doLogin="doLogin" />
  </div>
</template>

<style scoped>
.mb-form-container {
  max-width: 320px;
  margin-left: auto;
  margin-right: auto;
}
</style>
