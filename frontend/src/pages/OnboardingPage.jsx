import React, { useState } from "react"
import useAuthUser from "../hooks/useAuthUser"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { completeOnboarding } from "../lib/api"
import { CameraIcon, ShuffleIcon, MapPinIcon, ShipWheelIcon, LoaderIcon} from "lucide-react"
import { LANGUAGES } from "../constants/index"


const OnboardingPage = () => {
  const { authUser } = useAuthUser()
  const queryClient = useQueryClient()

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || '',
    bio: authUser?.bio || '',
    nativeLanguage: authUser?.nativeLanguage || '',
    learningLanguage: authUser?.learningLanguage || '',
    location: authUser?.location || '',
    profilePicture: authUser?.profilePicture || '',
  })

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: (data) => {
      toast.success("补充资料成功")
      queryClient.invalidateQueries({ queryKey: ["authUser"] })
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message)
    }
  })

  // 表单提交处理函数
  const handleSubmit = (e) => {
    // 阻止默认表单提交行为
    e.preventDefault()
    // 调用变异函数提交数据
    onboardingMutation(formState)
  } 


  // 随机头像生成处理函数
  const handleRandomAvatar = () => {
    const randomNumber = Math.floor(Math.random() * 100) + 1
    const randomAvatarUrl = `https://avatar.iran.liara.run/public/${randomNumber}.png`
    
    // ✅ 显示加载提示
    toast.loading("正在生成头像...", { id: 'avatar-loading' })
    
    // ✅ 创建新的图片对象进行预加载
    const img = new Image()
    
    // ✅ 图片加载成功后的回调
    img.onload = () => {
      // 图片加载完成，更新状态
      setFormState({
        ...formState,
        profilePicture: randomAvatarUrl,
      })
      
      // ✅ 关闭加载提示并显示成功提示
      toast.dismiss('avatar-loading')
      toast.success("随机头像生成成功")
    }
    
    // ✅ 图片加载失败的回调
    img.onerror = () => {
      // ✅ 关闭加载提示并显示错误提示
      toast.dismiss('avatar-loading')
      toast.error("头像加载失败，请重试")
    }
    
    // ✅ 开始加载图片
    img.src = randomAvatarUrl
  }

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4"> 

      <div className="card bg-base-200 w-full max-w-3xl shadow-xl">

        
        <div className="card-body p-6 sm:p-8">
          <h1 className="text-2xl font-bold sm:text-3xl text-center mb-6">完善您的资料</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* 资料头像容器 */}
            <div className="flex flex-col items-center justify-center space-y-4">
              {/* 头像预览 */}
              <div className="size-32 rounded-full bg-base-300 overflow-hidden">
                {formState.profilePicture ? (
                  <img
                    src={formState.profilePicture}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <CameraIcon className="size-12 text-base-content opacity-40" />
                  </div>
                )}
              </div>

              {/* 头像随机生成按钮 */}
              <div className="flex items-center gap-2">
                <button type="button" onClick={handleRandomAvatar} className="btn btn-accent">
                  <ShuffleIcon className="size-4 mr-2" />
                  随机生成头像
                </button>
              </div>
            </div>

            {/* 姓名 */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">姓名</span>
              </label>
              <input 
                type="text" 
                name="fullName"
                value={formState.fullName}
                onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                className="input input-bordered w-full"
                placeholder="请输入您的姓名"
              />
            </div>

            {/* 个人简介 */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">个人简介</span>
              </label>
              <textarea 
                name="bio"
                value={formState.bio}
                onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                className="textarea textarea-bordered h-24"
                placeholder="请输入您的个人简介"
              />
            </div>            

            {/* 语言 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 母语 */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">母语</span>
                </label>
                <select 
                  name="nativeLanguage" 
                  value={formState.nativeLanguage}
                  onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
                  className="select select-bordered w-full"
                >
                  <option value="" disabled>请选择您的母语</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`native-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              {/* 要学习的语言 */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">要学习的语言</span>
                </label>
                <select 
                  name="learningLanguage" 
                  value={formState.learningLanguage}
                  onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
                  className="select select-bordered w-full"
                >
                  <option value="" disabled>请选择您要学习的语言</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 地区 */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">地区</span>
              </label>
              <div className="relative">
                <MapPinIcon className="absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content opacity-70"/>
                <input 
                  type="text" 
                  name="location"
                  value={formState.location}
                  onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                  className="input input-bordered w-full pl-10"
                  placeholder="城市, 国家"
                />
              </div>
            </div>

            {/* 提交按钮 */}
            <button className="btn btn-primary w-full" type="submit" disabled={isPending}>
              {!isPending ? (
                <>
                  <ShipWheelIcon className="size-5 mr-2" />
                  提交资料
                </>
              ) : (
                <>
                  <LoaderIcon className="loading loading-spinner size-5 mr-2"/>
                  提交中...
                </>
              )}
            </button>



          </form>
        </div>


      </div>
      
    </div>
  )
}

export default OnboardingPage
