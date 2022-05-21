<template>
  <div class="header__wrapper">
    <el-popconfirm
        confirm-button-text="Да"
        cancel-button-text="Нет"
        :icon="InfoFilled"
        icon-color="#626AEF"
        title="Вы уверены, что хотите выйти?"
        @confirm="logout"
    >
      <template #reference>
        <button class="logout__btn">Выйти</button>
      </template>
    </el-popconfirm>
  </div>
</template>

<script lang="ts">
import {defineComponent, inject} from "vue";
import {IJWTNetworkDriver} from "@/domain/drivers/IJWTNetworkDriver";
import {useRouter} from "vue-router";
import { InfoFilled } from '@element-plus/icons-vue'

export default defineComponent ({
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
      logout,
      InfoFilled
    }
  },
})
</script>

<style lang="scss">
@import "@/assets/styles/header/header.scss";

</style>