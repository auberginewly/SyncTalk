// 📁 src/hooks/useLogout.js
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import { logout } from '../lib/api'

const useLogout = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { mutate: logoutMutation, isPending, error } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['authUser'] })
        // ✅ 3. 显示成功提示
        toast.success("已成功登出")
    },
  })

  return { logoutMutation, isPending, error }
}

export default useLogout