<script setup>
// Imports
import { ref, reactive, watch, toRefs, computed } from 'vue'
import { useUserStore } from '@/stores/user'
import useValidationLib from '@/composables/ValidationLib'
import { vMaska } from 'maska'

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
const { validateCPF, validateCNPJ } = useValidationLib()

// Data
const formValid = ref(true)
const formData = reactive({
  personalData: {
    name: { value: '', error: false },
    document: { value: '', error: false },
    birthDay: { value: '', error: false },
    phone: { value: '', error: false }
  },
  companyData: {
    companyName: { value: '', error: false },
    document: { value: '', error: false },
    oppeningDate: { value: '', error: false },
    phone: { value: '', error: false }
  }
})

// computed
const registrationType = computed(() => {
  return userStore.getUser.type
})

// watchers
watch(validate, (val) => {
  if (val) next()
})

// Methods
const next = () => {
  formValid.value = validateForm()
  if (formValid.value) {
    let payload
    if (registrationType.value === 'PF') {
      payload = {
        personalData: {
          name: formData.personalData.name.value,
          document: formData.personalData.document.value,
          birthDay: formData.personalData.birthDay.value,
          phone: formData.personalData.phone.value
        }
      }
    } else {
      payload = {
        companyData: {
          companyName: formData.companyData.companyName.value,
          document: formData.companyData.document.value,
          oppeningDate: formData.companyData.oppeningDate.value,
          phone: formData.companyData.phone.value
        }
      }
    }
    // console.log('Next - step2', payload)
    userStore.updateUserFields(payload)
    emit('resetValidation')
    emit('next')
  }
}
const validateForm = () => {
  let hasErrors = false
  // PF name required
  if (registrationType.value === 'PF' && !formData.personalData.name.value) {
    formData.personalData.name.error = 'Preencha seu nome'
    hasErrors = true
  }
  // PF CPF required
  if (registrationType.value === 'PF' && !formData.personalData.document.value) {
    formData.personalData.document.error = 'Preencha seu CPF'
    hasErrors = true
  }
  // PF CPF valid
  const cpfValid = validateCPF(formData.personalData.document.value)
  if (registrationType.value === 'PF' && !cpfValid) {
    formData.personalData.document.error = 'CPF inválido'
    hasErrors = true
  }
  // PF Birth Day required
  if (registrationType.value === 'PF' && !formData.personalData.birthDay.value) {
    formData.personalData.birthDay.error = 'Preencha sua data de nascimento'
    hasErrors = true
  }
  // PF Birth Day valid
  const regexPFDate = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/
  if (registrationType.value === 'PF' && !regexPFDate.test(formData.personalData.birthDay.value)) {
    formData.personalData.birthDay.error = 'Data inválida. Formato: DD/MM/AAAA'
    hasErrors = true
  }
  // PF phone required
  if (registrationType.value === 'PF' && !formData.personalData.phone.value) {
    formData.personalData.phone.error = 'Preencha seu telefone'
    hasErrors = true
  }
  // PJ company name required
  if (registrationType.value === 'PJ' && !formData.companyData.companyName.value) {
    formData.companyData.companyName.error = 'Preencha a Razão Social'
    hasErrors = true
  }
  // PJ CNPJ required
  if (registrationType.value === 'PJ' && !formData.companyData.document.value) {
    formData.companyData.document.error = 'Preencha o CNPJ'
    hasErrors = true
  }
  // PJ CNPJ valid
  const cnpjValid = validateCNPJ(formData.companyData.document.value)
  if (registrationType.value === 'PJ' && !cnpjValid) {
    formData.companyData.document.error = 'CNPJ inválido'
    hasErrors = true
  }
  // PJ Oppening Date required
  if (registrationType.value === 'PJ' && !formData.companyData.oppeningDate.value) {
    formData.companyData.oppeningDate.error = 'Preencha a data de abertura'
    hasErrors = true
  }
  // PJ Oppening date valid
  const regexPJDate = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/
  if (
    registrationType.value === 'PJ' &&
    !regexPJDate.test(formData.companyData.oppeningDate.value)
  ) {
    formData.companyData.oppeningDate.error = 'Data inválida. Formato: DD/MM/AAAA'
    hasErrors = true
  }
  // PJ Phone required
  if (registrationType.value === 'PJ' && !formData.companyData.phone.value) {
    formData.companyData.phone.error = 'Preencha o telefone'
    hasErrors = true
  }

  return hasErrors ? false : true
}
const resetErrorField = (field) => {
  const regTypeKey = registrationType.value === 'PF' ? 'personalData' : 'companyData'
  if (formData[regTypeKey][field].error) formData[regTypeKey][field].error = false
  if (
    registrationType.value === 'PF' &&
    !formData.personalData.name.error &&
    !formData.personalData.document.error &&
    !formData.personalData.birthDay.error &&
    !formData.personalData.phone.error
  ) {
    formValid.value = true
    emit('resetValidation')
  }
  if (
    registrationType.value === 'PJ' &&
    !formData.companyData.companyName.error &&
    !formData.companyData.document.error &&
    !formData.companyData.oppeningDate.error &&
    !formData.companyData.phone.error
  ) {
    formValid.value = true
    emit('resetValidation')
  }
}
</script>

