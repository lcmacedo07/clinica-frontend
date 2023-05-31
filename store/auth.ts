import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            user: null,
            permissions: null,
            token: null,
            complete: false,
        }
    },
})
