import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 引入 echarts
import * as echarts from 'echarts'
// 导入moment日期处理库
import moment from 'moment'
moment.locale('zh-cn')
Vue.prototype.$moment = moment
// 全局挂载 echarts
Vue.prototype.$echarts = echarts
// 导入字体图标
// eslint-disable-next-line import/first
import './assets/fonts/iconfont.css'
// 导入全局样式表
// eslint-disable-next-line import/first
import './assets/css/global.css'
// 配置 axios
// eslint-disable-next-line import/first
import axios from 'axios'
// 配置请求跟路径
axios.defaults.baseURL = 'http://127.0.0.1:3000/api/'
// 配置 axios 请求拦截器
axios.interceptors.request.use(config => {
  // 为请求头对象，添加 token 验证的 Authorization 字段
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 最后必须返回 config
  return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
