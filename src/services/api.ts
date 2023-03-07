import axios, { AxiosRequestHeaders } from "axios"
import { getCookie } from "cookies-next"

const token = getCookie("Admin:AuthToken")
const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND + "/admin"
})

API.interceptors.request.use(config => {
  const token = getCookie("Admin:AuthToken")
console.log(token)
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    } as AxiosRequestHeaders;

    return config;


})
export default API
