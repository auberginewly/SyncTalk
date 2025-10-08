import React from 'react'
import Sidebar from './Sidebar.jsx'
import Navbar from './Navbar.jsx'

// Layout 组件用于定义应用的整体布局结构
// 包括侧边栏和导航栏
// 通过 showSidebar 属性控制是否显示侧边栏

const Layout = ({ children, showSidebar = false }) => {
  return (
    <div className='min-h-screen'>
      <div className='flex'>
        {/* 侧边栏 */}
        {showSidebar && <Sidebar />}
        <div className='flex-1 flex flex-col'>
            {/* 头部导航栏 */}
            <Navbar />

            <main className='flex-1 overflow-y-auto'>
                {/* 主内容区域，渲染子组件 */}
                {children}
            </main>
        </div>
      </div>
    </div>
  )
}

export default Layout
