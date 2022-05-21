import {IResponse} from "./IResponse";

export interface INetworkDriver {
    get(url: string, params?: Record<string, unknown>, headers?: Record<string, unknown>): Promise<IResponse>
    post(url: string, data?: any, headers?: Record<string, unknown>): Promise<IResponse>
}