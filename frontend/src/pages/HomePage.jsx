import React, { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getRecommendUsers, getUserFriends, getFriendRequests, sendFriendReq } from '../lib/api'
import { useMutation } from '@tanstack/react-query'
import { Link } from 'react-router'
import { UserIcon, MapPinIcon, CheckCircleIcon, UserPlusIcon } from 'lucide-react'
import FriendCard from '../components/FriendCard'
import NoFriendsFound from '../components/NoFriendsFound'
import { getLanguageFlag } from '../components/FriendCard'

const HomePage = () => {
  const queryClient = useQueryClient()
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set())

  const { data:friends, isLoading:loadingFriends } =useQuery({
    queryKey: ['friends'],
    queryFn: getUserFriends
  })

  const { data:recommendUsers, isLoading:loadingUsers } =useQuery({
    queryKey: ['users'],
    queryFn: getRecommendUsers
  })

  const { data: friendRequests } = useQuery({
    queryKey: ['friendRequests'],
    queryFn: getFriendRequests
  })

  const outgoingFriendReqs = friendRequests?.outgoingReqs || []

  const {mutate: sendReqMutation, isPending} = useMutation({
    mutationFn: sendFriendReq,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friendRequests'] })
    }
  })

  useEffect(() => {
    const outgoingIds = new Set()
    if(outgoingFriendReqs && outgoingFriendReqs.length > 0){
      outgoingFriendReqs.forEach(req => 
        outgoingIds.add(req.recipient._id)
      )
      setOutgoingRequestsIds(outgoingIds)
    }

  },[outgoingFriendReqs])


  return (
    <div className='p-4 sm:p-6 lg:p-8'>
      <div className='container mx-auto space-y-10'>
        {/* 你的朋友 */}
        <div className='flex flex-col gap-4 sm:flex-row items-start sm:items-center justify-between'>
          <h2 className='text-2xl sm:text-3xl font-bold tracking-tight'>
            你的好友
          </h2>
          <Link to='/notifications' className='btn btn-outline btn-sm'>
            <UserIcon className='h-4 w-4 mr-2'/>
            好友请求
          </Link>
        </div>

        {loadingFriends ? (
          <div className='flex justify-center py-12'>
            <span className='loading loading-spinner loading-lg'></span>
          </div>
        ) : friends.length === 0 ? (
          <NoFriendsFound />
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
            {friends.map(friend => (
              <FriendCard key={friend._id} friend={friend} />
            ))}
          </div>
        )}

        <section>
          <div className='mb-6 sm:mb-8'>
            <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
              <div>
                <h2 className='text-2xl sm:text-3xl font-bold tracking-tight'>发现新的好友</h2>
                <p className='opacity-70'>
                  发现并添加新的语言学习伙伴
                </p>  
              </div>
            </div>
          </div>

          {loadingUsers ? (
            // ✅ 第一种情况：正在加载
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg" />
            </div>
          ) : recommendUsers?.length === 0 ? (
            // ✅ 第二种情况：没有推荐用户
            <div className='card bg-base-200 p-6 text-center'>
              <h3 className='text-lg font-semibold text-center'>暂时没有推荐的用户</h3>
              <p className='text-base-content opacity-70'>晚点再试试</p>
            </div>
          ) : (
            // ✅ 第三种情况：有推荐用户，显示网格布局
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {recommendUsers?.map((user) => {
                const hasRequestBeenSent = outgoingRequestsIds.has(user._id)
                return (
                  <div 
                    key={user._id}
                    className='card bg-base-200 hover:shadow-lg transition-all duration-300'
                  >
                    {/* 用户信息 */}
                    <div className='card-body p-5 space-y-4'>
                      <div className='flex items-center gap-3'>
                        {/* 头像 */}
                        <div className='avatar size-16 rounded-full'>
                          <img src={user.profilePicture} alt={user.fullName} />
                        </div>
                        {/* 名字和位置 */}
                        <div>
                          <h3 className='font-semibold text-lg'>
                            {user.fullName}
                          </h3>

                          {user.location && (
                            <div className='flex items-center text-xs opacity-70 mt-1'>
                              <MapPinIcon className='size-3 mr-1' />
                              {user.location}
                            </div>
                          )}
                        </div>       
                      </div>

                      {/* 语言 国旗 */}
                      <div className='flex flex-wrap gap-1.5'>
                          <span className='badge badge-secondary text-xs'>
                              {getLanguageFlag(user.nativeLanguage)}
                              Native: {capitalize(user.nativeLanguage)}
                          </span>
                          <span className='badge badge-outline text-xs'>
                              {getLanguageFlag(user.learningLanguage)}
                              Learning: {capitalize(user.learningLanguage)}
                          </span>
                      </div>

                      {/* 用户自我介绍 */}
                      {user.bio && (
                        <p className='text-sm opacity-70'>
                          {user.bio}
                        </p>
                      )}

                     {/* 添加好友按钮 */}
                      <button
                        className={`btn w-full mt-2 ${
                          hasRequestBeenSent ? "btn-disabled" : "btn-primary"
                        }`}
                        onClick={() => sendReqMutation(user._id)}
                        disabled={hasRequestBeenSent || isPending}
                      >
                        {hasRequestBeenSent ? (
                          <>
                            <CheckCircleIcon className="size-4 mr-2" />
                            好友请求已发送
                          </>
                        ) : (
                          <>
                            <UserPlusIcon className="size-4 mr-2" />
                            发送好友请求
                          </>
                        )}
                      </button>

                    </div>


                  </div>
                )
              })}
            </div>
          )}
        </section>
      </div>
      
    </div>
  )
}

export default HomePage

export const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}