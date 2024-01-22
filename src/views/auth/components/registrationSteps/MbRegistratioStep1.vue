<script setup>
// Imports
import { ref, reactive, watch, toRefs } from 'vue'
import { useUserStore } from '@/stores/user'

import MbInputBase from '@/components/input/MbInputBase.vue'
import MbInputRadio from '@/components/input/MbInputRadio.vue'

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
const typeOptions = [
  { label: 'Pessoa física', value: 'PF' },
  { label: 'Pessoa jurídica', value: 'PJ' }
]
const formData = reactive({
  email: { value: '', error: false },
  type: { value: '', error: false }
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
      email: formData.email.value,
      type: formData.type.value
    }
    // console.log('Next - step1', payload)
    userStore.updateUserFields(payload)
    emit('resetValidation')
    emit('next')
  }
}
const validateForm = () => {
  let hasErrors = false
  // email required
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
  // registrtion type required
  if (!formData.type.value) {
    formData.type.error = 'Selecione uma opção'
    hasErrors = true
  }
  return hasErrors ? false : true
}
const resetErrorField = (field) => {
  if (formData[field].error) formData[field].error = false
  if (!formData.email.error && !formData.type.error) {
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
          v-model="formData.email.value"
          :errorMsg="formData.email.error"
          name="email"
          type="email"
          class="mb-mx-0"
          label="Endereço de e-mail?"
          @input="resetErrorField('email')"
        />
      </div>
      <div class="mb-mb-2">
        <mb-input-radio
          v-model="formData.type.value"
          :items="typeOptions"
          :errorMsg="formData.type.error"
          name="registration-type"
          type="radio"
          class="mb-mx-0 mb-mb-1"
          @input="resetErrorField('type')"
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
