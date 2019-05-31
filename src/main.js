import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import routerUtil from './common/routerUtil'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
  router,
  routerUtil,
  store,
  render (h) { return h(App)}
}).$mount('#app');
