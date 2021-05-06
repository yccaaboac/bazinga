<template>
  <section class="app-main">
    <router-view></router-view>
  </section>
</template>

<script>
export default {
  name: "AppMain",
};
</script>
<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
</style>