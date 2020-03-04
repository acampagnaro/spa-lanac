import Vue from 'vue'
import App from './App.vue'

import axios from 'axios'

import {
  BootstrapVue,
  IconsPlugin
} from 'bootstrap-vue'

Vue.prototype.$http = axios.create({
  baseURL: process.env.VUE_APP_URL
})

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

new Vue({
  render: h => h(App),
}).$mount('#app')
