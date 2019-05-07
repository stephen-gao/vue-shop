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
                    console.log("登录返回")
                    console.log(response)
                    if(response.code === 10000){
                        var data = response.data
                        user.setToken(data.token)
                        router.push('/')
                    }else {
                        alert(response.message)
                    }
                })
            }
        }
    }
</script>
