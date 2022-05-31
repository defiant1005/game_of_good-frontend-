<template>
  <div class="homePage__main">
    <div class="homePage__container-title" @click="goToGame">Начать игру</div>
  </div>
</template>

<script lang="ts">
import {defineComponent, inject} from "vue";
import {useRouter} from "vue-router";

export default defineComponent ({
  setup() {
    const router = useRouter();
    const goToGame = () => {
      router.push({
        path: '/game'
      })
    }
    return {
      goToGame,
    }
  }
})
</script>

