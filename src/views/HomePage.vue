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
      ></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, Ref, ref} from 'vue';
import {iQuestion} from "@/domain/interfaces/question_intefaces";
import {iCategory} from "@/domain/interfaces/category_interfaces";
import {iUser} from "@/domain/interfaces/users_intefaces";
import {UseHomepageHooks} from "@/domain/hooks/homepage_hooks";
import router from "@/router";
import store from "@/store/modules/question.store";

export default defineComponent({
  setup() {
    // const all_questions = computed(() => store.getters.get_question)
    // const all_categories = computed(() => store.getters.get_question)
    // const all_users = computed(() => store.getters.get_question)

    let all_questions:Ref<Array<iQuestion>> = ref([]);
    let all_categories:Ref<Array<iCategory>> = ref([]);
    let all_users:Ref<Array<iUser>> = ref([]);

    const {get_all_questions, get_all_categories, get_all_users} = UseHomepageHooks();

    const random_question:any = computed(() => {
      let random_question = all_questions.value[Math.floor(Math.random()*all_questions.value.length)]
      return random_question
    });

    const edit_questions_handler = () => {
      if (all_questions.value.length !== 1) {
        all_questions.value = all_questions.value.filter((i:any) => i.id !== random_question.value.id)
      } else {
        router.push({
          path: 'main/game-over'
        })
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