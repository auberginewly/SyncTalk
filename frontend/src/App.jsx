// rafce 快速导入
import { Routes, Route } from 'react-router'

import HomePage from './pages/HomePage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import NotificationsPage from './pages/NotificationsPage.jsx'
import CallPage from './pages/CallPage.jsx'
import ChatPage from './pages/ChatPage.jsx'
import OnboardingPage from './pages/OnboardingPage.jsx'

import toast, { Toaster } from 'react-hot-toast'
import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import {axiosInstance} from './lib/axios.js'

const App = () => {
  // 异步数据获取示例
  // const [data, setData] = useState([]) // 存储获取的数据
  // const [isLoading, setIsLoading] = useState(true) // 跟踪加载状态
  // const [error, setError] = useState(null) // 存储错误信息

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const data = await fetch('https://jsonplaceholder.typicode.com/todos')
  //       const json = await data.json()
  //       setData(json)
  //     } catch (error) {
  //       setError(error)
  //     } finally {
  //       setIsLoading(false)
  //     }
  //   }
  //   getData()
  // }, [])

  // console.log(data)

  // tanstack query 
  const {data, isLoading, error} = useQuery({
    // 要使用数组形式的 queryKey
    queryKey: ["todos"],
    queryFn: async () => {
      // 使用 axios 进行数据请求
      const res = await axiosInstance.get('/auth/me')
      return res.data
    },
    retry: false, // 禁用自动重试
  })

  console.log(data)

  // 大括号创建了一个对象，使用 ES6 简写语法，输出变量和状态
  // 你会看到类似 {data: [...]} 的输出
  // 调试时使用
  // console.log({data})
  // console.log({isLoading})
  // console.log({error})

  return (
    <div className='h-screen' data-theme="night">
      <button onClick={() => toast.success('Toast Created!')}>Create a Toast</button>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/notifications' element={<NotificationsPage />} />
        <Route path='/call' element={<CallPage />} />
        <Route path='/chat' element={<ChatPage />} />
        <Route path='/onboarding' element={<OnboardingPage />} />
      </Routes>

      <Toaster />
    </div>
  )
}

export default App
