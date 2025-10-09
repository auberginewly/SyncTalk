import React from 'react'

const NoFriendsFound = () => {
  return (
    <div className='card bg-base-200 p-6 text-center'>
        <h3 className='font-semibold text-lg sb-2'>
            你还没有好友
        </h3>
        <p className='text-base-content opacity-70'>
            添加下方的语言学习好友，开始你的交流之旅吧！
        </p>
    </div>
  )
}

export default NoFriendsFound