<template>
  <div class="mb-registration-steps">
    <div class="mb-mt-3 mb-text-small">
      <span class="mb-font-bold">
        Etapa <span class="mb-font-black" id="orange-step">{{ props.step }}</span> de 4
      </span>
    </div>
    <h2 class="mb-mb-3 mb-font-bold">
      {{ registrationType === 'PF' ? props.title : 'Pessoa Jurídica' }}
    </h2>
    <form v-if="registrationType === 'PF'">
      <div>
        <mb-input-base
          v-model="formData.personalData.name.value"
          :errorMsg="formData.personalData.name.error"
          name="name"
          type="text"
          class="mb-mx-0"
          label="Nome"
          @input="resetErrorField('name')"
        />
      </div>
      <div class="mb-mb-2">
        <mb-input-base
          v-model="formData.personalData.document.value"
          :errorMsg="formData.personalData.document.error"
          name="cpf"
          type="text"
          class="mb-mx-0"
          label="CPF"
          v-maska
          data-maska="###.###.###-##"
          @input="resetErrorField('document')"
        />
      </div>
      <div class="mb-mb-2">
        <mb-input-base
          v-model="formData.personalData.birthDay.value"
          :errorMsg="formData.personalData.birthDay.error"
          name="birthDay"
          type="text"
          class="mb-mx-0"
          label="Data de nascimento"
          v-maska
          data-maska="##/##/####"
          @input="resetErrorField('birthDay')"
        />
      </div>
      <div class="mb-mb-2">
        <mb-input-base
          v-model="formData.personalData.phone.value"
          :errorMsg="formData.personalData.phone.error"
          name="phone"
          type="text"
          class="mb-mx-0"
          label="Telefone"
          v-maska
          data-maska="(##) # ####-####"
          @input="resetErrorField('phone')"
        />
      </div>
    </form>
    <form v-else>
      <div>
        <mb-input-base
          v-model="formData.companyData.companyName.value"
          :errorMsg="formData.companyData.companyName.error"
          name="companyName"
          type="text"
          class="mb-mx-0"
          label="Razão Social"
          @input="resetErrorField('companyName')"
        />
      </div>
      <div class="mb-mb-2">
        <mb-input-base
          v-model="formData.companyData.document.value"
          :errorMsg="formData.companyData.document.error"
          name="cnpj"
          type="text"
          class="mb-mx-0"
          label="CNPJ"
          v-maska
          data-maska="##.###.###/####-##"
          @input="resetErrorField('document')"
        />
      </div>
      <div class="mb-mb-2">
        <mb-input-base
          v-model="formData.companyData.oppeningDate.value"
          :errorMsg="formData.companyData.oppeningDate.error"
          name="oppeningDate"
          type="text"
          class="mb-mx-0"
          label="Data de abertura"
          v-maska
          data-maska="##/##/####"
          @input="resetErrorField('oppeningDate')"
        />
      </div>
      <div class="mb-mb-2">
        <mb-input-base
          v-model="formData.companyData.phone.value"
          :errorMsg="formData.companyData.phone.error"
          name="phone"
          type="text"
          class="mb-mx-0"
          label="Telefone"
          v-maska
          data-maska="(##) # ####-####"
          @input="resetErrorField('phone')"
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
