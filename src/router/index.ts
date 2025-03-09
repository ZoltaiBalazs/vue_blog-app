import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CategoryView from '@/views/CategoryView.vue'
import PostView from '@/views/PostView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import DashboardView from '@/views/DashboardView.vue'
import CreatePost from '@/views/CreatePost.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/category/:id', name: 'category', component: CategoryView },
  { path: '/post/:id', name: 'post', component: PostView },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/register', name: 'register', component: RegisterView },
  { path: '/dashboard', name: 'dashboard', component: DashboardView },
  { path: '/create-post', name: 'create-post', component: CreatePost },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
