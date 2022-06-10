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
import NotFound from "@/components/NotFound.vue";

const { cookies } = useCookies();

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'home',
    component: Welcome,
    meta: {
      title: 'Добро пожаловать',
      layout: LoginLayouts,
      isLoginPage: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: 'Авторизация',
      layout: LoginLayouts,
      isLoginPage: true,
    },
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      title: 'Регистрация',
      layout: LoginLayouts,
      isLoginPage: true,
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
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const accessToken = cookies.get("accessToken");
  const refreshToken = cookies.get("refreshToken");

  if (!accessToken && !refreshToken && !to.meta.isLoginPage) {
    next('home')
  } else if (accessToken && to.meta.isLoginPage) {
    next('/main')
  } else if (to.name === 'NotFound') {
    next('/main')
  } else {
    next()
  }
});

export default router
