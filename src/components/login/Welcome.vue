<template>
  <div class="loginLayouts__wrapper">
    <div class="loginLayouts__container">
      <div class="loginLayouts__title">Вход в Игру Бога</div>
      <div class="loginLayouts__btn signIn__btn" @click="sign_in">Войти</div>
      <div class="loginLayouts__btn signOut__btn" @click="sign_out">Зарегистрироваться</div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useRouter} from "vue-router";

export default defineComponent ({
  setup() {
    const router = useRouter();

    const sign_in = () => {
      router.push({
        name: 'login'
      })
    };
    const sign_out = () => {
      router.push({
        name: 'register'
      })
    };
    return {
      sign_in,
      sign_out,
    }
  },
})

</script>

<style lang="scss">
@import "@/assets/styles/layouts/login_layouts";

</style>