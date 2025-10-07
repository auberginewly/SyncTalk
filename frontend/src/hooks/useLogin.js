import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { login } from '../lib/api'  // 来自 src/lib/api.js

const useLogin = () => {
  const queryClient = useQueryClient()
  const { mutate, isPending, error } = useMutation({
    mutationFn: login,  // 来自 src/lib/api.js
    onSuccess:() => {
      toast.success("登录成功")
      queryClient.invalidateQueries({queryKey: ["authUser"]})
    },
    // 失败处理
  })

  return {error, isPending, loginMutation: mutate}
}

export default useLogin
