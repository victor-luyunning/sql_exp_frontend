<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // 应用主题
  const isDark = localStorage.getItem('theme') === 'dark'
  if (isDark) {
    document.documentElement.classList.add('dark')
  }
})
</script>
