import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse } from 'axios'

class ApiService {
  private axiosInstance: AxiosInstance

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: `https://app.ecwid.com/api/v3/${import.meta.env.VITE_STORE_ID}`, // replace with your API base URL
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.initializeRequestInterceptor()
    this.initializeResponseInterceptor()
  }

  private initializeRequestInterceptor() {
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        config.headers['Authorization'] = `Bearer ${import.meta.env.VITE_TOKEN}`
        return config
      },
      (error: any) => Promise.reject(error)
    )
  }

  private initializeResponseInterceptor() {
    this.axiosInstance.interceptors.response.use(this.handleResponse, this.handleError)
  }

  private handleResponse({ data }: AxiosResponse) {
    return data
  }

  private handleError(error: any) {
    // Customize error handling here
    return Promise.reject(error)
  }

  public get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance.get(url, config)
  }

  public post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance.post(url, data, config)
  }

  public put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance.put(url, data, config)
  }

  public delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance.delete(url, config)
  }
}

export const apiService = new ApiService()
