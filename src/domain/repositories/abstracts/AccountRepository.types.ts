import {IObtainTokens} from "@/domain/entities/tokens/ObtainTokens.types";

export interface IAccountRepository {
    login(username: string, password: string): Promise<IObtainTokens>
    get_questions(): Promise<any>
    get_categories(): Promise<any>
    get_users(): Promise<any>
}