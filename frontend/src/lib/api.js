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
