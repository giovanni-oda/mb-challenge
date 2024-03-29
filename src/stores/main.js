import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  //
  state: () => ({
    loading: false
  }),

  //
  getters: {
    loading: (state) => state.loading
  },

  //
  actions: {
    //
  }
})
