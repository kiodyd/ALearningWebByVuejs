import Vue from 'vue'
import axios from 'axios'
import { Message } from 'element-ui';

const http = axios.create({
  baseURL: 'http://localhost:3000/web/api'
})

Vue.prototype.$http = http

http.interceptors.request.use(config => {
  if(localStorage.token) {
      config.headers.Authorization = 'Bearer ' + localStorage.token
  }
  return config
}, err => {
  return Promise.reject(err)
});

http.interceptors.response.use(res => {
  return res;
}, err => {
   if(err.response.data.message) {
       Message.error(err.response.data.message)
   }
  return Promise.reject(err)
})