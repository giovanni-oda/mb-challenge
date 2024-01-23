import { defineStore } from 'pinia'
import { useFetch } from '@/composables/Fetch'

export const useUserStore = defineStore('users', {
  //
  state: () => ({
    user: {
      email: '',
      type: '',
      personalData: {
        name: '',
        document: '',
        birthDay: '',
        phone: ''
      },
      companyData: {
        companyName: '',
        document: '',
        oppeningDate: '',
        phone: ''
      },
      password: ''
    },
    users: []
  }),

  //
  getters: {
    getUser: (state) => state.user,
    getUsers: (state) => state.users
  },

  //
  actions: {
    async createUser(newUser) {
      const { status, data, error } = await useFetch(
        'POST',
        `http://localhost:3000/registration`,
        newUser
      )
      // console.log('resp', status, data, error)
      if (!error && status === 201) {
        this.users.push(newUser)
        return { msg: data.message }
      } else {
        console.error(error)
        return { error: error }
      }
    },
    updateUserFields(objPayload) {
      const arrKeys = Object.keys(objPayload)
      arrKeys.forEach((key) => {
        this.user[key] = objPayload[key]
      })
    }
  }
})
