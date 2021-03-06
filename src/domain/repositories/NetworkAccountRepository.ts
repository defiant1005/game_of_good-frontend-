import {IAccountRepository} from "@/domain/repositories/abstracts/AccountRepository.types";
import {INetworkDriver} from "@/domain/drivers/INetworkDriver";
import {IObtainTokens} from "@/domain/entities/tokens/ObtainTokens.types";
import {JWTObtainToken} from "@/domain/entities/tokens/ObtainTokens";
import {ElMessage} from "element-plus";

export class NetworkAccountRepository implements IAccountRepository {
    _networkDriver: INetworkDriver

    constructor(networkDriver: INetworkDriver) {
        this._networkDriver = networkDriver;
    }
    async login(username: string, password: string): Promise<IObtainTokens> {
        const url = 'api/token/'
        const data = {
            username,
            password
        }
        const response = await this._networkDriver.post(url, data)
        if (response.status_code == 200) {
            ElMessage({
                showClose: true,
                message: 'Успешно',
                type: 'success',
            })
            return Promise.resolve(new JWTObtainToken(<string>response.data.access, <string>response.data.refresh));
        } else {
            return Promise.reject(Error(`Ошибка входа. response[status]: ${response.status_code};response[data]: ${JSON.stringify(response.data)}\``));
        }
    }

    async get_questions() {
        const url = '/questions/'
        return await this._networkDriver.get(url)
    }
    async get_categories() {
        const url = '/categories/'
        const response = await this._networkDriver.get(url)
        return response
    }
    async get_users() {
        const url = '/users/'
        const response = await this._networkDriver.get(url)
        return response
    }

}