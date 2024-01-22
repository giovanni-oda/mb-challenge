<script setup>
// Imports
import MbRegistrationFormContainer from './components/MbRegistrationFormContainer.vue'
</script>

<template>
  <div class="mb-registration-page">
    <img alt="MB logo" class="mb-logo" src="@/assets/img/logo-lite.svg" width="50" height="50" />
    <mb-registration-form-container ref="regFormContainer" />
  </div>
</template>

<style scoped>
.mb-registration-page {
  max-width: 450px;
  min-height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.mb-logo {
  display: block;
  margin: 0 auto;
}
</style>
