import { defineStore } from 'pinia'

export const useClimateStore = defineStore('climate', {
    state: () => {
        return { clima: null }
    },
})