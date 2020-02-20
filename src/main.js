import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

Vue.config.productionTip = false

// 引入常用的组件
import tableList from '@/component/tableList'
Vue.component('tableList',tableList)
import tableTest from '@/component/tableTest'
Vue.component('tableTest',tableTest)

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
