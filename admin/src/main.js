import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import './plugins/http.js'
import './plugins/ant-design-vue.js'
import './plugins/vue-plyr.js'
import router from './router'
import './style.css'


Vue.config.productionTip = false


Vue.mixin({
  computed: {
    uploadUrl() {
      return this.$http.defaults.baseURL + '/upload'
    }

  },
  methods: {
    getAuthHeaders() {
      return {
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
