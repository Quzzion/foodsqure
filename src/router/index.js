import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login'
import home from '@/pages/home'
import register from '@/pages/register'
import menuSort from '@/pages/menuSort'
import healthMenu from '@/pages/healthMenu'
import menuDetail from '@/pages/menuDetail'
import postMenu from '@/pages/postMenu'
import searchMenu from '@/pages/searchMenu'
import infoCenter from '@/pages/infoCenter'
import errPage from '@/pages/errPage'
Vue.use(Router)

const router = new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      meta:{
        isCheck:true
      },
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta:{
        isCheck:false
      },
    },
    {
      path: '/register',
      name: 'register',
      component: register,
      meta:{
        isCheck:false
      },
    },
    {
      path: '/menuSort',
      name: 'menuSort',
      component: menuSort,
      meta:{
        isCheck:true
      },
    },
    {
      path: '/healthMenu',
      name: 'healthMenu',
      component: healthMenu,
      meta:{
        isCheck:true
      },
    },
    {
      path: '/menuDetail',
      name: 'menuDetail',
      component: menuDetail,
      meta:{
        isCheck:true
      },
    },
    {
      path: '/postMenu',
      name: 'postMenu',
      component: postMenu,
      meta:{
        isCheck:true
      },
    },
    {
      path: '/searchMenu',
      name: 'searchMenu',
      component: searchMenu,
      meta:{
        isCheck:true
      },
    },
    {
      path: '/infoCenter',
      name: 'infoCenter',
      component: infoCenter,
      meta:{
        isCheck:true
      },
    },
    {
      path: '*',
      component: errPage,
      meta:{
        isCheck:false
      },
    },
  ]
})

router.beforeEach((to,from,next)=>{
  if(to.meta.isCheck){
    if(!localStorage.healthyToken || localStorage.healthyToken == ''){
      alert("请先登录");
      next('/login');
      return
    }
    next();
  }
  next();
})

export default router;