import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

const modulesFiles = require.context('./modules',true,/\.js$/)

//提取模块中的内容（value.default）组成modules，modules中key为模块名（moduleName），value为模块内容（value.default）
const modules = modulesFiles.keys().reduce((modules,modulePath)=>{
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/,'$1')
    const value = modulesFiles(modulePath)
    modules[moduleName] = value.default
    return modules
},{})

const store = new Vuex.Store({
    modules,
    getters
})
export default store