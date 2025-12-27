<template>
  <div class="bg-background-light dark:bg-background-dark font-display min-h-screen flex items-center justify-center p-4 antialiased text-gray-900 dark:text-gray-100 selection:bg-primary/30">
    <main class="w-full max-w-6xl h-[800px] flex rounded-2xl overflow-hidden shadow-2xl bg-white dark:bg-gray-800">
      <!-- Left Side - Image and Info (Hidden on mobile) -->
      <div class="hidden lg:flex lg:w-1/2 relative bg-primary/10">
        <div class="absolute inset-0 z-0">
          <img 
            alt="University library shelf with rows of colorful textbooks" 
            class="w-full h-full object-cover opacity-90" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_ogP195EDRyrcLt3OmNBG_902S-s8P79fkgyDykPjxdAdG2gDdu7S6E_kf3YfkqcrOkmdT2BTk3q-NL28ZGkAeh4fjTunk4XsvQ7m6DM7giwq8egrhToGXUAsK1rGVMfFlwZD-8EC3PX1YuKQyLZIRhK1MJfONPqSzhb0ljCP3vp6ZjVYi4mL7bF8RLKAxufZaSj6NAu5l0DAhhlgRWIJu-6ENoTAeTVxZfM7in2CIk8jepvaaZF84gwT4yHDcdxaT7RNvBAz_btf"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-background-dark/40 to-transparent"></div>
        </div>
        <div class="relative z-10 flex flex-col justify-end p-12 text-white h-full w-full">
          <div class="mb-8">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-10 h-10 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/40">
                <span class="material-icons text-white text-2xl">menu_book</span>
              </div>
              <span class="text-2xl font-bold tracking-tight">CampusBooks</span>
            </div>
            <h2 class="text-4xl font-bold mb-4 leading-tight">
              让闲置教材流动起来<br/>变成下学期的预算。
            </h2>
            <p class="text-gray-200 text-lg max-w-md font-light">
              加入数千名同学的行列,在校园内直接交易书籍。安全、快捷、社区驱动。
            </p>
          </div>
          <div class="flex items-center gap-4 pt-8 border-t border-white/20">
            <div class="flex -space-x-3">
              <img alt="Student avatar 1" class="w-10 h-10 rounded-full border-2 border-background-dark" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2RsZlzkN-vOn3gsHyaUspkuzZP_4n1I7J5EdLnVkpKtNj1GQi2lBKgGXIX1-yj4egurJxy9wVDReKdklH834VPh6aQVFZDEcatTGK9MOcT_5LOhrhJK6TYdnpMdHIjmYb7prr5fK8MjCnNWV13qM93MveQRvWb0Y99NFXJq5I8OLef-qE97mJdaYv-hV8GTrH1af12BhXLhvmzGOFbSLeH_TJrsvV1XLmc2m4ymdX_aTN32VYdD8tibD4cKCKL5WRcWNU0kRip_5i"/>
              <img alt="Student avatar 2" class="w-10 h-10 rounded-full border-2 border-background-dark" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAAW8HltmvLA1h--no_GPKcWsy16siZ8D0_cKJyRZzkh9rAg-KKhiYrfKfeWnCtnfIS5iB3yLHWaGRlwJSztToLbPulZMhe7Do8lh-g6L86xksUKZtJpRkPLk-BS67N6vfyN23U_cWtfrtzMS800NCgApG2sVuwdipJekcuOD00zKBSPzptVyvSJz6rncsWBJ7MYynF16s679NKRhc4AaGLlvcL5GCth3pX1Dq8DMxdvmN-XHjv8YnQKKsjxvRjLMu8xZpfq9jhqN2"/>
              <img alt="Student avatar 3" class="w-10 h-10 rounded-full border-2 border-background-dark" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCX_6w9LyzCDQcuU8YtMW38v-iI9oXUmJyL7U_RLJ9UrLiDmmlvZAAhGecRYGY8pFHNEfDcHX-1G80hBYjW4ShPggsB2Gw9oq-2NnDuG70yeSyxSKamXmDItHpNKd2OXTq11hZWJ57jaImQKy4hcKTJG2jqV4m1UBTbUild3IoBxOcFyv4H8fXhk39l29eC_mFsVbW2PerZtg9-BKw7S3SXqHsoV9fgRttN8eBWVVr8fnqMwTvjfP1U-gGvEu2UHUtVLA1tNJPFJ_6D"/>
            </div>
            <div class="text-sm">
              <p class="font-semibold text-white">5,000+ 同学</p>
              <p class="text-gray-300">每日都在交易</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Side - Login Form -->
      <div class="w-full lg:w-1/2 flex flex-col justify-center p-8 md:p-16 lg:p-20 relative">
        <!-- Mobile Logo -->
        <div class="lg:hidden absolute top-8 left-8 flex items-center gap-2 mb-8">
          <div class="w-8 h-8 rounded bg-primary flex items-center justify-center">
            <span class="material-symbols-outlined text-[24px]">menu_book</span>
            <span class="text-xl font-bold text-gray-900 dark:text-white">CampusBooks</span>
          </div>
        </div>

        <div class="max-w-md w-full mx-auto">
          <div class="mb-10">
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">欢迎回来! 👋</h1>
            <p class="text-gray-500 dark:text-gray-400">请输入您的账号信息以登录平台。</p>
          </div>

          <!-- Error Message (Hidden by default) -->
          <div v-if="showError" class="mb-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-start gap-3">
            <span class="material-icons text-red-600 dark:text-red-400 text-xl mt-0.5">error_outline</span>
            <div>
              <h4 class="text-sm font-semibold text-red-800 dark:text-red-300">登录失败</h4>
              <p class="text-sm text-red-600 dark:text-red-400 mt-1">{{ errorMessage }}</p>
            </div>
          </div>

          <!-- Login Form -->
          <form @submit.prevent="handleLogin" class="space-y-6">
            <!-- Username -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5" for="username">
                用户名
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span class="material-icons text-gray-400 text-xl">person</span>
                </div>
                <input 
                  v-model="formData.username"
                  class="block w-full pl-12 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-colors duration-200" 
                  id="username" 
                  name="username" 
                  placeholder="请输入用户名" 
                  required 
                  type="text"
                />
              </div>
            </div>

            <!-- Password -->
            <div>
              <div class="flex items-center justify-between mb-1.5">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300" for="password">
                  密码
                </label>
              </div>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span class="material-icons text-gray-400 text-xl">lock</span>
                </div>
                <input 
                  v-model="formData.password"
                  :type="showPassword ? 'text' : 'password'"
                  class="block w-full pl-12 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-colors duration-200" 
                  id="password" 
                  name="password" 
                  placeholder="••••••••" 
                  required
                />
                <button 
                  @click="togglePasswordVisibility"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none" 
                  type="button"
                >
                  <span class="material-icons text-xl">{{ showPassword ? 'visibility' : 'visibility_off' }}</span>
                </button>
              </div>
              <div class="flex justify-end mt-2">
                <a class="text-sm font-medium text-primary hover:text-primary/80 transition-colors" href="#">
                  忘记密码?
                </a>
              </div>
            </div>

            <!-- Submit Button -->
            <div class="pt-2">
              <button 
                class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0" 
                type="submit"
              >
                登 录
              </button>
            </div>

            <!-- Divider -->
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-200 dark:border-gray-700"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">其他登录方式</span>
              </div>
            </div>

            <!-- Social Login Buttons -->
            <div class="grid grid-cols-2 gap-3">
              <button 
                @click="handleGoogleLogin"
                class="flex items-center justify-center px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors" 
                type="button"
              >
                <svg aria-hidden="true" class="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"></path>
                </svg>
                谷歌账号
              </button>
              <button 
                @click="handleUniversityLogin"
                class="flex items-center justify-center px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors" 
                type="button"
              >
                <span class="material-icons mr-2 text-xl text-blue-600 dark:text-blue-400">school</span>
                统一身份认证
              </button>
            </div>
          </form>

          <!-- Register Link -->
          <p class="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            还没有账号? 
            <router-link to="/register" class="font-semibold text-primary hover:text-primary/80 transition-colors">
              立即注册
            </router-link>
          </p>
        </div>

        <!-- Footer Links -->
        <div class="absolute bottom-6 left-0 right-0 flex justify-center space-x-6 text-xs text-gray-400 dark:text-gray-500">
          <a class="hover:text-gray-600 dark:hover:text-gray-300 transition-colors" href="#">服务条款</a>
          <a class="hover:text-gray-600 dark:hover:text-gray-300 transition-colors" href="#">隐私政策</a>
          <a class="hover:text-gray-600 dark:hover:text-gray-300 transition-colors" href="#">帮助中心</a>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const formData = ref({
  username: '',
  password: ''
})

