import Vue from 'vue'
import App from './App.vue'

import './assets/scss/style.scss'
import router from './router'

import VueAwesomeSwiper from 'vue-awesome-swiper'

// require styles
import 'swiper/dist/css/swiper.css'

import "./assets/css/main.css";

import './plugins/element.js'
import './plugins/http.js'
import './plugins/vue-plyr'
import './plugins/vue-audio-native'

Vue.use(VueAwesomeSwiper, /* { default global options } */)

import MRecorder from './components/MRecorder'
Vue.component('MRecorder', MRecorder)

Vue.config.productionTip = false

Vue.mixin({
  computed: {
    uploadUrl() {
      return this.$http.defaults.baseURL + '/upload'
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
