export interface IResponse {
    data: Record<string, unknown>
    headers: Record<string, string>
    status_code: number
}