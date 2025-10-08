import { useMutation, useQueryClient } from '@tanstack/react-query'
import { signup } from '../lib/api'


const useSignup = () => {
  // 创建 QueryClient 实例
  const queryClient = useQueryClient()

  // 使用 useMutation 处理注册请求
  // mutate 重命名为 signupMutation 以便语义化
  // isPending 标识请求是否进行中
  // error 捕获请求错误信息
  const { mutate, isPending, error } = useMutation({
    // 发送注册请求的函数
    mutationFn: signup,
    onSuccess: () => {
      // 注册成功后，刷新当前用户信息
      queryClient.invalidateQueries({ queryKey: ['authUser'] })
    }
    // onError 可以在这里处理错误，比如显示通知等，待优化
  })

  return {error, isPending, signupMutation: mutate}
}

export default useSignup
