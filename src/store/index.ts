import {createStore} from 'vuex'
import {useCookies} from "vue3-cookies";

const {cookies} = useCookies();

import questionStore from '@/store/modules/question.store.ts'
import jwt_decode from "jwt-decode"
import axios from 'axios'
import {ElMessage} from "element-plus";

const BASE_URL = process.env.VUE_APP_API_BASE_URL


export default createStore({
    state: {
        accessToken: cookies.get('AccessToken') ? cookies.get('AccessToken') : null,
    },
    getters: {
        isAuthenticated: state => !!state.accessToken,
        accessToken: (state) => state.accessToken,
    },
    mutations: {
        setTokens(state, tokens) {
            state.accessToken = tokens.access
            cookies.set('AccessToken', tokens.access)
            cookies.set('RefreshToken', tokens.refresh)
        },
    },
    actions: {
        loginUser({state, commit}, user) {
            return axios.post(`${BASE_URL}/api/token/`, {
                username: user.user_name,
                password: user.user_password
            }).then(res => {
                if (res.status === 200) {
                    const data = res.data
                    commit('setTokens', data)
                    ElMessage({
                        showClose: true,
                        message: 'Вы успешно авторизировались.',
                        type: 'success',
                    })
                } else {
                    ElMessage({
                        showClose: true,
                        message: 'Что-то пошло не так.',
                        type: 'warning',
                    })
                }
            }).catch(error => {
                console.log('error', error)
                ElMessage({
                    showClose: true,
                    message: `${error}`,
                    type: 'error',
                })
            })
        },
        autoRefresh({state, dispatch}, credentials) {
            const accessToken = state.accessToken
            if (accessToken) {
                const accessTokenDecode = jwt_decode(accessToken)
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const exp = accessTokenDecode.exp
                const now = Date.now() / 1000 // exp is represented in seconds since epoch
                let timeUntilRefresh = exp - now
                timeUntilRefresh -= (2 * 60) // Refresh 15 minutes before it expires
                setTimeout(() => dispatch('refreshTokens', credentials), timeUntilRefresh * 1000)
            }
        },
        async refreshTokens({commit, dispatch}) {
            alert('TRY REFRESH')
            const response = await axios.post(`${BASE_URL}/api/token/refresh/`, {
                refresh: cookies.get('RefreshToken')
            })
            commit('setTokens', response.data)
            dispatch('autoRefresh')
        },
        refresh_tokens: () => {
            return new Promise((resolve, reject) => {
                axios.post(`${BASE_URL}/api/token/refresh/`)
                    .then(response => {
                        resolve(response)
                    }).catch(error => {
                        reject(error)
                })
            })
        }
    },
    modules: {
        questionStore,
    }
})
export {BASE_URL};