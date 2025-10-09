import { create } from 'zustand'

const useThemeStore = create((set) => ({
    theme: localStorage.getItem('SyncTalk-theme') || 'nord', // 默认主题
    setTheme: (theme) => {
        localStorage.setItem('SyncTalk-theme', theme)
        set({ theme })
    },
}))

export default useThemeStore