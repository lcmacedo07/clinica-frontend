import { _token, _user, _permissions } from "@/global";
import { useAuthStore } from "@/store/auth";

function setUserStore() {

  var token = localStorage.getItem(_token);
  var user = localStorage.getItem(_user);
  var permissions = localStorage.getItem(_permissions);

  if (typeof token !== "undefined" && token !== null) {
    
    token = JSON.parse(token);
    user = JSON.parse(user);
    permissions = JSON.parse(permissions);

    const auth = useAuthStore();
    auth.$patch({
      user: user,
      permissions: permissions,
      token: token,
    });
  }
};

export default setUserStore;