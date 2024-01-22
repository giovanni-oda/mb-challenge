<script setup>
// Imports
import { ref } from 'vue'

import MbRegistrationStep1 from './registrationSteps/MbRegistratioStep1.vue'
import MbRegistrationStep2 from './registrationSteps/MbRegistratioStep2.vue'
import MbRegistrationStep3 from './registrationSteps/MbRegistratioStep3.vue'
import MbRegistrationStep4 from './registrationSteps/MbRegistratioStep4.vue'
import MbRegsitrationFormActions from './MbRegistrationFormActions.vue'

// Data
const activeStep = ref(1)
const doValidation = ref(false)
const stterperData = {
  1: { title: 'Seja bem vindo(a)', component: MbRegistrationStep1 },
  2: { title: 'Pessoa Física', component: MbRegistrationStep2 },
  3: { title: 'Senha de acesso', component: MbRegistrationStep3 },
  4: { title: 'Revise suas informações', component: MbRegistrationStep4 }
}
</script>

<template>
  <div class="mb-form-container mb-mt-3">
    <keep-alive>
      <component
        :is="stterperData[activeStep].component"
        :title="stterperData[activeStep].title"
        :step="activeStep"
        :validate="doValidation"
        @resetValidation="doValidation = false"
        @next="activeStep++"
      ></component>
    </keep-alive>
    <mb-regsitration-form-actions
      :step="activeStep"
      :disabled="doValidation"
      @prevClick="(doValidation = false), activeStep--"
      @nextClick="doValidation = true"
    />
  </div>
</template>

<style scoped>
.mb-form-container {
  width: 320px;
  margin-left: auto;
  margin-right: auto;
}
</style>
