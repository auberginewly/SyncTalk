// 这个组件用于显示页面加载状态
import React from 'react'
import { LoaderIcon } from 'lucide-react'
import useThemeStore from '../store/useThemeStore.js'

const PageLoader = () => {
  const { theme, setTheme } = useThemeStore()
  return (
    <div className="flex items-center justify-center min-h-screen" data-theme={theme}>
      <LoaderIcon className='animate-spin size-10 text-primary' />
    </div>
  )
}

export default PageLoader
