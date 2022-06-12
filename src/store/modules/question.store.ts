import axios from 'axios';
import {inject} from "vue";
import {IAccountRepository} from "@/domain/repositories/abstracts/AccountRepository.types";
import {AxiosNetworkDriver} from "@/domain/drivers/AxiosNetworkDriver";
import {BASE_URL} from "@/store";
import {NetworkAccountRepository} from "@/domain/repositories/NetworkAccountRepository";
const networkDriver = new AxiosNetworkDriver('https://game-of-god.herokuapp.com/');
const accountRepository = new NetworkAccountRepository(networkDriver);
const store = {
    state: {
        questions: [],
        all_categories: [],
        all_users: []
    },
    getters: {
        get_question(state:any) {
            return state.questions
        },
        get_categories(state:any) {
            return state.all_categories
        },
        get_users(state:any) {
            return state.all_users
        },
    },
    mutations: {
        set_questions: (state:any, questions:any) => {
            state.questions = questions
        },
        set_categories: (state:any, all_categories:any) => {
            state.all_categories = all_categories
        },
        set_users: (state:any, all_users:any) => {
            state.all_users = all_users
        },
    },
    actions: {
        GET_QUESTIONS_FROM_API({commit}:any) {
            return accountRepository.get_questions()
                .then((response) => {
                    commit('set_questions', response.data)
                })
        },
        GET_CATEGORIES_FROM_API({commit}:any) {
            return accountRepository.get_categories()
                .then((response) => {
                    commit('set_categories', response.data)
                })
        },
        GET_USERS_FROM_API({commit}:any) {
            return accountRepository.get_users()
                .then((response) => {
                    commit('all_users', response.data)
                })
        },
    },
}


export default store