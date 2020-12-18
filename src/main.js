import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import vuetify from './plugins/vuetify'
import router from './router'
import Cookie from "cookielib";
// import cookies from 'js-cookie'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)


new Vue({
  router,
  vuetify,
  render: h => h(App),
  watch: {
    '$route': function() {
    // '$route': function(from, to) {
    //   axios.defaults.headers.common['Authorization'] = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTYwODA1MjYxMCwiZXhwIjoxNjA4NjU3NDkwfQ._zra_u4YjP6oBXrgk4MpTHzVvtVMaj7MUyv8wGGwSWQ';
      axios.defaults.headers.common['Authorization'] = Cookie.getCookie('Token');
    }
  },
  created () {
    // axios.defaults.headers.common['Authorization'] = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTYwODA1MjYxMCwiZXhwIjoxNjA4NjU3NDkwfQ._zra_u4YjP6oBXrgk4MpTHzVvtVMaj7MUyv8wGGwSWQ';
    axios.defaults.headers.common['Authorization'] = Cookie.getCookie('Token');
  }
}).$mount('#app')
