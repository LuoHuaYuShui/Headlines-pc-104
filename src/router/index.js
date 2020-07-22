// 初始化路由实例 且导出

import Vue from 'vue'
// 依赖路由
import VueRouter from 'vue-router'
import auth from '@/utils/auth'

// 导入组件
import login from '@/views/login'
import Layout from '@/views/Layout'
import Welcome from '@/views/welcome'
import NotFound from '@/views/404'
import Article from '@/views/article'
import Image from '@/views/image'

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
            },
            // 内容管理
            { path: '/article', component: Article },
            // 素材管理
            { path: '/image', component: Image }
        ]
    },
    // 通配规则，404组件
    { path: '*', component: NotFound }
];
const router = new VueRouter({ routes });

// 导航守卫
router.beforeEach((to, from, next) => {
    // to 即将跳转的路由对象
    // from 正在离开的路由对象
    // next('地址') 下一步，放行
    const user = auth.getUser();
    // 不是 访问登录 且没有token 信息,不能访问其他页面,拦截登录
    if (to.path !== '/login' && !user.token) return next('/login');
    // 其他情况一概放行
    next();
});
export default router