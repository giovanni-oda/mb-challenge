import { defineStore } from 'pinia'

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
    updateUserFields(objPayload) {
      const arrKeys = Object.keys(objPayload)
      arrKeys.forEach((key) => {
        this.user[key] = objPayload[key]
      })
    }
  }
})
