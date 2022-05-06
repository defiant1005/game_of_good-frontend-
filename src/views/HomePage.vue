<template>
  <div class="homePage__wrapper">
    <div style="display:flex; flex-direction: column; margin-bottom: 20px" v-for="post in get_questions" :key="post.id">
      <div style="border: 1px solid gray">{{post.title}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted} from 'vue';
import {mapActions, mapGetters} from "vuex";

export default defineComponent({
  methods: {
    ...mapActions({
      GET_FEEDBACKS_FROM_API:'GET_FEEDBACKS_FROM_API',
    })
  },
  computed: {
    ...mapGetters({
      get_questions: 'get_questions',
    })
  },
  mounted() {
    this.GET_FEEDBACKS_FROM_API()
  }
});
</script>
<style lang="scss">
@import "@/assets/styles/home_page/home_page";

</style>