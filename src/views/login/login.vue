<template>
    <div class="login">
        <h1>登录</h1>
        <div>
            <input v-model="reqData.username" id="username" /><br>
            <input v-model="reqData.password" id="password"/><br>
            <button @click="login()">提交</button>
        </div>
    </div>
</template>
<script>
    import login from '@/api/login'
    import console from 'console'
    import user from '@/store/user'
    import router from '@/router'
    import { Message } from 'element-ui'
    export default{
        data() {
            return {
                reqData: {
                    username: '',
                    password: ''
                }
            }
        },
        methods: {
            login() {
                console.log(this.reqData)
                login.login(this.reqData).then(response =>{
                    console.debug("登录返回")
                    console.debug(response)
                    if(response.code === 10000){
                        Message({
                            showClose: true,
                            message: '登录成功',
                            type: 'success'
                        })
                        let data = response.data
                        user.setToken(data.token)
                        router.push('/')
                    }else {
                        Message({
                            showClose: true,
                            message: response.message,
                            type: 'error'
                        })
                    }
                })
            }
        }
    }
</script>
