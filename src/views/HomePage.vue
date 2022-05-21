<template>
  <div class="homePage__wrapper">
    <button @click="get_all_questions">Получить все вопросы</button>
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

    return {
      get_all_questions
    }
  },
});
</script>
<style lang="scss">
@import "@/assets/styles/home_page/home_page";

</style>