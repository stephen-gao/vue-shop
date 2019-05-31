import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: null,
        user: {}
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
        }
    }
})
