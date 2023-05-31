import { useAuthStore } from "@/store/auth";

export default defineNuxtRouteMiddleware((to, from) => {

    const auth = useAuthStore();
    if (auth.user === null || auth.token === null) {
        return navigateTo('/');
    }
})