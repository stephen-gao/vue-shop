<template>
    <div class="app-container">
        <el-container>
            <el-header style="font-size: 16px;color: #d3dce6;background-color: #304156;padding-top: 15px;">
                <el-row :span="24">
                    <router-link to="/home">
                        <el-col class="head-app-name" :span="4">
                            <span>GS-SHOP</span>
                        </el-col>
                    </router-link>
                    <el-col class="head-info" :span="20">
                        <el-dropdown class="head-set">
                            <span class="el-dropdown-link head-set-font">
                                {{user.nickname}}
                                <i class="el-icon-setting el-icon--right head-set-font"></i>
                            </span>
                            <!--<i class=" head-set-icon"></i>-->
                            <!--<div >-->
                                <!--<span ></span>-->
                            <!--</div>-->
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item divided>
                                    <span @click="logout" style="display:block;">退出</span>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-col>
                </el-row>
            </el-header>
            <el-container>
                <el-aside>
                    <Menu></Menu>
                </el-aside>
                <el-main style="padding: 0px">
                    <section class="app-main">
                        <transition name="fade" mode="out-in">
                            <router-view></router-view>
                        </transition>
                    </section>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
    import Menu from "./Menu.vue"
    import ElContainer from "../../../node_modules/element-ui/packages/container/src/main";
    import ElRow from "element-ui/packages/row/src/row";
    import ElAside from "../../../node_modules/element-ui/packages/aside/src/main";
    import ElMain from "../../../node_modules/element-ui/packages/main/src/main";
    import ElHeader from "../../../node_modules/element-ui/packages/header/src/main";
    import ElCol from "element-ui/packages/col/src/col";
    import ElDropdownMenu from "../../../node_modules/element-ui/packages/dropdown/src/dropdown-menu";
    import ElDropdownItem from "../../../node_modules/element-ui/packages/dropdown/src/dropdown-item";
    import ElDropdown from "../../../node_modules/element-ui/packages/dropdown/src/dropdown";
    import storeUtil from '@/common/storeUtil'
    import login from '@/api/login'
    import router from '@/router'
    export default{
        components:{
            ElDropdown,
            ElDropdownItem,
            ElDropdownMenu,
            ElCol,
            ElHeader,
            ElMain,
            ElAside,
            ElRow,
            ElContainer,
            Menu },
        data() {
            return {
                isCollapse: true,
                user: this.$store.getters.user
            }
        },
        created() {
            storeUtil.refreshRoles();
            storeUtil.refreshSysDic();
        },
        methods:{
            logout (){
                login.logout(this.reqData).then(response => {
                    this.logining = false;
                    if (response.code === 10000) {
                        this.$message({
                            showClose: true,
                            message: '退出成功',
                            type: 'success'
                        })
                        this.$store.commit('removeToken');
                        this.$store.commit('removeUser');
                        this.$store.commit('removeMenu');
                        router.push('/login')
                    } else {
                        this.$message({
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
<style>
    .app-container {
    @include clearfix;
        position: relative;
        height: 100%;
        width: 100%;
    }
    .main-container{
        margin-left: 10px;
    }

    .el-container {
        height: 100%;
    }
    .head-app-name{
        text-align: left;
        font-size: 2em;
        color: darkturquoise;
        padding-left: 20px;
    }
    .head-info{
        text-align: right;
        font-size: 16px;
        color: #d3dce6
    }
    .head-set{
        margin-left: 15px;
        margin-right: 30px;
    }
    .head-set-font{
        font-size: 18px;
        color: #d3dce6;
    }
    .app-main{
        flex:1;
        overflow-y: auto;
        height: 100%;
        /*padding: 20px;*/
    }

</style>