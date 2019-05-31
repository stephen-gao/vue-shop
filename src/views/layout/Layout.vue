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
                        <span >喵喵喵</span>
                        <el-dropdown class="head-set">
                            <i class="el-icon-setting head-set-icon"></i>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item divided>
                                    <span @click="logout" style="display:block;">LogOut</span>
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
    import console from 'console'
    import ElContainer from "../../../node_modules/element-ui/packages/container/src/main";
    import ElRow from "element-ui/packages/row/src/row";
    import ElAside from "../../../node_modules/element-ui/packages/aside/src/main";
    import ElMain from "../../../node_modules/element-ui/packages/main/src/main";
    import ElHeader from "../../../node_modules/element-ui/packages/header/src/main";
    import ElCol from "element-ui/packages/col/src/col";
    import ElDropdownMenu from "../../../node_modules/element-ui/packages/dropdown/src/dropdown-menu";
    import ElDropdownItem from "../../../node_modules/element-ui/packages/dropdown/src/dropdown-item";
    import ElDropdown from "../../../node_modules/element-ui/packages/dropdown/src/dropdown";
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
                isCollapse: true
            }
        },
        methods:{
            logout (){
                console.log("退出")
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
    .head-set-icon{
        font-size: 16px;
        color: #d3dce6;
    }
    .app-main{
        flex:1;
        overflow-y: auto;
        /*padding: 20px;*/
    }

</style>