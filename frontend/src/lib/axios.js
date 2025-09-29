import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5001/api", // 替换为你的后端 API 地址
  withCredentials: true, // 允许携带 cookie send cookies with requests
  headers: {
    'Content-Type': 'application/json',
  },
})

export default axiosInstance