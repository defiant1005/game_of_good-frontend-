<template>
  <div class="game__wrapper">
    <Questions :rand_question="rand_question" @pass_answer="pass_answer_handler"/>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, reactive, Ref, toRefs} from "vue";
import { ElMessage } from 'element-plus'

import {iQuestion} from "@/domain/interfaces/question_intefaces";
import Questions from "@/components/main/Questions.vue";
import {getRandomInt} from "@/domain/hooks/get_andom";

export default defineComponent ({
  props: {
    all_questions: {
      required: true
    },
    random_question: {
      required: true
    },
  },
  setup(props, context) {
    const { all_questions } = toRefs(props);
    const questions:any = all_questions;

    const { random_question } = toRefs(props);
    const rand_question:any = random_question;


    const pass_answer_handler = (data:string) => {
      if (data === rand_question.value.correct_answer) {
        context.emit('correct_answer')
        ElMessage({
          showClose: true,
          message: 'Верно',
          type: 'success',
        })
      } else {
        context.emit('incorrect_answer')
        ElMessage({
          showClose: true,
          message: 'Неверно',
          type: 'error',
        })
      }
      context.emit('edit_questions', random_question)
      random_question.value = questions.value[Math.floor(Math.random()*questions.value.length)]
    }

    return {
      questions,
      pass_answer_handler,
      rand_question,
    }
  },
  components: {
    Questions,
  },
})
</script>

<style lang="scss">
@import "@/assets/styles/main/game";

</style>