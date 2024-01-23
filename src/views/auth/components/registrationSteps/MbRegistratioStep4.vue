<script setup>
// Imports
import { ref, reactive, watch, toRefs, computed, onActivated } from 'vue'
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
const confirmDisabled = ref(true)
const { validateCPF, validateCNPJ } = useValidationLib()

// Hooks
onActivated(() => {
  //console.log('activated')
  initFormData()
  fetchError.value = null
})

// Data
const formValid = ref(true)
const fetchError = ref(null)
const formData = reactive({
  email: { value: '', error: false },
  type: { value: '', error: false },
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
  },
  password: { value: '', error: false },
  confirm: { value: '', error: false }
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
const next = async () => {
  formValid.value = validateForm()
  if (formValid.value) {
    const payload = JSON.parse(JSON.stringify(userStore.getUser))
    // console.log('Next - step4', payload)
    const response = await userStore.createUser(payload)
    if (!response.error) {
      emit('next')
    } else {
      fetchError.value = 'ATENÇÃO! Já existe um usuário cadastrado com esse email.'
    }
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
const resetErrorField = (field, nested = false) => {
  const regTypeKey = registrationType.value === 'PF' ? 'personalData' : 'companyData'
  if (!nested && formData[field].error) formData[field].error = false
  if (nested && formData[regTypeKey][field].error) formData[regTypeKey][field].error = false
  if (
    registrationType.value === 'PF' &&
    !formData.email.error &&
    !formData.personalData.name.error &&
    !formData.personalData.document.error &&
    !formData.personalData.birthDay.error &&
    !formData.personalData.phone.error &&
    !formData.password.error &&
    !formData.confirm.error
  ) {
    formValid.value = true
    emit('resetValidation')
  }
  if (
    registrationType.value === 'PJ' &&
    !formData.email.error &&
    !formData.companyData.companyName.error &&
    !formData.companyData.document.error &&
    !formData.companyData.oppeningDate.error &&
    !formData.companyData.phone.error &&
    !formData.password.error &&
    !formData.confirm.error
  ) {
    formValid.value = true
    emit('resetValidation')
  }
}
const initFormData = () => {
  formData.email.value = userStore.getUser.email || ''
  formData.personalData.name.value = userStore.getUser.personalData.name || ''
  formData.personalData.document.value = userStore.getUser.personalData.document || ''
  formData.personalData.birthDay.value = userStore.getUser.personalData.birthDay || ''
  formData.personalData.phone.value = userStore.getUser.personalData.phone || ''
  formData.companyData.companyName.value = userStore.getUser.companyData.companyName || ''
  formData.companyData.document.value = userStore.getUser.companyData.document || ''
  formData.companyData.oppeningDate.value = userStore.getUser.companyData.oppeningDate || ''
  formData.companyData.phone.value = userStore.getUser.companyData.phone || ''
  formData.password.value = userStore.getUser.password || ''
  formData.confirm.value = formData.password.value
  resetAllFieldsErrors()
}
const resetAllFieldsErrors = () => {
  resetErrorField('email', false)
  resetErrorField('password', false)
  resetErrorField('confirm', false)
  if (registrationType.value === 'PF') {
    resetErrorField('name', true)
    resetErrorField('document', true)
    resetErrorField('birthDay', true)
    resetErrorField('phone', true)
  } else {
    resetErrorField('companyName', true)
    resetErrorField('document', true)
    resetErrorField('oppeningDate', true)
    resetErrorField('phone', true)
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
    <form>
      <div>
        <mb-input-base
          v-model="formData.email.value"
          :errorMsg="formData.email.error"
          name="email"
          type="email"
          class="mb-mx-0"
          label="Endereço de email"
          @input="resetErrorField('email')"
        />
      </div>
      <div v-if="fetchError" class="mb-fetch-error-alert mb-pa-2 mb-mb-2">
        <span>{{ fetchError }}</span>
      </div>
      <div v-if="registrationType === 'PF'">
        <mb-input-base
          v-model="formData.personalData.name.value"
          :errorMsg="formData.personalData.name.error"
          name="name"
          type="text"
          class="mb-mx-0"
          label="Nome"
          @input="resetErrorField('name', true)"
        />
      </div>
      <div v-else>
        <mb-input-base
          v-model="formData.companyData.companyName.value"
          :errorMsg="formData.companyData.companyName.error"
          name="companyName"
          type="text"
          class="mb-mx-0"
          label="Razão Social"
          @input="resetErrorField('companyName', true)"
        />
      </div>
      <div v-if="registrationType === 'PF'" class="mb-mb-2">
        <mb-input-base
          v-model="formData.personalData.document.value"
          :errorMsg="formData.personalData.document.error"
          name="cpf"
          type="text"
          class="mb-mx-0"
          label="CPF"
          v-maska
          data-maska="###.###.###-##"
          @input="resetErrorField('document', true)"
        />
      </div>
      <div v-else class="mb-mb-2">
        <mb-input-base
          v-model="formData.companyData.document.value"
          :errorMsg="formData.companyData.document.error"
          name="cnpj"
          type="text"
          class="mb-mx-0"
          label="CNPJ"
          v-maska
          data-maska="##.###.###/####-##"
          @input="resetErrorField('document', true)"
        />
      </div>
      <div v-if="registrationType === 'PF'" class="mb-mb-2">
        <mb-input-base
          v-model="formData.personalData.birthDay.value"
          :errorMsg="formData.personalData.birthDay.error"
          name="birthDay"
          type="text"
          class="mb-mx-0"
          label="Data de nascimento"
          v-maska
          data-maska="##/##/####"
          @input="resetErrorField('birthDay', true)"
        />
      </div>
      <div v-else class="mb-mb-2">
        <mb-input-base
          v-model="formData.companyData.oppeningDate.value"
          :errorMsg="formData.companyData.oppeningDate.error"
          name="oppeningDate"
          type="text"
          class="mb-mx-0"
          label="Data de abertura"
          v-maska
          data-maska="##/##/####"
          @input="resetErrorField('oppeningDate', true)"
        />
      </div>
      <div v-if="registrationType === 'PF'" class="mb-mb-2">
        <mb-input-base
          v-model="formData.personalData.phone.value"
          :errorMsg="formData.personalData.phone.error"
          name="phone"
          type="text"
          class="mb-mx-0"
          label="Telefone"
          v-maska
          data-maska="(##) # ####-####"
          @input="resetErrorField('phone', true)"
        />
      </div>
      <div v-else class="mb-mb-2">
        <mb-input-base
          v-model="formData.companyData.phone.value"
          :errorMsg="formData.companyData.phone.error"
          name="phone"
          type="text"
          class="mb-mx-0"
          label="Telefone"
          v-maska
          data-maska="(##) # ####-####"
          @input="resetErrorField('phone', true)"
        />
      </div>
      <div class="mb-mb-2">
        <mb-input-base
          v-model="formData.password.value"
          :errorMsg="formData.password.error"
          name="password"
          type="password"
          class="mb-mx-0"
          label="Senha"
          @input="(confirmDisabled = false), resetErrorField('password')"
        />
      </div>
      <div class="mb-mb-2">
        <mb-input-base
          v-model="formData.confirm.value"
          :errorMsg="formData.confirm.error"
          :disabled="confirmDisabled"
          name="confirm"
          type="password"
          class="mb-mx-0"
          label="Confirmação da senha"
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
.mb-fetch-error-alert {
  background: #ffe5e5;
  border: 1px solid #b20000;
  border-radius: 5px;
  transition: 0.3s;
}
.mb-fetch-error-alert span {
  color: #b20000;
}
</style>
