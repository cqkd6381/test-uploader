import axios from 'axios'
import config from './config'
import { getToken } from "./auth";

// 创建axios实例
const service = axios.create({
  // baseURL: config.develop.local_api,
  baseURL: config.develop.dev_api,
  timeout: 150000,
  withCredentials: true
})

// request拦截器
service.interceptors.request.use(config => {
  config.headers['X-auth-token'] =  getToken()
  return config
}, error => {
  return Promise.reject(error)
})

// response拦截器
service.interceptors.response.use(response => {
  const res = response.data
  return res
}, error => {
  console.log(error)
})

export default service