import React from 'react'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { getFriendRequests, acceptFriendRequest } from '../lib/api'
import { UserCheckIcon, BellIcon, ClockIcon, MessageSquareIcon } from 'lucide-react'
import { getLanguageFlag } from '../components/FriendCard'

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// 格式化相对时间
function formatRelativeTime(date) {
  const now = new Date()
  const past = new Date(date)
  const diffInSeconds = Math.floor((now - past) / 1000)

  if (diffInSeconds < 60) {
    return '刚刚'
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return `${diffInMinutes}分钟前`
  }

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `${diffInHours}小时前`
  }

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) {
    return `${diffInDays}天前`
  }

  const diffInWeeks = Math.floor(diffInDays / 7)
  if (diffInWeeks < 4) {
    return `${diffInWeeks}周前`
  }

  const diffInMonths = Math.floor(diffInDays / 30)
  if (diffInMonths < 12) {
    return `${diffInMonths}个月前`
  }

  const diffInYears = Math.floor(diffInDays / 365)
  return `${diffInYears}年前`
}

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

  const incomingRequests = friendRequests?.incomingRequests || []
  const acceptedRequests = friendRequests?.acceptedRequests || []


  return (
    <div className='p-4 sm:p-6 lg:p-8'>
      <div className='container mx-auto max-w-4xl space-y-8'>
        <h1 className='text-2xl sm:text-3xl font-bold tracking-tight mb-6'>通知</h1>
          {isLoading ? (
            <div className='flex justify-center py-12'>
              <span className='loading loading-spinner loading-lg'></span>
            </div>
          ) : (
            <>
              {/* 好友请求部分 */}
              {incomingRequests.length > 0 && (
                <section className='space-y-4'>
                  <h2 className='text-xl font-semibold flex items-center gap-2'>
                    <UserCheckIcon className='size-5 text-primary' />
                    好友申请
                    <span className='badge badge-primary ml-2'>{incomingRequests.length}</span>
                  </h2>

                  <div className='space-y-3'>
                    {incomingRequests.map((request) => (
                      <div
                        key={request._id}
                        className='card bg-base-200 shadow-sm hover:shadow-md transition-shadow'
                      >
                        <div className='card-body p-4'>
                          <div className='flex items-center justify-between'>
                            {/* 左侧：头像 + 用户信息 */}
                            <div className='flex items-center gap-3'>
                              <div className='avatar w-14 h-14 rounded-full bg-base-300'>
                                <img src={request.sender.profilePicture} alt={request.sender.fullName} />
                              </div>

                              <div>
                                <h3 className='font-semibold'>{request.sender.fullName}</h3>

                                <div className='flex flex-wrap gap-1.5 mt-1'>
                                  <span className='badge badge-secondary badge-sm'>
                                    {getLanguageFlag(request.sender.nativeLanguage)}
                                    Native: {capitalize(request.sender.nativeLanguage)}
                                  </span>
                                  <span className='badge badge-outline badge-sm'>
                                    {getLanguageFlag(request.sender.learningLanguage)}
                                    Learning: {capitalize(request.sender.learningLanguage)}
                                  </span>
                                </div> 
                              </div>
                            </div>

                            <button 
                              className='btn btn-primary btn-sm'
                              onClick={() => acceptRequestMutation(request._id)}
                              disabled={isPending}
                            >
                              接受
                            </button>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* 已接受的请求 - New Connections */}
              {acceptedRequests.length > 0 && (
                <section className='space-y-4'>
                  <h2 className='text-xl font-semibold flex items-center gap-2'>
                    <BellIcon className='h-5 w-5 text-success' />
                    新的联系人
                  </h2>

                  <div className='space-y-3'>
                    {acceptedRequests.map((notification) => (
                      <div key={notification._id} className='card bg-base-200 shadow-sm'>
                        <div className='card-body p-4'>
                          <div className='flex items-start gap-3'>
                            <div className='avatar mt-1 size-10 rounded-full'>
                              <img 
                                src={notification.sender.profilePicture}
                                alt={notification.sender.fullName}
                              />
                            </div>

                            <div className='flex-1'>
                              <h3 className='font-semibold'>{notification.sender.fullName}</h3>
                              <p className='text-sm my-1'>
                                你接受了{notification.sender.fullName}的好友请求
                              </p>
                              <p className='text-xs flex items-center opacity-70'>
                                <ClockIcon className='h-3 w-3 mr-1' />
                                {formatRelativeTime(notification.updatedAt)}
                              </p>
                            </div>

                            <div className='badge badge-success'>
                              <MessageSquareIcon className='h-3 w-3 mr-1' />
                              新的朋友
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* 空状态 */}
              {incomingRequests.length === 0 && acceptedRequests.length === 0 && (
                <div className='card bg-base-200 p-6 text-center'>
                  <p className='text-lg text-center font-semibold'>暂无新通知</p>
                </div>
              )}             
            </>
          )}
      </div>
      
    </div>
  )
}

export default NotificationsPage
 