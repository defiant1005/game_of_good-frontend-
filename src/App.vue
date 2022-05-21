<template>
  <component :is="this.$route.meta.layout || this.defaultLayout"/>
</template>

<script lang="ts">
import LoginLayouts from "@/layouts/LoginLayouts.vue";
import {defineComponent} from "vue";
import {AxiosNetworkDriver} from "@/domain/drivers/AxiosNetworkDriver";
import {NetworkAccountRepository} from "@/domain/repositories/NetworkAccountRepository";
import {BASE_URL} from "@/store";

export default defineComponent({
  provide: () => {
    const networkDriver = new AxiosNetworkDriver(BASE_URL);
    const accountRepository = new NetworkAccountRepository(networkDriver);
    return {
      networkDriver: networkDriver,
      accountRepository: accountRepository,
    }
  },
  computed: {
    defaultLayout() {
      return LoginLayouts
    },
  },
  components: {
    LoginLayouts
  },
})
</script>

<style lang="scss">
@import "assets/styles/global_styles/normalize";

</style>