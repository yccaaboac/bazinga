import Vue from "vue";
import SvgIcon from "@/components/SvgIcon"; // svg component

Vue.component("svg-icon", SvgIcon);

/*
require.context(directory, useSubdirectories, regExp)
directory: 要查找的文件路径
useSubdirectories: 是否查找子目录
regExp: 要匹配文件的正则

require.context('./components/', true, /\.js$/)
*/
const req = require.context("./svg", false, /\.svg$/);
console.log("------------");
console.log(req);
console.log(req.id);
console.log(req.keys());
console.log("------------");
console.log(req.resolve(req.keys()[0]));
console.log(req(req.keys()[0]));
console.log("------------");
const requireAll = (requireContext) =>
  requireContext.keys().map(requireContext); //当上下文环境传入某个文件的键时，会得到一个标准的es module
requireAll(req);
