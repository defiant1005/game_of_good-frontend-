import {createStore} from 'vuex'
import questionStore from '@/store/modules/question.store.ts'


const BASE_URL = process.env.VUE_APP_API_BASE_URL || 'http://127.0.0.1:8080'


export default createStore({
    state: {
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