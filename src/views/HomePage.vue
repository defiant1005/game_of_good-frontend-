<template>
  <div class="homePage__wrapper">
    <button @click="get_all_questions" class="get__all-questions">Получить все вопросы</button>
    <button @click="get_all_categories" class="get__all-categories">Получить все категории</button>
    <button @click="get_all_users" class="get__all-users">Получить всех пользователей</button>
  </div>
</template>

<script lang="ts">
import {defineComponent, inject} from 'vue';
import {IAccountRepository} from "@/domain/repositories/abstracts/AccountRepository.types";

export default defineComponent({
  setup() {
    const accountRepository = inject('accountRepository') as IAccountRepository;

    const get_all_questions = async() => {
      try {
        const response = await accountRepository.get_questions()
        const questions = response.data
        console.log(questions)
      } catch (e) {
        console.log(e)
      }
    }
    const get_all_categories = async() => {
      try {
        const response = await accountRepository.get_categories()
        const categories = response.data
        console.log(categories)
      } catch (e) {
        console.log(e)
      }
    }
    const get_all_users = async() => {
      try {
        const response = await accountRepository.get_users()
        const users = response.data
        console.log(users)
      } catch (e) {
        console.log(e)
      }
    }

    return {
      get_all_questions,
      get_all_categories,
      get_all_users,
    }
  },
});
</script>
<style lang="scss">
@import "@/assets/styles/home_page/home_page";

</style>