<script setup>
// Imports
import MbLoginFormContainer from './components/MbLoginFormContainer.vue'
</script>

<template>
  <div class="mb-login-page">
    <img alt="MB logo" class="mb-logo" src="@/assets/img/logo-lite.svg" width="50" height="50" />
    <mb-login-form-container />
  </div>
</template>

<style scoped>
.mb-login-page {
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
