<template>
  <div class="homePage__wrapper">
    <div class="homePage__container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, Ref, ref} from 'vue';
import {iQuestion} from "@/domain/interfaces/question_intefaces";
import {iCategory} from "@/domain/interfaces/category_interfaces";
import {iUser} from "@/domain/interfaces/users_intefaces";
import {UseHomepageHooks} from "@/domain/hooks/honepage_hooks";

export default defineComponent({
  setup() {
    let all_questions:Ref<Array<iQuestion> | null | undefined> = ref([]);
    let all_categories:Ref<Array<iCategory> | null | undefined> = ref([]);
    let all_users:Ref<Array<iUser> | null | undefined> = ref([]);

    const {get_all_questions, get_all_categories, get_all_users} = UseHomepageHooks();

    onMounted(async () => {
      all_questions.value = await get_all_questions()
      all_categories.value = await get_all_categories()
      all_users.value = await get_all_users()
    })

    return {
      get_all_questions,
      get_all_categories,
      get_all_users,
      all_questions,
      all_categories,
      all_users
    }
  },
});
</script>
<style lang="scss">
@import "@/assets/styles/home_page/home_page";

</style>