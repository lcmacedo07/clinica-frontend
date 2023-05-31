import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('loading', {
    state: () => {
        return { show: false }
    },
    actions: {
        alternate() {
            this.show = !this.show;
        }
    },
})