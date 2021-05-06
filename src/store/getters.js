const getters = {
  sidebarRouters: (state) => state.permission.sidebarRouters,
  loadMenus: (state) => state.user.loadMenus,
  user: (state) => state.user.user,
  size: (state) => state.app.size,
  roles: (state) => state.user.roles,
  sidebar: (state) => state.app.sidebar,
};

export default getters;
