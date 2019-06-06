/**
 * Created by gs on 2019/5/7.
 * 路由跳转前判断是否登录
 */
import router from '../router'
import console from 'console'
import { Message } from 'element-ui'
import store from '../store'

router.beforeEach(function (to, from ,next ) {
    console.log("走路由");
    if(to.matched.some(record => record.meta.requiresAuth)) {
        var token = store.getters.token;
        console.log("路由路由before");
        if (!token) {
            console.log(Message);
            Message({
                showClose: true,
                message: '未登录',
                type: 'error'
            })
            return next({path: '/login'})
        }
    }
    next();
})


export default {
    name: "auth"
}