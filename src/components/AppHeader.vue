<template>
  <header class="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111a22] px-10 py-3 shadow-sm">
    <div class="flex items-center gap-4 text-text-main dark:text-white">
      <div class="size-8 flex items-center justify-center text-primary cursor-pointer" @click="$router.push('/')">
        <span class="material-symbols-outlined text-[32px]">menu_book</span>
      </div>
      <h2 class="text-text-main dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] cursor-pointer" @click="$router.push('/')">Campus Books</h2>
    </div>
    <div class="flex flex-1 justify-end gap-8">
      <nav class="hidden md:flex items-center gap-9">
        <router-link to="/" class="text-text-main dark:text-slate-200 text-sm font-medium leading-normal hover:text-primary transition-colors">首页</router-link>
        <router-link to="/search" class="text-text-main dark:text-slate-200 text-sm font-medium leading-normal hover:text-primary transition-colors">搜索教材</router-link>
        <router-link to="/cart" class="text-text-main dark:text-slate-200 text-sm font-medium leading-normal hover:text-primary transition-colors flex items-center gap-1">
          <span class="material-symbols-outlined text-[20px]">shopping_cart</span>
          购物车
        </router-link>
        <router-link to="/profile" class="text-text-main dark:text-slate-200 text-sm font-medium leading-normal hover:text-primary transition-colors">订单中心</router-link>
      </nav>
      <div class="flex items-center gap-4">
        <div class="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-600 bg-center bg-cover cursor-pointer" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAZhHmp6dKGTH7i6IzXoyl366MP3sv8uBtn0Nqd0P8KrH__qWygXpscIspS5CRI5J_os3hYMNcMcho72imbDZCAm-o-kmrrIaXFWgc4XjLU0RInjnBrVZADF18FRC0NAGK-G2WaXZWXciPZtK2VT2uk1qhBprMcnIJfRGzSVObG_LUMwc38GBPO2MKH6tLjGuIUMNnBBFKXqe8qjr10SIGn5NQZDcdh9b18lz_JmDi76Kqi_Gg_9xJfrAbX5Wd-cvT7k9ZeM2b8vdDN");' @click="$router.push('/profile')"></div>
        <button class="hidden sm:flex h-9 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700 px-3 text-sm font-bold text-text-main dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors" @click="handleLogout">
          退出登录
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const handleLogout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>
