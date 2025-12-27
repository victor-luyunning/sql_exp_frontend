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
        <router-link to="/profile" class="text-text-main dark:text-slate-200 text-sm font-medium leading-normal hover:text-primary transition-colors">个人中心</router-link>
      </nav>
      <div class="flex items-center gap-4 relative">
        <!-- 头像下拉菜单 -->
        <div class="relative">
          <div 
            class="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-600 bg-center bg-cover cursor-pointer" 
            style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAZhHmp6dKGTH7i6IzXoyl366MP3sv8uBtn0Nqd0P8KrH__qWygXpscIspS5CRI5J_os3hYMNcMcho72imbDZCAm-o-kmrrIaXFWgc4XjLU0RInjnBrVZADF18FRC0NAGK-G2WaXZWXciPZtK2VT2uk1qhBprMcnIJfRGzSVObG_LUMwc38GBPO2MKH6tLjGuIUMNnBBFKXqe8qjr10SIGn5NQZDcdh9b18lz_JmDi76Kqi_Gg_9xJfrAbX5Wd-cvT7k9ZeM2b8vdDN");'
            @click="toggleDropdown"
          ></div>
          
          <!-- 下拉菜单 -->
          <div 
            v-if="showDropdown"
            class="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 py-4 px-6"
          >
            <!-- 关闭按钮 -->
            <button 
              @click="showDropdown = false"
              class="absolute top-3 right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            >
              <span class="material-symbols-outlined text-[20px]">close</span>
            </button>

            <!-- 用户信息 -->
            <div class="flex flex-col items-center gap-4 pt-2">
              <!-- 头像 -->
              <div 
                class="h-20 w-20 rounded-full bg-slate-200 dark:bg-slate-600 bg-center bg-cover" 
                style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAZhHmp6dKGTH7i6IzXoyl366MP3sv8uBtn0Nqd0P8KrH__qWygXpscIspS5CRI5J_os3hYMNcMcho72imbDZCAm-o-kmrrIaXFWgc4XjLU0RInjnBrVZADF18FRC0NAGK-G2WaXZWXciPZtK2VT2uk1qhBprMcnIJfRGzSVObG_LUMwc38GBPO2MKH6tLjGuIUMNnBBFKXqe8qjr10SIGn5NQZDcdh9b18lz_JmDi76Kqi_Gg_9xJfrAbX5Wd-cvT7k9ZeM2b8vdDN");'
              ></div>
              
              <!-- 用户名 -->
              <div class="text-center">
                <p class="text-lg font-bold text-slate-900 dark:text-white">{{ userInfo.username || '李明' }}</p>
              </div>
              
              <!-- 邮箱 -->
              <div class="text-center w-full">
                <p class="text-sm text-slate-600 dark:text-slate-400">{{ userInfo.email || 'lyn053952@gmail.com' }}</p>
              </div>

              <!-- 操作按钮 -->
              <div class="w-full flex flex-col gap-2 mt-2 pt-4 border-t border-slate-200 dark:border-slate-700">
                <button 
                  @click="goToProfile"
                  class="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                >
                  <span class="material-symbols-outlined text-[18px]">person</span>
                  个人中心
                </button>
                <button 
                  @click="handleLogout"
                  class="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                >
                  <span class="material-symbols-outlined text-[18px]">logout</span>
                  退出登录
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showDropdown = ref(false)
const userInfo = ref({
  username: '李明',
  email: 'lyn053952@gmail.com'
})

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const goToProfile = () => {
  showDropdown.value = false
  router.push('/profile')
}

const handleLogout = () => {
  showDropdown.value = false
  localStorage.removeItem('token')
  router.push('/login')
}

// 点击外部关闭下拉菜单
const handleClickOutside = (event) => {
  const dropdown = event.target.closest('.relative')
  if (!dropdown && showDropdown.value) {
    showDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
