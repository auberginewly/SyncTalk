import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import useAuthUser from '../hooks/useAuthUser.js'
import { useQuery } from '@tanstack/react-query'
import { getStreamToken } from '../lib/api'
import {
  Channel,
  ChannelHeader,
  Chat,
  MessageList,
  MessageInput,
  Thread,
  Window,
} from 'stream-chat-react'
import { StreamChat } from 'stream-chat'
import toast from 'react-hot-toast'
import ChatLoader from '../components/ChatLoader.jsx'
import CallButton from '../components/CallButton.jsx'

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY

const ChatPage = () => {
  const {id:targetUserId} = useParams()

  const [chatClient, setChatClient] = useState(null)
  const [channel, setChannel] = useState(null)
  const [loading, setLoading] = useState(true)

  const {authUser} = useAuthUser()

  const {data:tokenData} = useQuery({
    queryKey: ['streamToken'],
    queryFn: getStreamToken,
    enabled: Boolean(authUser),//避免在用户未登录时发送无 效请求只有authUser存在才执行这个查询
  })

  useEffect(() =>{
    // 判断条件，确保 tokenData 和 authUser 都存在
    const initChat = async () => {
      if(!tokenData?.token || !authUser) return;

      try {
        console.log('初始化聊天客户端和频道')

        const client = StreamChat.getInstance(STREAM_API_KEY)

        await client.connectUser({
          id: authUser._id,
          name: authUser.fullName,
          image: authUser.profilePicture,
        }, tokenData.token) 

        // 排序获取唯一的频道 ID 快排然后——拼接
        const  channelId = [authUser._id, targetUserId].sort().join('-')

        // 创建或获取当前信息频道
        const currChannel = client.channel('messaging', channelId, {
          // 确保只有这两个用户是频道成员
          members: [authUser._id, targetUserId],
        })

        // 监听频道事件
        await currChannel.watch()

        setChatClient(client) // 设置聊天客户端
        setChannel(currChannel) // 设置当前频道
        setLoading(false) // 加载完成
      } catch (error) {
        console.error('初始化聊天客户端和频道失败', error)
        toast.error('无法加载聊天，请稍后再试。')
      } finally {
        setLoading(false)
      }
    }

    initChat()
  }, [tokenData, authUser, targetUserId])  

  const handleVideoCall = () => {
    if(channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`

      channel.sendMessage({
        text: `📞 视频通话邀请: [点击这里加入视频通话](${callUrl})`,
      })

      toast.success('视频通话邀请已发送！')
    } 
  }

  // 加载指示器组件 加载中或者没连上聊天客户端或者频道
  if(loading || !chatClient || !channel) {
    return <ChatLoader/>
  }
  return (
    <div className='h-[93vh] bg-transparent'>
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <div className='w-full relative'>
            <CallButton handleVideoCall={handleVideoCall} />
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput focus />
            </Window>
          </div>
          <Thread />
        </Channel>
      </Chat>      
    </div>
  )
}

export default ChatPage
