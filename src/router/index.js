import router from "./routers";
import store from "@/store";
import Config from "@/settings";
import NProgress from "nprogress"; //progress bar
import "nprogress/nprogress"; //progress bar style
import { getToken } from "@/utils/auth"; //getToken from cookie
import { buildMenus } from "@/api/system/menu";
import { filterAsyncRouter } from "@/store/modules/permission";

NProgress.configure({ showSpinner: false });
const whiteList = ["/login"];

router.beforeEach((to, from, next) => {
  // debugger;
  if (to.meta.title) {
    document.title = to.meta.title + " - " + Config.title;
  }
  NProgress.start();

  if (getToken()) {
    // debugger;
    //已经登录且要跳转的页面是登录页面
    if (to.path === "/login") {
      next({ path: "/" });
      NProgress.done();
    } else {
      //已经登陆但不是跳转到登陆页面
      if (store.getters.roles.length === 0) {
        // 判断当前用户是否已拉取完user_info信息，更改路由每次都会拉取？？？
        store
          .dispatch("GetInfo")
          .then(() => {
            // debugger;
            // 拉取user_info
            // 动态路由，拉取菜单
            loadMenus(next, to);
          })
          .catch(() => {
            // debugger;
            store.dispatch("LogOut").then(() => {
              location.reload();
            });
          });
      } else if (store.getters.loadMenus) {
        store.dispatch("updateLoadMenus");
        loadMenus(next, to);
      } else {
        next();
      }
    }
  } else {
    //没登录的情况下，如果是登录页（白名单中）直接进入，否则重定向到登录页，并且redirect带上原来访问的路由（fullPath）
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next();
    } else {
      // console.log(to.fullPath);/dashboard
      next(`/login?redirect=${to.fullPath}`); // 否则全部重定向到登录页
      NProgress.done();
    }
  }
});

export const loadMenus = (next, to) => {
  console.log("loadMenus");
  buildMenus().then((res) => {
    // debugger;
    const sdata = JSON.parse(JSON.stringify(res));
    const rdata = JSON.parse(JSON.stringify(res));
    const sidebarRoutes = filterAsyncRouter(sdata);
    console.log(JSON.stringify(sidebarRoutes, null, "\t"));
    //console.log(JSON.stringify(sidebarRoutes, null, "\t")); //stringify中函数会被剔除掉
    const rewriteRoutes = filterAsyncRouter(rdata, true);
    // console.log(JSON.stringify(rewriteRoutes, null, "\t"));
    rewriteRoutes.push({ path: "*", redirect: "/404", hidden: true });
    store.dispatch("GenerateRoutes", rewriteRoutes).then(() => {
      //存储路由
      router.addRoutes(rewriteRoutes); //动态添加可访问路由表
      // debugger;
      next({ ...to, replace: true });
    });
    store.dispatch("SetSidebarRouters", sidebarRoutes);
  });
};
