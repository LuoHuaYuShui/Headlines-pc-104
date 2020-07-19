import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 导入自己的路由模块
import router from '@/router'

// 导入自己配置的axios,并挂载
import axios from '@/api'
Vue.prototype.$http = axios

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App),
  // 挂载路由
  router
}).$mount('#app')

/*
    main.js的作用
        1. 依赖第三方的全局资源
        2. 初始化Vue 根实例
*/
