import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import LoginLayouts from "@/layouts/LoginLayouts.vue";
import MainLayouts from "@/layouts/MainLayouts.vue";
import HomePage from "@/views/HomePage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    meta: {
      title: 'Авторизация',
      layout: LoginLayouts
    }
  },
  {
    path: '/',
    name: 'homepage',
    component: HomePage,
    meta: {
      title: 'Игра Бога',
      layout: MainLayouts
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
