<template>
  <div class="loginLayouts__wrapper">
    <MainLoginLayouts></MainLoginLayouts>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import MainLoginLayouts from "@/layouts/MainLayouts.vue";

export default defineComponent ({
  components: {
    MainLoginLayouts,
  }
})
</script>

<style lang="scss">
@import "@/assets/styles/layouts/login_layouts";

</style>