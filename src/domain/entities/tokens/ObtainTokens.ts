import {IObtainTokens} from "@/domain/entities/tokens/ObtainTokens.types";

export class JWTObtainToken implements IObtainTokens {
    access: string
    refresh: string

    constructor(access: string, refresh: string) {
        this.access = access;
        this.refresh = refresh;
    }
}