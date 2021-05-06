import { login, getInfo, logout } from "@/api/login";
import { getToken, setToken, removeToken } from "@/utils/auth";

const user = {
  state: {
    token: getToken(),
    user: {},
    roles: [],
    // 第一次加载菜单时用到
    loadMenus: false,
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USER: (state, user) => {
      state.user = user;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_LOAD_MENUS: (state, loadMenus) => {
      state.loadMenus = loadMenus;
    },
  },
  actions: {
    //登录
    Login({ commit }, userInfo) {
      const rememberMe = userInfo.remeberMe;
      return new Promise((resolve, reject) => {
        login(
          userInfo.username,
          userInfo.password,
          userInfo.code,
          userInfo.uuid
        )
          .then((res) => {
            //更新/添加Cookies中的token
            setToken(res.token, rememberMe);
            //更新/添加state中的token
            commit("SET_TOKEN", res.token);
            setUserInfo(res.user, commit);
            // 第一次加载菜单时用到，具体见 src目录下的permission.js
            commit("SET_LOAD_MENUS", true);
            // resolve(res);
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 获取用户信息
    GetInfo({ commit }) {
      //GetInfo(store) {  //获取到当前模块的：{getters: {…}, state: {…}, rootGetters: {…}, dispatch: ƒ, commit: ƒ, …}
      return new Promise((resolve, reject) => {
        getInfo()
          .then((res) => {
            setUserInfo(res, commit);
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 登出
    LogOut({ commit }) {
      return new Promise((resolve, reject) => {
        logout()
          .then((res) => {
            logOut(commit);
            resolve();
          })
          .catch((error) => {
            logOut(commit);
            reject(error);
          });
      });
    },
    updateLoadMenus({ commit }) {
      return new Promise((resolve, reject) => {
        commit("SET_LOAD_MENUS", false);
      });
    },
  },
};

export const logOut = (commit) => {
  commit("SET_TOKEN", "");
  commit("SET_ROLES", []);
  removeToken();
};

export const setUserInfo = (res, commit) => {
  // 如果没有任何权限，则赋予一个默认的权限，避免请求死循环
  // console.log(res.roles);["admin"]
  console.log(res);
  if (res.roles.length === 0) {
    commit("SET_ROLES", ["ROLE_SYSTEM_DEFAULT"]);
  } else {
    commit("SET_ROLES", res.roles);//roles: ["admin", __ob__: Observer]
  }
  commit("SET_USER", res.user);
  // user:
  //   ...
  //   roles: Array(1)
  //   0:
  //     dataScope: "全部"
  //     id: 1
  //     level: 1
  //     name: "超级管理员"
};

export default user;
