// import { defineStore } from "pinia";
// import { url } from "@/global";

// export const postStore = defineStore("posts", {
//     state: () => ({
//         articles: [],
//         last: null,
//     }),
//     getters: {
//         totalPosts: (state) => {
//             return state.articles.length;
//         }
//     },
//     actions: {
//         async loadPosts() {
//             const request = await fetch(`${this.$config.public.baseURL}/public/most-accessed-week`);
//             const { data } = (await request).json();
//             this.articles = data;
//         }
//     }
// })