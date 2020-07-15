import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 导入自己的路由模块
import router from '@/router'

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App),
  // 挂载路由
  router
}).$mount('#app')
