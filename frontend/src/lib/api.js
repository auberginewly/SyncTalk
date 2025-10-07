import axiosInstance from './axios'

// 注册函数
export const signup = async (signupData) => {
    const response = await axiosInstance.post('/auth/signup', signupData)
    return response.data
}


// 查看当前登录用户信息
export const getAuthUser = async () => {
    // 使用 axios 进行数据请求
    const res = await axiosInstance.get('/auth/me')
    return res.data
}

// 完成用户引导
export const completeOnboarding = async (userData) => {
    // 发送 POST 请求到 /auth/onboarding
    const response = await axiosInstance.post('/auth/onboarding', userData)
    return response.data
}