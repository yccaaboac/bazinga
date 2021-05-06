import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";

Vue.use(Vuex);

const modulesFiles = require.context("./modules", true, /\.js$/);

//提取模块中的内容（value.default）组成modules，modules中key为模块名（moduleName），value为模块内容（value.default）
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  //使用reduce方法相当于一直给modules对象新增属性
  //modulesFiles.keys():["./permission.js", "./settings.js", "./user.js"]
  //modules:[object Object]
  //modulePath:./permission.js
  //moduleName:permission
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  // Module
  //   default:
  //     actions: {toggleSideBar: ƒ, setSize: ƒ}
  //     mutations: {TOGGLE_SIDEBAR: ƒ, SET_SIZE: ƒ}
  //     namespaced: true
  //     state: {__ob__: Observer}
  //     __proto__: Object
  //   Symbol(Symbol.toStringTag): "Module"
  //   __esModule: true
  //   __proto__: Object
  return modules;
}, {});

const store = new Vuex.Store({
  modules,//{permission: {…}, settings: {…}, user: {…}}
  getters,
});
export default store;
