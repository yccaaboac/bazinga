import router from './routers'
import store from '@/store'
import Config from '@/settings'
import NProgress from 'nprogress' //progress bar
import 'nprogress/nprogress' //progress bar style
import { getToken } from '@/utils/auth' //getToken from cookie
import { buildMenus } from '@/api/system/menu'
import { filterAsyncRouter } from '@/store/modules/permission'


NProgress.configure({showSpinner:false})
const whiteList = ['/login']

router.beforeEach((to, from, next) => {
    if(to.meta.title){
        document.title = to.meta.title + ' - '+Config.title
    }
    NProgress.start()
    if(getToken()){
        //已经登录且要跳转的页面是登录页面
        if(to.path ==='/login'){
            next({path: '/'})
            NProgress.done()
        }else{
            if(store.getters.roles.length === 0){
                store.dispatch('GetInfo').then(()=>{
                    loadMenus(next,to)
                }).catch(()=>{
                    store.dispatch('LogOut').then(()=>{
                        location.reload()
                    })
                })
            } else if(store.getters.loadMenus){
                store.dispatch('updateLoadMenux')
                loadMenus(next,to)
            } else {
                next()
            }
        }
    } else {//没登录的情况下，如果是登录页（白名单中）直接进入，否则重定向到登录页，并且redirect带上原来访问的路由（fullPath）
        if(whiteList.indexOf(to.path) !== -1){ // 在免登录白名单，直接进入
            next()
        }else{
            next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
            NProgress.done()
        }
    }
    
})

export const loadMenus = (next, to)=>{
    buildMenus().then(res => {
        const sdata = JSON.parse(JSON.stringify(res))
        const rdata = JSON.parse(JSON.stringify(res))
        const sidebarRoutes = filterAsyncRouter(sdata)
        const rewriteRoutes = filterAsyncRouter(rdata, true)
        rewriteRoutes.push({ path: '*', redirect: '/404', hidden: true })
    
        store.dispatch('GenerateRoutes', rewriteRoutes).then(() => { // 存储路由
          router.addRoutes(rewriteRoutes) // 动态添加可访问路由表
          next({ ...to, replace: true })
        })
        store.dispatch('SetSidebarRouters', sidebarRoutes)
    })
}