const showPassword = ref(false)
const showError = ref(false)
const errorMessage = ref('您输入的用户名或密码不正确。')

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const handleLogin = async () => {
  try {
    // 调用真实登录API
    await authStore.login({
      username: formData.value.username,
      password: formData.value.password
    })
    
    // 登录成功，跳转到首页
    router.push('/')
    
    // 重置错误状态
    showError.value = false
  } catch (error) {
    console.error('登录失败:', error)
    
    // 显示错误信息
    showError.value = true
    errorMessage.value = error.message || '登录失败，请重试'
  }
}

const handleGoogleLogin = () => {
  console.log('谷歌登录')
  // TODO: 实现谷歌登录逻辑
}

const handleUniversityLogin = () => {
  console.log('统一身份认证登录')
  // TODO: 实现统一身份认证登录逻辑
}
</script>

<style scoped>
/* 修复自动填充时的背景色问题 */
input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus, 
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px white inset !important;
  -webkit-text-fill-color: #1f2937 !important;
  transition: background-color 5000s ease-in-out 0s;
}

.dark input:-webkit-autofill,
.dark input:-webkit-autofill:hover, 
.dark input:-webkit-autofill:focus, 
.dark input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px #1f2937 inset !important;
  -webkit-text-fill-color: white !important;
}
</style>
