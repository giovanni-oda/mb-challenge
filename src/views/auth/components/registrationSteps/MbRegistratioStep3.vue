<script setup>
// Imports
import { ref, reactive, watch, toRefs } from 'vue'
import { useUserStore } from '@/stores/user'

import MbInputBase from '@/components/input/MbInputBase.vue'

// Macros
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  step: {
    type: Number,
    default: 1
  },
  validate: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['resetValidation', 'next'])

// consts
const { validate } = toRefs(props)
const userStore = useUserStore()

// Data
const formValid = ref(true)
const formData = reactive({
  password: { value: '', error: false },
  confirm: { value: '', error: false }
})

// watchers
watch(validate, (val) => {
  if (val) next()
})

// Methods
const next = () => {
  formValid.value = validateForm()
  if (formValid.value) {
    const payload = {
      password: formData.password.value
    }
    // console.log('Next - step3', payload)
    userStore.updateUserFields(payload)
    emit('resetValidation')
    emit('next')
  }
}
const validateForm = () => {
  let hasErrors = false
  // password required
  if (!formData.password.value) {
    formData.password.error = 'Preencha uma senha'
    hasErrors = true
  }
  // password min 8 chars and begin with a letter
  if (formData.password.value && !/^[a-zA-Z].{7,}$/.test(formData.password.value)) {
    formData.password.error = 'Senha inválida. Mín. 8 caracters, sendo o primeira uma letra.'
    hasErrors = true
  }
  // password and confirmation must match
  if (formData.password.value !== formData.confirm.value) {
    formData.password.error = 'As senhas não concidem'
    formData.confirm.error = 'As senhas não concidem'
    hasErrors = true
  }

  return hasErrors ? false : true
}
const resetErrorField = (field) => {
  if (formData[field].error) formData[field].error = false
  if (!formData.password.error && !formData.confirm.error) {
    formValid.value = true
    emit('resetValidation')
  }
}
</script>

<template>
  <div class="mb-registration-step">
    <div class="mb-mt-3 mb-text-small">
      <span class="mb-font-bold">
        Etapa <span class="mb-font-black" id="orange-step">{{ props.step }}</span> de 4
      </span>
    </div>
    <h2 class="mb-mb-3 mb-font-bold">{{ props.title }}</h2>
    <form>
      <div>
        <mb-input-base
          v-model="formData.password.value"
          :errorMsg="formData.password.error"
          name="password"
          type="password"
          class="mb-mx-0"
          label="Sua senha"
          @input="resetErrorField('password')"
        />
      </div>
      <div class="mb-mb-2">
        <mb-input-base
          v-model="formData.confirm.value"
          :errorMsg="formData.confirm.error"
          name="confirm"
          type="password"
          class="mb-mx-0"
          label="Confirme sua senha"
          @input="resetErrorField('confirm')"
        />
      </div>
    </form>
  </div>
</template>

<style scoped>
#orange-step {
  color: var(--mb-orange) !important;
}
</style>
