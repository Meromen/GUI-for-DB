// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { routes } from './routes'
import axios from 'axios'
import VueAxios from 'vue-axios'
import PrettyCheckbox from 'pretty-checkbox-vue'
import BootstrapVue from 'bootstrap-vue'
import VAnimateCss from 'v-animate-css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export const eventBus = new Vue()

Vue.use(VAnimateCss)
Vue.use(BootstrapVue)
Vue.use(PrettyCheckbox)
Vue.use(VueRouter)
Vue.use(VueAxios, axios)
const router = new VueRouter({
  routes: routes,
  mode: 'history'
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router: router
})
