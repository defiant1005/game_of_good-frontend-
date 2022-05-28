export enum LoginStatus {
    ANONIMOUS,
    IN_PROCCESS,
    AUTHORIZATED,
}
export interface IJWTNetworkDriver {
    status: LoginStatus
    signIn(accessToken: string, refreshToken: string): void
    register(data:any):any
    signOut(): void
    refresh(refreshToken: string): Promise<Record<string, string>>
}