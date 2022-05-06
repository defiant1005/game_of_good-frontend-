<template>
  <div class="loginPage__wrapper">
    <form class="loginPage__form-container">
      <input placeholder="Логин" v-model="user.user_name" class="loginPage__form-input"/>
      <input placeholder="Пароль" v-model="user.user_password" class="loginPage__form-input"/>
      <button @click.prevent="submit_form" class="loginPage__form-submit">Войти</button>
    </form>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, reactive} from 'vue';
import {useCookies} from "vue3-cookies";
import {ElMessage} from "element-plus";
import router from "@/router";
import axios from "axios";
import {BASE_URL} from "@/store";
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const { cookies } = useCookies();
    const store = useStore()

    let user = reactive({
      user_name: '',
      user_password: '',
    })
    const submit_form = () => {
      if (user.user_name && user.user_password) {
        store.dispatch('loginUser', user)
      } else {
        ElMessage({
          showClose: true,
          message: 'Заполните обязательные поля.',
          type: 'error',
        })
      }
    }
    return {
      user,
      submit_form
    }
  },
});
</script>




<style lang="scss">
@import "@/assets/styles/login_page/login_page";

</style>