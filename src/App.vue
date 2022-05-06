<template>
  <component :is="this.$route.meta.layout || this.defaultLayout"/>
</template>

<script lang="ts">
import LoginLayouts from "@/layouts/LoginLayouts.vue";
import {defineComponent} from "vue";
import {mapActions} from "vuex";

export default defineComponent({
  methods:{
    ...mapActions({
      refreshTokenAvalible: 'refreshTokenAvalible',
      refreshTokens: 'refreshTokens',
      logout:'logout'
    })
  },
  computed: {
    defaultLayout() {
      return LoginLayouts
    }
  },
  components: {
    LoginLayouts
  },
})
</script>

<style lang="scss">
@import "assets/styles/global_styles/normalize";

</style>