<template>
  <div class="game__wrapper">
    <div class="game__question-title">{{questions[0].title}}</div>
    <div class="game__questions-container">
      <div class="questions__container">
        <div class="game__questions-answer" @click="choosing_answer">{{questions[0].incorrect_answer1}}</div>
        <div class="game__questions-answer" @click="choosing_answer">{{questions[0].incorrect_answer2}}</div>
      </div>
      <div class="questions__container questions__container-bottom">
        <div class="game__questions-answer" @click="choosing_answer">{{questions[0].incorrect_answer3}}</div>
        <div class="game__questions-answer" @click="choosing_answer">{{questions[0].correct_answer}}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, Ref, toRefs} from "vue";
import { ElMessage } from 'element-plus'

import {iQuestion} from "@/domain/interfaces/question_intefaces";

export default defineComponent ({
  props: {
    all_questions: {
      required: true
    }
  },
  setup(props) {
    const { all_questions } = toRefs(props);
    const questions:any = all_questions;

    const choosing_answer = () => {
      ElMessage({
        showClose: true,
        message: 'Congrats, this is a success message.',
        type: 'success',
      })
    }

    return {
      questions,
      choosing_answer,

    }
  },
})
</script>

<style lang="scss">
@import "@/assets/styles/main/game";

</style>