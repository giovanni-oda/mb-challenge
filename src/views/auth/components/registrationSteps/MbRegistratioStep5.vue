<script setup>
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
</script>

<template>
  <div class="mb-registration-step">
    <div class="mb-mt-3 mb-text-small">
      <span class="mb-font-bold"> SUCESSO! </span>
    </div>
    <h2 class="mb-mb-3 mb-font-bold">{{ props.title }}</h2>
    <form>
      <div class="mb-success-alert mb-pa-2 mb-mb-2">
        <span>
          Seu usuário foi cadastrado! Acesse o botão abaixo e faça o seu login para acessar o app.
        </span>
      </div>
    </form>
  </div>
</template>

<style scoped>
#orange-step {
  color: var(--mb-orange) !important;
}
.mb-success-alert {
  background: #e2ffe2;
  border: 1px solid green;
  border-radius: 5px;
  transition: 0.3s;
}
.mb-success-alert span {
  color: #004200;
}
</style>
