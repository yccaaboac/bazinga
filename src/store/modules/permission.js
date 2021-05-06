import { constantRouterMap } from "@/router/routers";
import Layout from "@/layout/index";
import ParentView from "@/components/ParentView";

const permission = {
  state: {
    //原来的routers加上动态的router，包括{ path: "*", redirect: "/404", hidden: true }
    routers: constantRouterMap,
    //动态的router，包括{ path: "*", redirect: "/404", hidden: true }，且子组件的子组件（多级菜单子组件和子组件的子组件）没有层级关系
    addRouters: [],
    //原来的routers加上动态的router，不包括{ path: "*", redirect: "/404", hidden: true }
    sidebarRouters: [],
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = constantRouterMap.concat(routers); //concat方法不改变原来的数组
    },
    SET_SIDEBAR_ROUTERS: (state, routers) => {
      state.sidebarRouters = constantRouterMap.concat(routers);
    },
  },
  actions: {
    GenerateRoutes({ commit }, asyncRouter) {
      commit("SET_ROUTERS", asyncRouter);
    },
    SetSidebarRouters({ commit }, sidebarRouter) {
      commit("SET_SIDEBAR_ROUTERS", sidebarRouter);
    },
  },
};
// 遍历后台传来的路由字符串，转换为组件对象
export const filterAsyncRouter = (routers, isRewrite = false) => {
  return routers.filter((router) => {
    if (isRewrite && router.children) {
      // console.log(router);
      router.children = filterChildren(router.children);
    }
    if (router.component) {
      if (router.component === "Layout") {
        // Layout组件特殊处理
        router.component = Layout;
        // console.log(Layout);
        // console.log(router.component);
      } else if (router.component === "ParentView") {
        router.component = ParentView;
      } else {
        const component = router.component;
        router.component = loadView(component);
      }
    }
    if (router.children && router.children.length) {
      router.children = filterAsyncRouter(router.children, router, isRewrite); //router.children子组件，router父组件
    }
    return true;
  });
};

function filterChildren(childrenMap) {
  // console.log(JSON.stringify(childrenMap, null, "\t"));
  var children = [];
  childrenMap.forEach((el, index) => {
    if (el.children && el.children.length) {
      if (el.component === "ParentView") {
        el.children.forEach((c) => {
          c.path = el.path + "/" + c.path;
          if (c.children && c.children.length) {
            children = children.concat(filterChildren(c.children, c));
            return;
          }
          children.push(c);
        });
        return;
      }
    }
    children = children.concat(el);
  });
  // console.log("-------------------------");
  // console.log(JSON.stringify(children, null, "\t"));
  return children;
}

export const loadView = (view) => {
  return (resolve) => require([`@/views/${view}`], resolve);
};

export default permission;
