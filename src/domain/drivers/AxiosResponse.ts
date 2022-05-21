import {IResponse} from "./IResponse";
import {AxiosResponse} from "axios";

export class cAxiosResponse implements IResponse {
    _axiosResponse: AxiosResponse
    constructor(axiosResponse: AxiosResponse) {
        this._axiosResponse = axiosResponse;
    }
    get data() {
        return this._axiosResponse.data;
    }
    get headers() {
        return this._axiosResponse.headers;
    }
    get status_code() {
        return this._axiosResponse.status;
    }
}