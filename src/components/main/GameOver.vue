<template>
  <div class="gameOver__wrapper">
    <div class="gameOver__container">
      <div>Игра окончена</div>
      <el-button type="primary" @click="goHome">Вернуться на главную страниу</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {useRouter} from "vue-router";

export default defineComponent ({
  setup() {
    const router = useRouter();
    const goHome = () => {
      router.push({
        name: 'main'
      })
    }
    return {
      goHome
    }
  }
})
</script>

<style lang="scss">
@import "@/assets/styles/main/game_over";

</style>