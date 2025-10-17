import React from 'react'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { getFriendRequests, acceptFriendRequest } from '../lib/api'
import { UserCheckIcon, UserPlusIcon } from 'lucide-react'
import { getLanguageFlag } from '../components/FriendCard'

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
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

  const incomingRequests = friendRequests?.incomingReqs || []
  const outgoingRequests = friendRequests?.outgoingReqs || []


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

              {/* 已发送的好友请求 */}
              {outgoingRequests.length > 0 && (
                <section className='space-y-4'>
                  <h2 className='text-xl font-semibold flex items-center gap-2'>
                    <UserPlusIcon className='size-5 text-info' />
                    已发送的请求
                    <span className='badge badge-info ml-2'>{outgoingRequests.length}</span>
                  </h2>

                  <div className='space-y-3'>
                    {outgoingRequests.map((request) => (
                      <div
                        key={request._id}
                        className='card bg-base-200 shadow-sm'
                      >
                        <div className='card-body p-4'>
                          <div className='flex items-center justify-between'>
                            {/* 左侧：头像 + 用户信息 */}
                            <div className='flex items-center gap-3'>
                              <div className='avatar w-14 h-14 rounde d-full bg-base-300'>
                                <img src={request.recipient.profilePicture} alt={request.recipient.fullName} />
                              </div>

                              <div>
                                <h3 className='font-semibold'>{request.recipient.fullName}</h3>

                                <div className='flex flex-wrap gap-1.5 mt-1'>
                                  <span className='badge badge-secondary badge-sm'>
                                    {getLanguageFlag(request.recipient.nativeLanguage)}
                                    Native: {capitalize(request.recipient.nativeLanguage)}
                                  </span>
                                  <span className='badge badge-outline badge-sm'>
                                    {getLanguageFlag(request.recipient.learningLanguage)}
                                    Learning: {capitalize(request.recipient.learningLanguage)}
                                  </span>
                                </div> 
                              </div>
                            </div>

                            <div className='badge badge-warning'>等待中</div>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* 空状态 */}
              {incomingRequests.length === 0 && outgoingRequests.length === 0 && (
                <div className='card bg-base-200 p-6 text-center'>
                  <p className='text-lg text-center font-semibold'>暂无新通知</p>
                </div>
              )}

              {/* 已接受的请求 */}
              
            </>
          )}
      </div>
      
    </div>
  )
}

export default NotificationsPage
 