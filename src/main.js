import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import axios from "axios";
import morgan from "morgan" ;

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue,axios);
Vue.use(morgan);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
