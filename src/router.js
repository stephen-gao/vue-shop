import Vue from 'vue'
import Router from 'vue-router'
import Layout from './views/layout/Layout.vue'

Vue.use(Router);

export const constantRouters = [
    {
        path: '/',
        name: '首页',
        meta: { requiresAuth: true },
        component: Layout,
        children: [
            {
                path: '/home',
                name: '首页',
                meta: { requiresAuth: true },
                component: () => import('./views/Home.vue')
            }
        ]
    },
    {
        path: '/',
        name: '用户管理',
        meta: { requiresAuth: true },
        component: Layout,
        children: [
            {
                path: '/usershop',
                name: '商城用户',
                meta: { requiresAuth: false },
                component: () => import('./views/user/CustomerShop.vue')
            },
            {
                path: '/usermanage',
                name: '后台用户',
                meta: { requiresAuth: true },
                component: () => import('./views/user/UserManage.vue')
            },
            {
                path: '/role',
                name: '角色管理',
                meta: { requiresAuth: true },
                component: () => import('./views/user/Role.vue')
            },
            {
                path: '/resource',
                name: '资源管理',
                meta: { requiresAuth: true },
                component: () => import('./views/user/Resource.vue')
            },
        ]
    },
    {
        path: '/shop',
        name: '商城管理',
        meta: { requiresAuth: true },
        component: Layout,
        children: [
            {
                path: '/spu',
                name: '商品管理',
                meta: { requiresAuth: true },
                component: () => import('./views/shop/Spu.vue')
            },
            {
                path: '/spec',
                name: '规格管理',
                meta: { requiresAuth: true },
                component: () => import('./views/shop/Spec.vue')
            },
            {
                path: '/brand',
                name: '品牌管理',
                meta: { requiresAuth: true },
                component: () => import('./views/shop/Brand.vue')
            },
            {
                path: '/category',
                name: '分类管理',
                meta: { requiresAuth: true },
                component: () => import('./views/shop/Category.vue')
            }
        ]
    },
    {
        path: '/sys',
        name: '系统管理',
        meta: { requiresAuth: false },
        component: Layout,
        children: [
            {
                path: '/sysdic',
                name: '数据字典',
                meta: { requiresAuth: false },
                component: () => import('./views/sys/SysDic.vue')
            },
            {
                path: '/about',
                name: '关于',
                meta: { requiresAuth: false },
                component: () => import('./views/About.vue')
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        meta: { requiresAuth: false },
        component: () => import('./views/login/Login.vue')
    }
];

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constantRouters
})
