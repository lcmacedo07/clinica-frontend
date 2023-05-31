import { defineStore } from 'pinia'

export const useFinancialStore = defineStore('financial', {
    state: () => {
        return {
            dolar: null,
            euro: null,
            bitcoin: null,
            ibovespa: null,
            selic: null,
        }
    },
})