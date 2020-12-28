import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import vuetify from './plugins/vuetify'
import router from './router'
import Cookies from 'js-cookie'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)

axios.interceptors.request.use(function (config) {

  config.headers.Authorization =  Cookies.get('Token');

  return config;
});

axios.interceptors.response.use(null, error => {
  let path = '/error';
  console.log(error.response.status)
  switch (error.response.status) {
    case 403:

      path = '/';
    break;
  }
  router.push(path);
  return Promise.reject(error);
});


new Vue({
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app')
