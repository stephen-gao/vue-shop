/**
 * Created by gs on 2019/5/7.
 * 路由跳转前判断是否登录
 */
import router from '../router'
// import user from '../store/user'
import console from 'console'

router.beforeEach(function (to, from ,next ) {
    console.log("路由路由before")
    alert("路由")
    // if(!user.getToken()){
    //     return next({path: '/login'})
    // }
    next();
})
//
// router.beforeEach((to, from ,next ) =>{
//     console.log("路由路由before")
//     alert("路由")
//     next();
// })

export default function () {
    return router
}