<template>
    <scrollbar>
        <div class="menu-contaner">
            <el-menu default-active="01"
                     background-color="#304156"
                     text-color="#fff"
                     active-text-color="#ffd04b">

                <template v-for="item in menus">
                    <router-link v-if="item.children.length===0" :to="item.path" :key="item.id">
                        <el-menu-item :index="item.id" :key="item.id">
                            <i class="menu-icon" :class="'el-icon-'+item.icon"></i>
                            <span class="menu-text" slot="title">{{item.name}}</span>
                        </el-menu-item>
                    </router-link>

                    <el-submenu v-if="item.children.length > 0" :index="item.id" :key="item.path">
                        <template slot="title">
                            <i class="menu-icon" :class="'el-icon-'+item.icon"></i>
                            <span class="menu-text" slot="title">{{item.name}}</span>
                        </template>
                        <template v-for="child in item.children">
                            <router-link v-if="!child.hidden&&!child.children" :to="child.path" :key="child.id">
                                <el-menu-item :index="child.id" :key="child.id">
                                    <i class="sub-menu-icon" :class="'el-icon-'+child.icon"></i>
                                    <span class="sub-menu-text" slot="title">{{child.name}}</span>
                                </el-menu-item>
                            </router-link>
                        </template>
                    </el-submenu>
                </template>
            </el-menu>
        </div>
    </scrollbar>
</template>

<script>
    import scrollbar from '../../components/scrollbar/Scrollbar.vue'
    import ElSubmenu from "../../../node_modules/element-ui/packages/menu/src/submenu";


    export default{
        components: {
            ElSubmenu,
            scrollbar },
        data() {
            return {
                isCollapse: false,
                menus: this.$store.getters.menus
            }
        }
    }
</script>

<style>
    .menu-contaner{
        text-align: left;
    }
    .el-menu{
        border-right: solid 1px #304156!important;
    }
    .menu-text{
        font-size: 1.5em;
        width: 20em;
    }
    .menu-icon{
        font-size: 1.5em;
        margin-left: 30px;
        margin-right: 10px;

    }
    .sub-menu-text{
        font-size: 1.3em;
        width: 20em;
    }
    .sub-menu-icon{
        font-size: 1.3em;
        margin-left: 30px;
        margin-right: 10px;
    }
</style>