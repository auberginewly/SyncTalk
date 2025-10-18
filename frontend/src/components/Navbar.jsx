import React from 'react'
import useAuthUser from '../hooks/useAuthUser';
import { useLocation } from 'react-router';
import { Link } from 'react-router';
import { MessageCircleDashed, BellIcon, LogOutIcon } from 'lucide-react'
import ThemeSelector from './ThemeSelector';
import useLogout from '../hooks/useLogout';


const Navbar = () => {
    const { authUser } = useAuthUser()
    const location = useLocation()
    const isChatPage = location.pathname?.startsWith('/chat')

    const { logoutMutation } = useLogout()
  return (
    <nav className='bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center'>
        {/* 外层确定摆放位置 */}
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>

            {/* 内层：内容布局 */}
            <div className='flex items-center justify-between w-full'>

                {/* LOGO 只在 ChatPage 显示 */}
                {isChatPage && (
                <div className='flex justify-start'>
                    <Link to="/" className="flex items-center gap-2.5">
                        <MessageCircleDashed className="size-9 text-primary" />
                        <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r 
                        from-primary to-secondary tracking-wider'>
                            SyncTalk
                        </span>
                    </Link>
                </div>
                )}

                {/* 右侧按钮组 - 包裹所有右侧元素 */}
                <div className='flex items-center justify-end gap-3 sm:gap-4'>
                    {/* 跳转消息通知 */}
                    <Link to="/notifications">
                        <button className='btn btn-ghost btn-circle'>
                            <BellIcon className='size-6 text-base-content opacity-70'/>
                        </button>
                    </Link>

                    {/* 主题切换 */}
                    <ThemeSelector />

                    {/* 用户信息 - 头像 */}
                    <div className='avatar'>
                        <div className='w-9 rounded-full'> 
                            <img src={authUser?.profilePicture} alt="User Avatar" rel='noreferrer' />
                        </div>
                    </div>

                    {/* 登出按钮 */}
                    <button 
                    onClick={ logoutMutation }
                    className='btn btn-ghost btn-circle'
                    >
                    <LogOutIcon className='size-6 text-base-content opacity-70' />
                    </button>
                </div>

            </div>
        </div>
    </nav>
  )
}

export default Navbar
