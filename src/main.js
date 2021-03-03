import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'


import toast from 'components/common/toast'

Vue.config.productionTip = false

Vue.use(toast)
//实现懒加载
Vue.use(VueLazyLoad)

//添加$bus原型,用vue实例作为事件总线
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  toast,
  FastClick,
  VueLazyLoad,
  render: h => h(App),
}).$mount('#app')

//解决移动端300毫秒延迟问题
FastClick.attach(document.body)
