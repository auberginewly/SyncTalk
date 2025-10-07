import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { login } from '../lib/api'  // 来自 src/lib/api.js
import { MessageCircleDashed } from 'lucide-react'
import { Link } from 'react-router'
import  useLogin  from '../hooks/useLogin'  // 自定义的登录钩子

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  })
  
  // const queryClient = useQueryClient()


  // const { mutate:loginMutation, isPending, error } = useMutation({
  //   mutationFn: login,  // 来自 src/lib/api.js
  //   onSuccess:() => {
  //     toast.success("登录成功")
  //     queryClient.invalidateQueries({queryKey: ["authUser"]})
  //   },
  //   // 失败处理
  // })

  const { isPending, error , loginMutation } = useLogin()

  const handleLogin = (e) => {
    e.preventDefault()
    loginMutation(loginData)
  }

  return (
    <div className='h-screen flex items-center justify-center p-4 sm:p-6 md:p-8' data-theme="forest">
      <div className='border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden'>
        {/* 登陆页面 - 左侧 */}
        <div className='w-full lg:w-1/2 p-4 sm:p-8 flex flex-col'>
          {/* LOGO */}
          <div className='mb-4 flex items-center justify-start gap-2'>
            <MessageCircleDashed className=" size-9 text-primary"/>
            <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r 
            from-primary to-secondary tracking-wider'>
            SyncTalk
            </span>
          </div>

          {/* 错误信息展示 */}
          {error && (
            <div className='alert alert-error mb-4'>
              <span>{error.response.data.message}</span>
            </div>
          )}

          <div className='w-full'>
            <form onSubmit={handleLogin}>
              <div className='space-y-4'>

                {/* 提示语 */}
                <div>
                  <h2 className='text-xl font-semibold'>欢迎回来</h2>
                  <p className='text-sm opacity-70'>
                    请登陆账号以继续您的语言学习之旅
                  </p>
                </div>

                <div className='flex flex-col gap-3'>

                  {/* 邮箱 */}
                  <div className='form-control w-full space-y-1'>
                    <label className='label'>
                      <span className='label-text'>邮箱</span>
                    </label>
                    <input
                      type='email'
                      placeholder='请输入您的邮箱'
                      className='input input-bordered w-full'
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                    />
                  </div>

                  {/* 密码 */}
                  <div className='form-control w-full space-y-1'>
                    <label className='label'>
                      <span className='label-text'>密码</span>
                    </label>
                    <input
                      type='password'
                      placeholder='请输入您的密码'
                      className='input input-bordered w-full'
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* 提交按钮 */}
                <button type='submit' className='btn btn-primary w-full' disabled={isPending}>
                  {isPending ? 
                  (
                    <>
                      <span className='loading loading-spinner'></span>
                      登录中...
                    </>
                  ) : (
                    "登录"
                  )}
                </button>

                {/* 跳转注册页面 */}
                <div className='text-center mt-4'>
                  <p className='text-sm'>
                    还没有账号？点击{" "} 
                    <Link to='/signup' className='text-primary hover:underline'>
                      注册账号
                    </Link>
                  </p>
                </div>

              </div>
            </form>  
          </div>
        </div>


        {/* 登陆页面 - 右边模块 */}
        <div className='hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center'>
          <div className='max-w-md p-8'>
            {/* 填充物 */}
            <div className='relative aspect-square max-w-sm mx-auto'>
              <img src="/i.png" alt="语言学习示意图" className='w-full h-full'/>
            </div>

            <div className='mt-6 text-center space-y-3'>
              <h2 className='text-xl font-semibold'>语言相通 心灵相遇</h2>
              <p className='opacity-70'>
                练习对话 结交挚友 提升语言技能
                <br />
                一切尽在 SyncTalk
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default LoginPage
