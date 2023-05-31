import { defineStore } from 'pinia'

export const usePageStore = defineStore('page', {
    state: () => {
        return {
            current: 1,
            last: 1,
            total: 0,
            registers: null,
        }
    },
})
