import { useQuery } from '@tanstack/react-query'
import { getAuthUser } from '../lib/api.js'

// 自定义 Hook 用于获取和管理认证用户信息

const useAuthUser = () => {
     // tanstack query 
    const authUser  = useQuery({
    // 要使用数组形式的 queryKey
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false, // 禁用自动重试
  })

  return { isLoading: authUser.isLoading, authUser: authUser.data?.user }
}

export default useAuthUser

