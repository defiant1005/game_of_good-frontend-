import {createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw} from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import LoginLayouts from "@/layouts/LoginLayouts.vue";
import MainLayouts from "@/layouts/MainLayouts.vue";
import HomePage from "@/views/HomePage.vue";
import {useCookies} from "vue3-cookies";
import Login from "@/components/login/Login.vue";
import Register from "@/components/login/Register.vue";
import Welcome from "@/components/login/Welcome.vue";

const { cookies } = useCookies();

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Welcome,
    meta: {
      title: 'Добро пожаловать',
      layout: LoginLayouts
    },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: 'Авторизация',
      layout: LoginLayouts
    },
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      title: 'Регистрация',
      layout: LoginLayouts
    },
  },
  {
    path: '/main',
    name: 'main',
    component: HomePage,
    meta: {
      title: 'Игра Бога',
      layout: MainLayouts
    }
  }
]

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next) => {
  const accessToken = cookies.get("accessToken");
  if (accessToken === null && to.path !=='' && to.path !=='/' &&  to.path !=='/login' &&  to.path !=='/register') {
    next("");
  } else if (accessToken && to.path !=='/main') {
    next("main");
  } else {
    next();
  }
});

export default router
