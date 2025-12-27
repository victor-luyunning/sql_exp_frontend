<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

onMounted(async () => {
  // 应用主题
  const isDark = localStorage.getItem('theme') === 'dark'
  if (isDark) {
    document.documentElement.classList.add('dark')
  }
  
  // 初始化用户认证状态
  const authStore = useAuthStore()
  if (authStore.token) {
    try {
      await authStore.fetchUserInfo()
    } catch (error) {
      console.error('初始化用户信息失败:', error)
    }
  }
})
</script>
