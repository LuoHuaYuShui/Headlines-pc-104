// 初始化路由实例 且导出

import Vue from 'vue'
// 依赖路由
import VueRouter from 'vue-router'

Vue.use(VueRouter);

// 初始化路由
// 定义路由规则
const routes = [];
const router = new VueRouter({ routes });

export default router