import { defineStore } from 'pinia'

export const useDrawerStore = defineStore('drawer', {
    state: () => {
        return { show: false }
    },
    actions: {
        alternate() {
            this.show = !this.show;
        }
    },
})