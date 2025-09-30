import axiosInstance from './axios'

// 注册函数
export const signup = async (signupData) => {
    const response = await axiosInstance.post('/auth/signup', signupData)
    return response.data
}