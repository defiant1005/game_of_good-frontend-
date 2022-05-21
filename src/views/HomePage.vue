<template>
  <div class="homePage__wrapper">
    <div>
      <button @click="logout">Выйти</button>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, inject} from 'vue';
import {IJWTNetworkDriver} from "@/domain/drivers/IJWTNetworkDriver";
import {useRouter} from "vue-router";

export default defineComponent({
  setup() {
    const networkDriver = inject('networkDriver') as IJWTNetworkDriver;
    const router = useRouter();

    const logout = async() => {
      try {
        networkDriver.signOut()
        router.replace({
          name: 'login'
        }).then()
      } catch (e) {
        console.log(e)
      }
    }

    return {
      logout
    }
  },
});
</script>
<style lang="scss">
@import "@/assets/styles/home_page/home_page";

</style>