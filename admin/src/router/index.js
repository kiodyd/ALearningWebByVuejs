import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Login from '../views/olds/Login.vue'

import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'

import NewsEdit from '../views/NewsEdit.vue'
import NewsList from '../views/NewsList.vue'

import AdEdit from '../views/olds/AdEdit.vue'
import AdList from '../views/olds/AdList.vue'

import AdminUserEdit from '../views/AdminUserEdit.vue'
import AdminUserList from '../views/AdminUserList.vue'

import CourseEdit from '../views/CourseEdit.vue'
import CourseList from '../views/CourseList.vue'

import Chapter from '../views/Chapter.vue'

import UserList from '../views/UserList.vue'
import UserEdit from '../views/UserEdit.vue'

import ExamList from '../views/ExamList.vue'
import ExamEdit from '../views/ExamEdit.vue'

import ExamRecordList from '../views/ExamRecordList.vue'
import ExamRecordEdit from '../views/ExamRecordEdit.vue'

import CertificateList from '../views/CertificateList.vue'
import CertificateEdit from '../views/CertificateEdit.vue'

import IssueList from '../views/IssueList.vue'

import MessageList from '../views/MessageList.vue'
import MessageEdit from '../views/MessageEdit.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/login', name: 'login', component: Login, meta: {isPublic: true}},

  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      { path: '/categories/create', component: CategoryEdit },
      { path: '/categories/edit/:id', component: CategoryEdit, props: true },
      { path: '/categories/list', component: CategoryList },

      { path: '/news/create', component: NewsEdit },
      { path: '/news/edit/:id', component: NewsEdit, props: true },
      { path: '/news/list', component: NewsList },

      { path: '/ads/create', component: AdEdit },
      { path: '/ads/edit/:id', component: AdEdit, props: true },
      { path: '/ads/list', component: AdList },

      { path: '/admin_users/create', component: AdminUserEdit },
      { path: '/admin_users/edit/:id', component: AdminUserEdit, props: true },
      { path: '/admin_users/list', component: AdminUserList },

      { path: '/courses/create', component: CourseEdit },
      { path: '/courses/edit/:id', component: CourseEdit, props: true },
      { path: '/courses/list', component: CourseList },

      { path: '/chapters/:id', component: Chapter, props: true },

      { path: '/users/list', component: UserList},
      { path: '/users/create', component: UserEdit },

      { path: '/exams/create', component: ExamEdit },
      { path: '/exams/edit/:id', component: ExamEdit, props: true },
      { path: '/exams/list', component: ExamList },

      { path: '/exam_records/edit/:id', component: ExamRecordEdit, props: true },
      { path: '/exam_records/list', component: ExamRecordList },

      { path: '/certificates/list', component: CertificateList },
      { path: '/certificates/create', component: CertificateEdit },
      { path: '/certificates/edit/:id', component: CertificateEdit, props: true },
    
      { path: '/issues/list', component: IssueList },

      { path: '/messages/edit/:id', component: MessageEdit, props: true },
      { path: '/messages/list', component: MessageList },
    ]
  },
  
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next) => {
  if(!to.meta.isPublic && !localStorage.token) {
    return next('/login')
  } 
  next()
})

export default router
