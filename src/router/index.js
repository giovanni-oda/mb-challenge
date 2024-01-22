import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/auth/LoginPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: LoginPage
    },
    {
      path: '/registration',
      name: 'RegistrationPage',
      component: () => import('../views/auth/RegistrationPage.vue')
    }
  ]
})

export default router
