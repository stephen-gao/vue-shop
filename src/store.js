import Vue from 'vue'
import Vuex from 'vuex'
import storeUtil from '@/common/storeUtil'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: null,
        user: null,
        roles: null,
        sysDic: null,
        menus: null
    },
    mutations: {
        setToken: (state, token) => {
            state.token = token;
            sessionStorage.setItem("token", token)
        },
        removeToken: state => {
            state.token = null;
            sessionStorage.removeItem("token")
        },
        setUser: (state, user) => {
            state.user = user;
            sessionStorage.setItem("user", JSON.stringify(user))
        },
        removeUser: (state) =>{
            state.user = null;
            sessionStorage.removeItem("user")
        },
        setRoles: (state, roles) => {
            state.roles = roles
        },
        setSysDic: (state, sysDic) => {
            state.sysDic = sysDic
        },
        setMenu: (state, menus) => {
            state.menus = menus;
            sessionStorage.setItem("menus", JSON.stringify(menus))
        },
        removeMenu: (state) => {
            state.menus = null;
            sessionStorage.removeItem("menus")
        }
    },
    actions: {},
    getters: {
        token: state => {
            if (state.token) {
                return state.token
            }
            let storageToken = sessionStorage.getItem("token");
            if (storageToken) {
                state.token = storageToken;
                return state.token
            }
            return null
        },
        user: state => {
            if (state.user) {
                return state.user
            }
            let storageUser = sessionStorage.getItem("user");
            if (storageUser) {
                state.user = JSON.parse(storageUser);
                return state.user
            }
            return null
        },
        roles: state => {
            if (state.roles) {
                return state.roles
            }
            storeUtil.refreshRoles();
            return state.roles
        },
        sysDic: state => {
            if (state.sysDic) {
                return state.sysDic
            }
            storeUtil.refreshSysDic();
            return state.sysDic
        },
        menus: state => {
            if (state.menus) {
                return state.menus
            }
            let storageMenus = sessionStorage.getItem("menus");
            if (storageMenus) {
                state.menus = JSON.parse(storageMenus);
                return state.menus
            }
            return null
        }
    }
})
