<template>
  <div class="homePage__wrapper">
    <div class="homePage__container">
      <div class="number_points">Очков: {{count}}</div>
      <router-view :all_questions="all_questions"
                   @edit_questions="edit_questions_handler"
                   @incorrect_answer="incorrect_answer_handler"
                   @correct_answer="correct_answer_handler"
                   :random_question="random_question"
                   :count="count"
                   v-if="all_questions.length !== 0"
      ></router-view>
      <GameOver v-else></GameOver>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, reactive, Ref, ref} from 'vue';
import {iQuestion} from "@/domain/interfaces/question_intefaces";
import {iCategory} from "@/domain/interfaces/category_interfaces";
import {iUser} from "@/domain/interfaces/users_intefaces";
import {UseHomepageHooks} from "@/domain/hooks/honepage_hooks";
import GameOver from "@/components/main/GameOver.vue";

export default defineComponent({
  components: {GameOver},
  setup() {
    let all_questions:Ref<Array<iQuestion>> = ref([]);
    let all_categories:Ref<Array<iCategory>> = ref([]);
    let all_users:Ref<Array<iUser>> = ref([]);

    const {get_all_questions, get_all_categories, get_all_users} = UseHomepageHooks();

    const random_question:any = computed(() => {
      let random_question = all_questions.value[Math.floor(Math.random()*all_questions.value.length)]
      return random_question
    });

    const edit_questions_handler = () => {
      if (all_questions.value) {
        all_questions.value = all_questions.value.filter((i:any) => i.id !== random_question.value.id)
      }
    };

    const count = ref(0);

    const incorrect_answer_handler = () => {
      count.value = count.value - 100
    };
    const correct_answer_handler = () => {
      count.value = count.value + 10
    };

    onMounted(async () => {
      all_questions.value = await get_all_questions()
      all_categories.value = await get_all_categories()
      all_users.value = await get_all_users()
    });

    return {
      edit_questions_handler,
      get_all_questions,
      get_all_categories,
      get_all_users,
      all_questions,
      all_categories,
      all_users,
      random_question,
      count,
      incorrect_answer_handler,
      correct_answer_handler,
    }
  },
});
</script>
<style lang="scss">
@import "@/assets/styles/home_page/home_page";

</style>