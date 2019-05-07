import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import auth from './common/auth'

Vue.config.productionTip = false

new Vue({
  router,
  auth,
  store,
  render: h => h(App)
}).$mount('#app')
