import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import auth from './common/auth'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  auth,
  store,
  render: h => h(App)
}).$mount('#app')
