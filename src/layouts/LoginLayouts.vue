<template>
  <div class="loginLayouts__wrapper">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent ({
  components: {
  }
})
</script>

<style lang="scss">
@import "@/assets/styles/layouts/login_layouts";

</style>