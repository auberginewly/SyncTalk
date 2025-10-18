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
import useAuthUser from './hooks/useAuthUser.js'
import Layout from './components/Layout.jsx'
import useThemeStore from './store/useThemeStore.js'

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
  const { theme, setTheme } = useThemeStore()

  // Boolean() 将任何值转换为布尔值
  // null, undefined, 0, "" 会被转换为 false
  // 其他值会被转换为 true
  const isAuthenticated = Boolean(authUser) // 等价于 !!authUser
  const isOnboarded = authUser?.isOnboarded  // 可选链操作符 ?. 处理不确定数据的常用方式


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
    <div className='h-screen' data-theme={theme}>
      <Routes>
        {/* 登陆保护路由
        只有在 authUser 存在时才能访问主页
        否则重定向到登录页面
        提高可读性
        */}


        {/* 未登陆未完善信息判断如何处理 */}
        <Route path='/' element={isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <HomePage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          } 
        />
        <Route 
          path='/signup' 
          element={
            !isAuthenticated ? <SignUpPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />
          } 
        />
        <Route 
          path='/login' 
          element={
            !isAuthenticated ? <LoginPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />
          } 
        />
        <Route 
          path='/notifications' 
          element={isAuthenticated && isOnboarded ? (
            <Layout showSidebar={true}>
              <NotificationsPage />
            </Layout>
          ) : (
            <Navigate to={isAuthenticated ? "/onboarding" : "/login"}/>
          )} 
        />
        <Route path='/call' element={isAuthenticated ? <CallPage /> : <Navigate to="/login" />} />
        <Route path='/chat/:id' element={
          isAuthenticated && isOnboarded ? (
            <Layout showSidebar={false}>
              <ChatPage />
            </Layout>
          ) : (
            <Navigate to={isAuthenticated ? "/onboarding" : "/login"}/>
          )
        }
        />
        <Route path='/onboarding' element={
          isAuthenticated ? (
            !isOnboarded ? <OnboardingPage /> : <Navigate to="/" />
          ):(
            <Navigate to="/login" />
          )
        }/>
      </Routes>

      <Toaster />
    </div>
  )
}

export default App
