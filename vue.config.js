const path = require("path");

function resolve(dir) {
  //__dirname:E:\bazinga\bazinga-web
  //dir:src/assets/icons
  //path.join(__dirname, dir):E:\bazyinga\bazinga-web\src\assets\icons
  return path.join(__dirname, dir);
}

const port = 8013;

module.exports = {
  publicPath: "/", //部署应用包时的基本URL，默认'/'，替代原来的baseUrl
  outputDir: "dist", //当运行vue-cli-service build时生成的生产环境构建文件的目录
  assetsDir: "static", //放置生成的静态资源 (js、css、img、fonts)的(相对于outputDir的)目录
  //是否在开发环境下通过eslint-loader在每次保存时lint代码。这个值会在@vue/cli-plugin-eslint被安装之后生效
  lintOnSave: process.env.NODE_ENV === "development",
  productionSourceMap: false, //如果你不需要生产环境的source map，可以将其设置为false以加速生产环境构建
  devServer: {
    port: port, //指定端口号
    open: true, //在服务器启动后打开浏览器
    overlay: {
      //出现编译器警告时，不在浏览器中显示全屏覆盖
      warnings: false,
      //出现编译器错误时，在浏览器中显示全屏覆盖
      errors: true,
    },
    proxy: {
      "/api": {
        target: process.env.VUE_APP_BASE_API,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "api",
        },
      },
      "/auth": {
        target: process.env.VUE_APP_BASE_API,
        changeOrigin: true,
        pathRewrite: {
          "^/auth": "/auth",
        },
      },
    },
  },

  chainWebpack(config) {
    // set svg-sprite-loader
    config.module
      .rule("svg")
      .exclude.add(resolve("src/assets/icons"))
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)

      .include.add(resolve("src/assets/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]", //Symbol本质上是一种唯一标识符，可用作对象的唯一属性名，这样其他人就不会改写或者覆盖你的属性值
      })
      .end();
  },
};
