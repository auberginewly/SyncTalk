import React from 'react'
import { LANGUAGE_TO_FLAG } from '../constants';
import { Link } from 'react-router';

const FriendCard = ({friend}) => {
  return (
    <div className='card bg-base-200 hover:shadow-md transition-shadow'>
        <div className='card-body p-4'>
            {/* 用户信息 */}
            <div className='flex items-center gap-4 mb-3'>
                {/* 头像 */}
                <div className='avatar size-12'>
                    <img src={friend.profilePicture} alt={friend.fullName} />
                </div>
                {/* 名字 */}
                <h3 className='font-semibold truncate'>
                    {friend.fullName}
                </h3>
            </div>
            {/* 语言信息 */}
            <div className='flex flex-wrap gap-1.5 mb-3'>
                <span className='badge badge-secondary text-xs'>
                    {getLanguageFlag(friend.nativeLanguage)}
                    Native: {friend.nativeLanguage}
                </span>
                <span className='badge badge-outline text-xs'>
                    {getLanguageFlag(friend.learningLanguage)}
                    Learning: {friend.learningLanguage}
                </span>
            </div>

            {/* 发消息按钮 chatpage */}
            <Link to={`/chat/${friend.id}`} className='btn btn-outline w-full'>
                发消息
            </Link>
        </div>
    </div>
  )
}

export default FriendCard

// 根据语言返回对应的国旗emoji
export function getLanguageFlag(language) {
    if (!language) return '🏳️'; // 默认旗帜

    const langLower = language.toLowerCase();
    const countryCode = LANGUAGE_TO_FLAG[langLower];
    
    if (countryCode) {
        return (
            <img 
                src={`https://flagcdn.com/24x18/${countryCode}.png`}
                alt={`${langLower} flag`}
                className="h-3 mr-1 inline-block"
            />
        )
    }
    
    return '🏳️'; // 未知语言的默认旗帜
}