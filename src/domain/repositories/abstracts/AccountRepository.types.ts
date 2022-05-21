import {IObtainTokens} from "@/domain/entities/tokens/ObtainTokens.types";

export interface IAccountRepository {
    login(username: string, password: string): Promise<IObtainTokens>
}