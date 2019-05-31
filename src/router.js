import Vue from 'vue'
import Router from 'vue-router'
import Layout from './views/layout/Layout.vue'

Vue.use(Router)

export const constantRouters = [
    {
        id: '0',
        path: '/',
        name: '首页',
        meta: { requiresAuth: false },
        icon: 's-home',
        component: Layout,
        children: [
            {
                id: '01',
                path: '/home',
                name: '首页',
                meta: { requiresAuth: false },
                icon: 's-home',
                component: () => import('./views/Home.vue')
            }
        ]
    },
    {
        id: '1',
        path: '/',
        name: '用户管理',
        meta: { requiresAuth: false },
        icon: 'user-solid',
        component: Layout,
        children: [
            {
                id: '11',
                path: '/usershop',
                name: '商城用户',
                icon: 's-custom',
                meta: { requiresAuth: false },
                component: () => import('./views/user/UserShop.vue')
            },
            {
                id: '12',
                path: '/usermanage',
                name: '后台用户',
                icon: 's-custom',
                meta: { requiresAuth: true },
                component: () => import('./views/user/UserManage.vue')
            },
        ]
    },
    {
        id: '2',
        path: '/',
        name: '关于',
        meta: { requiresAuth: false },
        icon: 's-home',
        component: Layout,
        children: [
            {
                id: '21',
                path: '/about',
                name: '关于',
                icon: 's-opportunity',
                meta: { requiresAuth: false },
                component: () => import('./views/About.vue')
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        meta: { requiresAuth: false },
        hidden: true,
        component: () => import('./views/login/Login.vue')
    }
]

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constantRouters
})
