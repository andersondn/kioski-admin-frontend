import axios, { AxiosRequestHeaders } from 'axios'
import { getCookie } from 'cookies-next'

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND + '/admin'
})

API.interceptors.request.use(config => {
  const token = getCookie('Admin:AuthToken')
  const companyId = getCookie('Admin:CompanyId')
  console.log(token)
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${token}`,
    'X-Company-Id': companyId
  } as any

  return config
})
export default API
