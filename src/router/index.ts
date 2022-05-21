import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import LoginLayouts from "@/layouts/LoginLayouts.vue";
import MainLayouts from "@/layouts/MainLayouts.vue";
import HomePage from "@/views/HomePage.vue";
import {useCookies} from "vue3-cookies";

const { cookies } = useCookies();

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
    path: '/homepage',
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


router.beforeEach((to, from, next) => {
  const accessToken = cookies.get("accessToken");
  if (accessToken === null && to.path !== '/login') {
    next("login");
  } else if (accessToken && to.path !== '/homepage' ) {
    next("homepage");
  } else {
    next();
  }
});

export default router
