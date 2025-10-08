import React from 'react'
import  useAuthUser  from '../hooks/useAuthUser.js'
import { useLocation, Link } from 'react-router'
import { MessageCircleDashed, HomeIcon, UsersIcon, BellIcon } from 'lucide-react'

const Sidebar = () => {
    const { authUser } = useAuthUser()
    const location = useLocation()
    const currentPath = location.pathname


    return (
        <aside className='w-64 bg-base-200 border-r border-base-300 hidden lg:flex flex-col h-screen sticky top-0'> 
            {/* 图标和标题 */}
            <div className='p-5 border-b border-base-300'>
                <Link to="/" className="flex items-center gap-2.5">
                    <MessageCircleDashed className=" size-9 text-primary"/>
                    <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r 
                        from-primary to-secondary tracking-wider'>
                        SyncTalk
                    </span>
                </Link>
            </div>
            {/* 导航链接 */}
            <nav className='flex-1 p-4 space-y-1'>
                {/* 主页 */}
                <Link
                    to="/"
                    className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case
                        ${currentPath === '/' ? 'btn-active' : ''}`}
                >
                    <HomeIcon className="size-5 text-base-content opacity-70" />
                    <span>家</span>
                </Link>

                {/* 好友列表 */}
                <Link
                    to="/friends"
                    className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case
                        ${currentPath === '/friends' ? 'btn-active' : ''}`}
                >
                    <UsersIcon className="size-5 text-base-content opacity-70" />
                    <span>好友列表</span>
                </Link>

                {/* 消息提醒 */}
                <Link
                    to="/notifications"
                    className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case
                        ${currentPath === '/notifications' ? 'btn-active' : ''}`}
                >
                    <BellIcon className="size-5 text-base-content opacity-70" />
                    <span>消息提醒</span>
                </Link>
            </nav>

            {/* 用户信息 - 底部 */}
            {/* 外层：控制整个区域的样式和位置 */}
            <div className='p-4 border-t border-base-300 mt-auto'>
                {/* 内层：只负责头像和文字的排列 */}
                <div className='flex items-center gap-3'>
                    {/* 头像 */}
                    <div className='avatar'>
                        <div className=' w-10 rounded-full'>
                            <img src={authUser?.profilePicture} alt="User Avatar" />
                        </div>
                    </div>
                    {/* 用户信息 - 在头像右边 */}
                    <div className='flex-1'>
                        <p className='font-semibold text-sm'>{authUser?.fullName}</p>
                        <p className='text-xs text-success flex items-center gap-1'>
                            <span className='w-2 h-2 bg-success rounded-full inline-block'></span>
                            在线
                        </p>
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar
