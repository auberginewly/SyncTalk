import axiosInstance from './axios'

// 注册函数
export const signup = async (signupData) => {
    const response = await axiosInstance.post('/auth/signup', signupData)
    return response.data
}

// 登陆函数
export const login = async (loginData) => {
    const response = await axiosInstance.post('/auth/login', loginData)
    return response.data
}

// 登出函数
export const logout = async () => {
    const response = await axiosInstance.post('/auth/logout')
    return response.data 
}

// 查看当前登录用户信息
export const getAuthUser = async () => {
    try {
        // 使用 axios 进行数据请求
        const res = await axiosInstance.get('/auth/me')
        return res.data
    } catch (error) {
        console.error("获取用户信息错误:", error);
        return null; // 出错时返回 null
    }
}

// 完成用户引导
export const completeOnboarding = async (userData) => {
    // 发送 POST 请求到 /auth/onboarding
    const response = await axiosInstance.post('/auth/onboarding', userData)
    return response.data
}

// 获取用户好友列表
export async function getUserFriends() {
    const response = await axiosInstance.get('/users/friends')
    return response.data
}

// 获取推荐用户列表
export async function getRecommendUsers() {
    const response = await axiosInstance.get('/users')
    return response.data
}

export async function getOutgoingFriendReqs() {
    const response = await axiosInstance.get('/users/outgoing-friend-requests')
    return response.data
}

export async function sendFriendReq(userId) {
    const response = await axiosInstance.post(`/users/friend-request/${userId}`)
    return response.data
}