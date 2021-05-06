<script>
export default {
  created() {
    // {name: undefined, meta: {…}, path: "/redirect/dashboard", hash: "", query: {…}, …}
    // fullPath: "/redirect/dashboard"
    // hash: ""
    // matched: Array(2)
    //  0: {path: "/redirect", regex: /^\/redirect(?:\/(?=$))?$/i, components: {…}, alias: Array(0), instances: {…}, …}
    //  1: {path: "/redirect/:path*", regex: /^\/redirect(?:\/((?:[^\/]+?)(?:\/(?:[^\/]+?))*))?(?:\/(?=$))?$/i, components: {…}, alias: Array(0), instances: {…}, …}
    // length: 2
    // __proto__: Array(0)
    // meta: {}
    // name: undefined
    // params: {path: "dashboard"}
    // path: "/redirect/dashboard"
    // query: {}
    // __proto__: Object
    const { params, query } = this.$route;
    const { path } = params;
    this.$router.replace({ path: "/" + path, query });
  },
  render: function (h) {
    return h(); // avoid warning message
  },
};
</script>
