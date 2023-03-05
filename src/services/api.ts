import axios from "axios"
import { getCookie } from "cookies-next"

const token = getCookie("Admin:AuthToken")
const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND + "/admin",
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    },
})
export default API
