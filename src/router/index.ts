import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'
import LoginLayouts from "@/layouts/LoginLayouts.vue";
import MainLayouts from "@/layouts/MainLayouts.vue";
import HomePage from "@/views/HomePage.vue";
import {useCookies} from "vue3-cookies";
import Login from "@/components/login/Login.vue";
import Register from "@/components/login/Register.vue";
import Welcome from "@/components/login/Welcome.vue";
import StartGame from "@/components/main/StartGame.vue";
import Game from "@/components/main/Game.vue";

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
    },
    children: [
      {
        path: '/start',
        component: StartGame
      },
      {
        path: '/game',
        component: Game
      },
    ],
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const accessToken = cookies.get("accessToken");
  if (accessToken === null && to.path !=='' && to.path !=='/' &&  to.path !=='/login' &&  to.path !=='/register') {
    next("");
  } else if (accessToken && (to.path ==='/' || to.path ==='' || to.path ==='/' || to.path ==='/login' || to.path ==='/register')) {
    next("main/start");
  } else {
    next();
  }
});

export default router
