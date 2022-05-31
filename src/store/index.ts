import {createStore} from 'vuex'
import questionStore from '@/store/modules/question.store.ts'
import {useCookies} from "vue3-cookies";


const BASE_URL:any = process.env.VUE_APP_API_BASE_URL
const { cookies } = useCookies();


export default createStore({
    state: {
        accessToken: cookies.get('accessToken') ? cookies.get('accessToken') : null,
    },
    getters: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
        questionStore,
    }
})
export {BASE_URL};