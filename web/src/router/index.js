import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Index from '../views/Index.vue'
import PersonalPage from '../views/PersonalPage.vue'
import Exam from '../views/Exam.vue'
import ExamXQ from '../views/ExamXQ.vue'
import ExamKS from '../views/ExamKS.vue'
import Course from '../views/Course.vue'
import CourseXQ from '../views/CourseXQ.vue'
import CourseStudy from '../views/CourseStudy.vue'
import News from '../views/News.vue'
import NewsXQ from '../views/NewsXQ.vue'
import Search from '../views/Search.vue'

import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      {path: '/', component: Index},
      {path: '/exams', component: Exam},
      {path: '/exams/:id', component: ExamXQ, props: true},
      {path: '/exams/:id/tasks', component: ExamKS, props: true},
      {path: '/courses', component: Course},
      {path: '/courses/:id', component: CourseXQ, props: true},
      {path: '/courses/:id/tasks', component: CourseStudy, props: true},
      {path: '/users', component: PersonalPage},
      {path: '/news', component: News},
      {path: '/news/:id', component: NewsXQ, props: true},
      {path: '/search/:word', component: Search, props: true}
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
]

const router = new VueRouter({
  routes
})

export default router
