<template>
  <div class="game__question-title">{{this_question.title}}</div>
  <div class="game__questions-container">
    <div class="questions__container">
      <div class="game__questions-answer" @click="choosing_answer(this_question[this_question_keys[0]])">{{this_question[this_question_keys[0]]}}</div>
      <div class="game__questions-answer" @click="choosing_answer(this_question[this_question_keys[1]])">{{this_question[this_question_keys[1]]}}</div>
    </div>
    <div class="questions__container questions__container-bottom">
      <div class="game__questions-answer" @click="choosing_answer(this_question[this_question_keys[2]])">{{this_question[[this_question_keys[2]]]}}</div>
      <div class="game__questions-answer" @click="choosing_answer(this_question[this_question_keys[3]])">{{this_question[this_question_keys[3]]}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref, Ref, toRefs} from "vue";
import { ElMessage } from 'element-plus'

import {iQuestion} from "@/domain/interfaces/question_intefaces";

export default defineComponent ({
  props: {
    rand_question: {
      required: true
    }
  },
  emits: ['pass_answer'],
  setup(props, context) {
    const { rand_question } = toRefs(props);
    const this_question:any = rand_question;
    const this_question_keys = ref(['incorrect_answer1', 'incorrect_answer2', 'incorrect_answer3', 'correct_answer'])

    onMounted(() => {
      this_question_keys.value.sort(()=>Math.random()-0.5)
    })

    const choosing_answer = (data:string) => {
      this_question_keys.value.sort(()=>Math.random()-0.5)
      context.emit('pass_answer', data)
    }

    return {
      choosing_answer,
      this_question,
      this_question_keys,
    }
  },
})
</script>
