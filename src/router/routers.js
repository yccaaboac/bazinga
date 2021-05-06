import Vue from "vue";
import Router from "vue-router";
import Layout from "../layout";

Vue.use(Router);

export const constantRouterMap = [
  {
    path: "/login",
    component: (resolve) => require(["@/views/login"], resolve),
    hidden: true,
  },
  {
    path: "/404",
    component: (resolve) => require(["@/views/features/404"], resolve),
    hidden: true,
  },
  {
    path: "/",
    component: Layout,
    // name: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: (resolve) => require(["@/views/home"], resolve),
        name: "Dashboard",
        meta: { title: "首页", icon: "index", affix: true, noCache: true },
      },
    ],
  },
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path",
        component: (resolve) => require(["@/views/features/redirect"], resolve),
      },
    ],
  },
];

export default new Router({
  // mode: 'hash',
  mode: "history",
  scrollBehavior: () => ({ y: 0 }),//当切换到新路由时，简单地让页面滚动到顶部
  routes: constantRouterMap,
});
