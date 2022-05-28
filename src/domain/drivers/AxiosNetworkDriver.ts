import {INetworkDriver} from "./INetworkDriver";
import axios, {AxiosInstance} from "axios";
import {IResponse} from "./IResponse";
import {cAxiosResponse} from "./AxiosResponse";
import {IJWTNetworkDriver, LoginStatus} from "@/domain/drivers/IJWTNetworkDriver";
import {useCookies} from "vue3-cookies";
import {ElMessage, ElNotification} from "element-plus";
import router from "@/router";
import {useRouter} from "vue-router";

const {cookies} = useCookies();

export class AxiosNetworkDriver implements INetworkDriver, IJWTNetworkDriver {
    status: LoginStatus;
    _axios_instance: AxiosInstance
    _accessToken: string | undefined
    _refreshToken: string | undefined
    _jwtRequestInterceptorID: number | undefined
    _jwtResponseInterceptorID: number | undefined

    constructor(baseUrl: string) {
        this.status = LoginStatus.ANONIMOUS;
        const refreshToken = cookies.get('refreshToken')

        this._axios_instance = axios.create({
            baseURL: baseUrl,
            timeout: 1000,
        })
        if (refreshToken !== null && typeof refreshToken !== 'undefined') {
            this.status = LoginStatus.IN_PROCCESS
            this.refresh(refreshToken).then(
                (data) => {
                    this.signIn(data.access, data.refresh)
                    this.status = LoginStatus.AUTHORIZATED
                }
            ).catch(
                (e) => {
                    ElNotification({
                        title: 'Success',
                        message: e,
                        type: 'error'
                    })
                    this.status = LoginStatus.ANONIMOUS
                    cookies.remove('refreshToken')
                    cookies.remove('accessToken')
                }
            )
        }
    }
    async get(url: string, params: Record<string, unknown>, headers: Record<string, string>): Promise<IResponse> {
        let counter = 0;
        const sleep = (ms:number) => new Promise(r => setTimeout(r, ms));
        while(this.status == LoginStatus.IN_PROCCESS && counter< 5){
            await sleep(200);
            counter++;
        }
        if (this.status != LoginStatus.AUTHORIZATED) {
            throw Error('Authorization Await Timeout')
        }
        const _response = await this._axios_instance.get(url, {
            params: params,
            headers: headers
        })
        const response = new cAxiosResponse(_response)
        return response;
    }
    async post(url: string, data: Record<string, unknown> = {}, headers: Record<string, string> = {}): Promise<IResponse> {
        const _response = await this._axios_instance.post(url, data, {
            headers: headers
        })
        const response = new cAxiosResponse(_response)
        return response;
    }
    _registerJWTRequestInterceptor(): any {
        this._jwtRequestInterceptorID = this._axios_instance.interceptors.request.use((config) => {
                if (config.headers == undefined) {
                    config.headers = {};
                } else {
                    config.headers.Authorization = `Bearer ${this._accessToken}`;
                }
                return config;
            }
        )
    }
    _registerJWTResponseInterceptor(): any {
        this._jwtResponseInterceptorID = this._axios_instance.interceptors.response.use(async (response) => {
                if (!(response.status == 401 || response.status == 403) || this._refreshToken === undefined) {
                    return response;
                } else {
                    const obtainsToken = await this.refresh(this._refreshToken);
                    this._accessToken = obtainsToken.access;
                    this._refreshToken = obtainsToken.refresh;
                }
            }
        )

    }
    signIn(accessToken: string, refreshToken: string): void {
        this._accessToken = accessToken;
        this._refreshToken = refreshToken;

        cookies.set('refreshToken', refreshToken)
        cookies.set('accessToken', accessToken)
        this._registerJWTRequestInterceptor();
        this._registerJWTResponseInterceptor();
    }
    async register(register_data:any) {
        const router = useRouter();

        const data = {
            username: register_data.username,
            password: register_data.password,
            // email: register_data.email,
        }
        try {
            const response:any = await this._axios_instance.post('auth/users/', data)
            return response
        } catch (e) {
            return e
            // console.log(e)
            // const errors:any = Object.values(e.response.data)[0]
            // errors.forEach((i:any) => {
            //     ElMessage({
            //         showClose: true,
            //         message: `${i}`,
            //         type: 'error',
            //     })
            // })
        }
    }
    signOut(): void {
        this._accessToken = undefined;
        this._refreshToken = undefined;
        if (this._jwtRequestInterceptorID != null) {
            this._axios_instance.interceptors.request.eject(this._jwtRequestInterceptorID);
        }
        if (this._jwtResponseInterceptorID != null) {
            this._axios_instance.interceptors.response.eject(this._jwtResponseInterceptorID);
        }
        cookies.remove('refreshToken')
        cookies.remove('accessToken')
    }
    async refresh(refreshToken: string): Promise<Record<string, string>> {
        const data = {
            'refresh': refreshToken
        }
        const response = await this._axios_instance.post('api/token/refresh/', data)
        return response.data
    }
}