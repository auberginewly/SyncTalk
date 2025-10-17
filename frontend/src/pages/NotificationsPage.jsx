import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getFriendRequests } from '../lib/api'

const NotificationsPage = () => {
  const queryClient = useQueryClient()

  const { data: friendRequests , isLoading } = useQuery({
    queryKey: ['friendRequests'],
    queryFn: getFriendRequests,
  })

  const {mutate:acceptRequestMutation, isPending} = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      // 更新请求列表也更新好友列表
      queryClient.invalidateQueries({ queryKey: ['friendRequests'] })
      queryClient.invalidateQueries({ queryKey: ['friends'] })
    }
  })

  const incomingRequests = friendRequests?.incomingReqs || []
  const acceptedRequests = friendRequests?.acceptedReqs || []

  
  return (
    <div>
      NotificationsPage
    </div>
  )
}

export default NotificationsPage
 