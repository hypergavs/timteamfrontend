import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router'
import Vuex from 'vuex';



Vue.use(VueRouter);
Vue.use(Vuex);


import {routes} from './routes.js';
import {store} from './store.js';



import VueSweetalert2 from 'vue-sweetalert2';
 
// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';
 
Vue.use(VueSweetalert2);

window.swal = Vue.swal;



const router = new VueRouter({
  routes,
  mode: 'history'
});


Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
