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
import {defineComponent, inject, reactive} from 'vue';
import {useRouter} from "vue-router";
import {IJWTNetworkDriver} from "@/domain/drivers/IJWTNetworkDriver";
import {IAccountRepository} from "@/domain/repositories/abstracts/AccountRepository.types";
import {ElMessage} from "element-plus";

export default defineComponent({
  setup() {
    const router = useRouter();
    const networkDriver = inject('networkDriver') as IJWTNetworkDriver;
    const accountRepository = inject('accountRepository') as IAccountRepository;

    const user = reactive({
      user_name: '',
      user_password: '',
    });

    const submit_form = async() => {
        try {
          const tokens = await accountRepository.login(user.user_name, user.user_password)
          networkDriver.signIn(tokens.access, tokens.refresh)
          router.replace({
            name: 'homepage'
          }).then()
        } catch (e) {
          if (e.response.status === 401) {
            ElMessage({
              showClose: true,
              message: 'Неверный логин или пароль',
              type: 'error',
            })
          } else {
            ElMessage({
              showClose: true,
              message: 'Неизвестная ошибка. Обратитесь к администратору.',
              type: 'error',
            })
            console.log(e)
          }
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
@import "@/assets/styles/login_page/login_page";

</style>