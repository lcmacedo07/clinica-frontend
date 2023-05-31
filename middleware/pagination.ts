export default defineNuxtRouteMiddleware((to, from) => {
    const auth = useState('auth')
    if (!auth.value.authenticated) {
        return navigateTo('/login')
    }
})


// const logout = () => {
//     alert("logout");
//     const auth = useAuthStore();
//     auth.$patch({
//       user: null,
//       permissions: null,
//       token: null,
//     });
  
//     localStorage.removeItem("_token");
//     localStorage.removeItem("_user");
//     localStorage.removeItem("_permissions");
//   };
  
//   onMounted(() => setDataUser());