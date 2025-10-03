// rafce 快速导入
import { Routes, Route, Navigate   } from 'react-router'

import HomePage from './pages/HomePage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import NotificationsPage from './pages/NotificationsPage.jsx'
import CallPage from './pages/CallPage.jsx'
import ChatPage from './pages/ChatPage.jsx'
import OnboardingPage from './pages/OnboardingPage.jsx'

import { Toaster } from 'react-hot-toast'
import PageLoader from './components/PageLoader.jsx'

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

  // 使用自定义 Hook 获取认证用户信息
  const { isLoading, authUser } = useAuthUser()

  // 安全访问，如果左侧是 null/undefined 就返回 undefined
  // 可选链操作符 ?. 处理不确定数据的常用方式
  // 从后端 server.js 返回的数据中获取 user 对象

  // 大括号创建了一个对象，使用 ES6 简写语法，输出变量和状态
  // 你会看到类似 {data: [...]} 的输出
  // 调试时使用
  // console.log({data})
  // console.log({isLoading})
  // console.log({error})

  if (isLoading) {
    return <PageLoader />
  }

  return (
    <div className='h-screen' data-theme="night">
      <Routes>
        {/* 登陆保护路由
        只有在 authUser 存在时才能访问主页
        否则重定向到登录页面 */}
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path='/notifications' element={authUser ? <NotificationsPage /> : <Navigate to="/login" />} />
        <Route path='/call' element={authUser ? <CallPage /> : <Navigate to="/login" />} />
        <Route path='/chat' element={authUser ? <ChatPage /> : <Navigate to="/login" />} />
        <Route path='/onboarding' element={authUser ? <OnboardingPage /> : <Navigate to="/login" />} />
      </Routes>

      <Toaster />
    </div>
  )
}

export default App
