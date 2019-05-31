<template>
    <el-form :model="reqData" :rules="rules" ref="reqData" label-position="left" label-width="0px" class="demo-ruleForm login-container">
        <h3 class="title">系统登录</h3>
        <el-form-item prop="username">
            <el-input type="text" v-model="reqData.username" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input type="password" v-model="reqData.password" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
        <el-form-item style="width:100%;">
            <el-button type="primary" style="width:100%;" @click.native.prevent="login" :loading="logining">登录</el-button>
        </el-form-item>
    </el-form>
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
                    username: null,
                    password: null
                },
                rules: {
                    username: [
                        { required: true, message: '请输入账号', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                    ]
                },
                checked: false,
                logining: false
            }
        },
        methods: {
            login() {
                var valided = false;
                console.log(this.reqData)
                this.$refs.reqData.validate((valid) => {
                    if (valid) {
                        valided = true;
                        console.log(valid+ ' '+valided)
                    }
                });
                console.log(valided)
                if(!valided){
                    Message({
                        showClose: true,
                        message: "账号密码不能为空",
                        type: 'error'
                    })
                    return
                }
                this.logining = true;
                login.login(this.reqData).then(response =>{
                    this.logining = false;
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
                        router.push('/home')
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
<style lang="scss" scoped>
    .login-container {
        /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
        .title {
            margin: 0px auto 40px auto;
            text-align: center;
            color: #505458;
        }
        .remember {
            margin: 0px 0px 35px 0px;
        }
    }
</style>