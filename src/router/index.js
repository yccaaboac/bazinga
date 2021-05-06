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
  if (to.meta.title) {
    //当未定义或未赋值时，结果为false；
    //当为字符串类型时，长度为0即false，长度大于0即true；
    //当为数字类型时，等于0为false，不等于0为true。
    document.title = to.meta.title + " - " + Config.title;
  }
  NProgress.start();

  if (getToken()) {
    //Bearer eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIxOWJhZWY4MmI4NTQ0NmIwOGM5MzYwZjU3NzY5ZmZiNCIsInVzZXIiOiJhZG1pbiIsInN1YiI6ImFkbWluIn0.e_fiZiq3vaHOQYJpF_gxaET8xDbkuEoHvJUzzHBzWNmKKOEcK-KmmNhA6vav_B2IeXD4ljBOEynT06-9zxwNxw
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
            // 拉取user_info
            // 动态路由，拉取菜单
            loadMenus(next, to);
          })
          .catch(() => {
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
