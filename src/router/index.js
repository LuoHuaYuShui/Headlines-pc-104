// 初始化路由实例 且导出

import Vue from 'vue'
// 依赖路由
import VueRouter from 'vue-router'

// 导入组件
import login from '@/views/login'
import Layout from '@/views/Layout'
import Welcome from '@/views/welcome'

Vue.use(VueRouter);

// 初始化路由
// 定义路由规则
const routes = [
    // 登录
    { path: '/login', component: login },
    // 首页框架
    {
        path: '/', component: Layout,
        // 二级路由配置
        children: [
            // 欢迎页面
            {
                path: '/', component: Welcome
            }
        ]
    },
];
const router = new VueRouter({ routes });

export default router