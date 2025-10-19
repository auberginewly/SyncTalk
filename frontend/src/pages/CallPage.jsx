import React, { useEffect } from 'react'
import { getStreamToken } from '../lib/api'
import useAuthUser from '../hooks/useAuthUser'
import { useQuery } from '@tanstack/react-query'
import { useParams, useNavigate } from 'react-router'
import { useState } from 'react'
import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  CallControls,
  SpeakerLayout,
  StreamTheme,
  CallingState,
  useCallStateHooks,
} from '@stream-io/video-react-sdk'
import '@stream-io/video-react-sdk/dist/css/styles.css'
import toast from 'react-hot-toast'
import PageLoader from '../components/PageLoader'

// 从环境变量中获取 Stream API Key
const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY

const CallPage = () => {
  
  const {id:callId} = useParams()
  const [client, setClient] = useState(null)
  const [call,setCall] = useState(null)
  const [isConnecting,setIsConnecting] = useState(true)

  const {authUser} = useAuthUser()

  // 获取 Stream 通话令牌
  const {data:tokenData} = useQuery({
    queryKey: ['streamToken'],
    queryFn: getStreamToken,
    enabled: Boolean(authUser),//避免在用户未登录时发送无 效请求只有authUser存在才执行这个查询
  })

  useEffect(() => {
    const initCall = async () => {
      if(!tokenData?.token || !authUser || !callId) {
        setIsConnecting(false)
        return
      }

      try {
        console.log('初始化通话客户端和通话')

        const user = {
          id: authUser._id,
          name: authUser.fullName,
          image: authUser.profilePicture,
        }
        // 初始化视频通话客户端
        const videoClient = new StreamVideoClient({
          apiKey: STREAM_API_KEY,
          user,
          token: tokenData.token,
        })
        // 创建或加入通话
        const callInstance = videoClient.call("default", callId)

        await callInstance.join({create:true})

        console.log('成功加入通话:', callId)
        // 更新状态
        setClient(videoClient)
        setCall(callInstance)

      } catch (error) {
        console.error('初始化通话客户端和通话失败', error)
        toast.error('无法加入通话，请稍后再试。')
      } finally {
        // 无论成功与否都停止连接状态
        setIsConnecting(false)
      }
    }

    initCall()

    // 清理函数
    return () => {
      if (call) {
        call.leave().catch(console.error)
      }
      if (client) {
        client.disconnectUser().catch(console.error)
      }
    }
  }, [tokenData, authUser, callId])

  if (isConnecting) return <PageLoader />

  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      <div className='relative'> 
        {client && call ? (
          <StreamVideo client={client}>
            <StreamCall call={call}>
              <CallContent />
            </StreamCall>
          </StreamVideo>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p>Could not initialize call. Please refresh or try again later.</p>
          </div>
        )}        
      </div>
    </div>
  )
}

const CallContent = () => {
  const {useCallCallingState} = useCallStateHooks()
  const callingState = useCallCallingState()
  const {id:callId} = useParams()
  const {authUser} = useAuthUser()

  const navigate = useNavigate()

  useEffect(() => {
    if (callingState === CallingState.LEFT && authUser) {
      // callId 格式: "user1-user2"
      // 需要提取出对方的 ID
      const userIds = callId.split('-')
      const otherUserId = userIds.find(id => id !== authUser._id)
      
      // 导航到与对方的聊天页面
      navigate(`/chat/${otherUserId}`)
    }
  }, [callingState, navigate, callId, authUser])

  return (
    <StreamTheme>
      <SpeakerLayout/>
      <CallControls />
    </StreamTheme>
  )
}

export default CallPage
