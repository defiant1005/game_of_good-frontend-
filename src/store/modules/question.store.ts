import axios from 'axios';

const store = {
    state: {
        questions: [],
    },
    getters: {
        get_questions(state:any) {
            return state.questions
        },
    },
    mutations: {
        set_questions: (state:any, questions:any) => {
            state.questions = questions
        },
    },
    actions: {
        GET_FEEDBACKS_FROM_API({commit, rootState}:any) {
            return axios(`http://127.0.0.1:8080/questions/`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${rootState.accessToken}`
                },
            })
                .then((response) => {
                    commit('set_questions', response.data)
                })
        },
    },
}


export default store