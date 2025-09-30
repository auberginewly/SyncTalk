import React from 'react'
import {MessageCircleDashed} from "lucide-react"
import { Link } from 'react-router'

const SignUpPage = () => {
  const [signupData, setSignupData] = React.useState({
    fullName: '',
    email: '',
    password: '',
  })

  const handleSignup = (e) => {
    e.preventDefault()
    // Handle signup logic here
  }
  return (
    <div className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8" data-theme="forest">
      <div className='border border-primary/25 flex flex-col 
      lg:flex-row w-full max-w-5xl mx-auto bg-base-100 
      rounded-xl shadow-lg overflow-hidden'>
        {/* 登陆页面 - 左边模块 */}
        <div className='w-full lg:w-1/2 p-4 sm:p-8 flex flex-col'>
          {/* LOGO */} 
          <div className='mb-8 flex items-center justify-start gap-2'>
            <MessageCircleDashed className=" size-9 text-primary"/>
            <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r 
            from-primary to-secondary tracking-wider'>
            SyncTalk
            </span>
          </div>

          <div className="w-full">
            <form onSubmit={handleSignup} >
              <div className='space-y-4'>
                
                {/* 标题 */}
                <div>
                  <h2 className='text-xl font-semibold'>注册账号</h2>
                  <p className='text-sm opacity-70'>
                    加入 SyncTalk，开启你的语言学习之旅！
                  </p>   
                </div>          

                <div className='space-y-3'>

                  {/* 姓名 */}
                  <div className='form-control w-full'>
                    <label className='label'>
                      <span className='label-text'>姓名</span>
                    </label>
                    <input type="text" 
                      placeholder='your fullname'
                      className='input input-bordered w-full'
                      value={signupData.fullName}
                      onChange={(e) => setSignupData({...signupData, fullName: e.target.value})}
                      required
                    />
                  </div>

                  {/* 邮箱地址 */}
                  <div className='form-control w-full'>
                    <label className='label'>
                      <span className='label-text'>邮箱地址</span>
                    </label>
                    <input type="email" 
                      placeholder='your-email-name@example.com'
                      className='input input-bordered w-full'
                      value={signupData.email}
                      onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                      required
                    />
                  </div>

                  {/* 密码 */}
                  <div className='form-control w-full'>
                    <label className='label'>
                      <span className='label-text'>密码</span>
                    </label>
                    <input type="password" 
                      placeholder='********'
                      className='input input-bordered w-full'
                      value={signupData.password}
                      onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                      required
                    />
                    {/* 密码长度提示 */}
                    <p className='text-xs opacity-70 mt-1'>
                      密码长度至少为 6 位
                    </p>
                  </div>

                  {/* 同意条款 */}
                  <div className='form-control'>
                    <label className='label cursor-pointer justify-start gap-2'>
                      <input type="checkbox" className='checkbox checkbox-sm' required/>
                      <span className='text-xs leading-tight'>
                        我已阅读并同意{" "}
                        {/* 后续记得补写同意条款 */}
                        <a href="/terms" className='text-primary hover:underline'>服务条款{" "}</a>和{" "}
                        <a href="/privacy" className='text-primary hover:underline'>隐私政策</a>
                      </span>
                    </label>
                  </div>

                  {/* 注册提交按钮 */}
                  <button className='btn btn-primary w-full' type="submit">
                    注册账号
                  </button>

                  <div className='mt-4 text-center'>
                    <p className='text-sm'>
                      已有账号？{" "}
                      <Link to="/login" className='text-primary hover:underline'>
                        立即登录
                      </Link>
                    </p>
                  </div>
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

export default SignUpPage
