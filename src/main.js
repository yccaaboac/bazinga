import Vue from "vue";
import Cookies from "js-cookie";
import App from "./App.vue";
import Element from "element-ui";
import router from "./router/routers";
import "./assets/icons";
import "element-ui/lib/theme-chalk/index.css";
import "./router/index";
// import "./assets/styles/element-variables.scss";
import "./assets/styles/index.scss";
import store from "./store";
Vue.config.productionTip = false;
Vue.use(Element, {
  // 在引入Element时,可以传入一个全局配置对象
  //该对象目前支持size与zIndex字段
  //size用于改变组件的默认尺寸, zIndex设置弹框的初始z-index (默认值: 2000 )。
  //也可以按需引入，如（Button），具体查看文档
  size: Cookies.get("size") || "small",
});

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
