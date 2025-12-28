import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { login as loginApi, logout as logoutApi } from '../api/auth'
import { getUserInfo as getUserInfoApi, updateUserInfo as updateUserInfoApi } from '../api/users'

export const useAuthStore = defineStore('auth', () => {
  // 状态
  const token = ref(localStorage.getItem('token') || '')
  const userInfo = ref(JSON.parse(localStorage.getItem('userInfo') || 'null'))

  // 计算属性
  const isLoggedIn = computed(() => !!token.value)
  const username = computed(() => userInfo.value?.username || '')

  // 登录
  const login = async (credentials) => {
    try {
      const res = await loginApi(credentials)
      
      // 保存 token 和用户信息
      token.value = res.data.token
      userInfo.value = res.data.user
      
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('userInfo', JSON.stringify(res.data.user))
      
      return res
    } catch (error) {
      console.error('登录失败:', error)
      throw error
    }
  }

  // 退出登录
  const logout = async () => {
    try {
      await logoutApi()
    } catch (error) {
      console.error('退出登录请求失败:', error)
    } finally {
      // 无论请求是否成功，都清除本地数据
      token.value = ''
      userInfo.value = null
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
    }
  }

  // 获取用户信息（用于刷新页面后恢复状态）
  const fetchUserInfo = async () => {
    if (!token.value) return
    
    try {
      const res = await getUserInfoApi()
      userInfo.value = res.data
      localStorage.setItem('userInfo', JSON.stringify(res.data))
    } catch (error) {
      console.error('获取用户信息失败:', error)
      // 只有在确定是认证错误时才登出
      if (error.response?.status === 401 || error.message?.includes('登录已过期')) {
        logout()
      }
    }
  }

  // 更新用户信息
  const updateProfile = async (data) => {
    try {
      const res = await updateUserInfoApi(data)
      // 更新本地存储的用户信息
      userInfo.value = { ...userInfo.value, ...res.data }
      localStorage.setItem('userInfo', JSON.stringify(userInfo.value))
      return res
    } catch (error) {
      console.error('更新用户信息失败:', error)
      throw error
    }
  }

  return {
    token,
    userInfo,
    user: userInfo, // 添加 user 别名以兼容
    isLoggedIn,
    username,
    login,
    logout,
    fetchUserInfo,
    updateProfile
  }
})
