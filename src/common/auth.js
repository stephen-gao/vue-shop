/**
 * Created by gs on 2019/5/7.
 * 路由跳转前判断是否登录
 */
import router from '../router'
import user from '../store/user'
import console from 'console'
import { Message } from 'element-ui'

router.beforeEach(function (to, from ,next ) {
    console.log("路由路由before")
    if(to.path !== '/login'){
        if(!user.getToken()){
            console.log(Message)
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


export default function () {
    return router
}