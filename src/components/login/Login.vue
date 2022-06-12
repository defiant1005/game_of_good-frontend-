<template>
  <div class="login__wrapper">
    <form class="login__form-container">
      <el-input v-model="user.user_name" type="text" placeholder="Логин" autocomplete="off"/>
      <el-input v-model="user.user_password" type="password" autocomplete="off" show-password placeholder="Пароль"/>
      <button @click.prevent="submit_form" class="login__form-submit">Войти</button>
    </form>
  </div>
</template>

<script lang="ts">
import {defineComponent, inject, onMounted, reactive} from 'vue';
import {useRouter} from "vue-router";
import {IJWTNetworkDriver} from "@/domain/drivers/IJWTNetworkDriver";
import {IAccountRepository} from "@/domain/repositories/abstracts/AccountRepository.types";
import {ElMessage} from "element-plus";
import {useCookies} from "vue3-cookies";

export default defineComponent({
  setup() {
    const { cookies } = useCookies();

    const router = useRouter();
    const networkDriver = inject('networkDriver') as IJWTNetworkDriver;
    const accountRepository = inject('accountRepository') as IAccountRepository;

    const user = reactive({
      user_name: '',
      user_password: '',
    });

    onMounted(() => {
      let username = cookies.get('user_name')
      if (typeof username !== 'undefined') {
        user.user_name = username
      }
    })
    const submit_form = async() => {
      if (user.user_name && user.user_password) {
        try {
          const tokens = await accountRepository.login(user.user_name, user.user_password)
          networkDriver.signIn(tokens.access, tokens.refresh)
          cookies.set('user_name', user.user_name)
          await router.push({
            path: '/start'
          })
        } catch (e) {
          // if (typeof e.response.status !=='undefined' && e.response.status === 401) {
          //   ElMessage({
          //     showClose: true,
          //     message: 'Неверный логин или пароль',
          //     type: 'error',
          //   })
          // } else {
            ElMessage({
              showClose: true,
              message: 'Неизвестная ошибка. Обратитесь к администратору.',
              type: 'error',
            })
            console.log(e)
          }
        // }
      } else {
        ElMessage({
          showClose: true,
          message: 'Введите логин и пароль',
          type: 'error',
        })
      }
    }


    return {
      user,
      submit_form,
      networkDriver,
      accountRepository,
    }
  },
});
</script>




<style lang="scss">
@import "@/assets/styles/login_page/login_page.scss";

</style>