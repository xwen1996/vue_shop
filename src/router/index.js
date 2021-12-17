import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Inventory from '../components/commodity/Inventory.vue'
import Ininventory from '../components/commodity/Ininventory.vue'
import Outinventory from '../components/commodity/Outinventory.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: '/Login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/inventory', component: Inventory },
        { path: '/ininventory', component: Ininventory },
        { path: '/outinventory', component: Outinventory }
      ]
    }
  ]
})
// 挂载路由导航守卫
// router.beforeEach((to, from, next) => {
// // to 将要访问的路径
// // from 代表从那个路径跳转而来
// // next 是一个函数，表示放行
// // next() 放行， next('/login') 强制跳转
//   if (to.path === '/login') return next()
//   // 获取token
//   const tokenStr = window.sessionStorage.getItem('token')
//   if (!tokenStr) return next('/login')
//   next()
// })
export default router
