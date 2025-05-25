import { Axios, AxiosRequestConfig, AxiosResponse } from "axios";
import axios from 'axios'
import { ILogObj, Logger } from "tslog";
import packageMeta from "./package.json";
import { Ref, ref } from "vue";


export default class Network {
    private axiosInstance: Axios;
    private logger: Logger<ILogObj>;
    public readonly isRequesting: Ref<boolean>;
    public onError: (error: string) => void | null

    constructor(logger: Logger<ILogObj>, baseURL: string) {
        this.axiosInstance = axios.create({
            baseURL
        })
        this.logger = logger;
        this.isRequesting = ref(false);

        // 设置拦截器
        this.axiosInstance.interceptors.request.use(this.beforeRequest.bind(this));
        this.axiosInstance.interceptors.response.use(this.afterResponse.bind(this));

        logger.info(`Lib ${packageMeta.name}(${packageMeta.version})`);
    }

    // 创建一个 Post 请求, 如果遇到错误将会抛出一个错误
    public async post(path: string, data?: any): Promise<any> {
        return await this.axiosInstance.post(path, data);
    }

    // 创建一个 Get 请求, 如果遇到错误将会抛出一个错误
    public async get(path: string): Promise<any> {
        return await this.axiosInstance.get(path);
    }

    // 拦截请求
    private beforeRequest(request: AxiosRequestConfig): AxiosRequestConfig {
        this.logger.info("Requesting", request.data);
        return request;
    }

    // 拦截响应
    private afterResponse(response: AxiosResponse<any, any>): AxiosResponse<any, any> {
        this.isRequesting.value = false;

        // 检查是否有错误
        // 并调用 Hook
        if (response.status != 200) {
            this.onError?.(response.statusText)

            this.logger.error("Error from axios: ", response.statusText);
            throw new Error(response.statusText);
        } else if (response.data.error) {
            this.onError?.(response.data.error)

            this.logger.error("Error from server: ", response.data.error);
            throw new Error(response.data.error);
        }

        this.logger.info("End Requesting");
        return response.data.Data;
    }
}    