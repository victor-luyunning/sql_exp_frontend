<template>
  <div class="bg-background-light dark:bg-background-dark font-display text-[#111418] dark:text-white transition-colors duration-200">
    <!-- Header -->
    <header class="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#f0f2f4] dark:border-[#2a3642] px-6 lg:px-10 py-3 bg-white dark:bg-[#1a2632] sticky top-0 z-50">
      <div class="flex items-center gap-4">
        <div class="size-8 text-primary">
          <svg class="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z" fill="currentColor"></path>
          </svg>
        </div>
        <h2 class="text-[#111418] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">校园二手书交易平台</h2>
      </div>
      <div class="hidden md:flex items-center gap-8">
        <nav class="flex items-center gap-9">
          <router-link to="/" class="text-[#111418] dark:text-gray-200 text-sm font-medium hover:text-primary transition-colors">首页</router-link>
          <router-link to="/search" class="text-[#111418] dark:text-gray-200 text-sm font-medium hover:text-primary transition-colors">浏览图书</router-link>
          <router-link to="/login" class="text-primary text-sm font-bold">登录</router-link>
        </nav>
      </div>
      <div class="md:hidden">
        <span class="material-icons cursor-pointer text-[#111418] dark:text-white">menu</span>
      </div>
    </header>

    <!-- Main Content -->
    <div class="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-4 md:p-6 lg:p-10">
      <div class="flex flex-col lg:flex-row w-full max-w-[1100px] bg-white dark:bg-[#1a2632] rounded-2xl shadow-xl overflow-hidden border border-[#e5e7eb] dark:border-[#2a3642]">
        <!-- Left Section - Registration Form -->
        <div class="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <div class="mb-8">
            <h1 class="text-3xl md:text-4xl font-black text-[#111418] dark:text-white mb-3 tracking-tight">加入校园二手书交易平台</h1>
            <p class="text-[#617589] dark:text-gray-400 text-base font-normal">与校友安全便捷地买卖二手教材。</p>
          </div>

          <!-- Registration Form -->
          <form @submit.prevent="handleRegister" class="flex flex-col gap-5">
            <!-- Student ID (Optional) -->
            <div class="flex flex-col gap-1.5">
              <label class="text-[#111418] dark:text-gray-200 text-sm font-medium" for="studentid">
                学号 <span class="text-[#617589] font-normal">（可选）</span>
              </label>
              <input 
                v-model="formData.studentId"
                class="w-full h-12 px-4 rounded-lg border border-[#dbe0e6] dark:border-gray-600 bg-white dark:bg-[#101922] text-[#111418] dark:text-white placeholder-[#617589] dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-base" 
                id="studentid" 
                name="studentid" 
                placeholder="例如：20240056" 
                type="text"
              />
            </div>

            <!-- Username -->
            <div class="flex flex-col gap-1.5">
              <label class="text-[#111418] dark:text-gray-200 text-sm font-medium" for="username">用户名</label>
              <div class="relative flex items-center">
                <input 
                  v-model="formData.username"
                  @input="checkUsername"
                  autocomplete="username" 
                  class="w-full h-12 px-4 pr-10 rounded-lg border border-[#dbe0e6] dark:border-gray-600 bg-white dark:bg-[#101922] text-[#111418] dark:text-white placeholder-[#617589] dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-base" 
                  id="username" 
                  name="username" 
                  placeholder="请设置用户名" 
                  type="text"
                />
                <span v-if="usernameAvailable" class="material-icons absolute right-3 text-green-500 text-[20px] select-none pointer-events-none">check_circle</span>
              </div>
              <p v-if="usernameAvailable" class="text-xs text-green-600 dark:text-green-400 mt-0.5">用户名可用！</p>
            </div>

            <!-- Password -->
            <div class="flex flex-col gap-1.5">
              <label class="text-[#111418] dark:text-gray-200 text-sm font-medium" for="password">密码</label>
              <div class="relative flex items-center">
                <input 
                  v-model="formData.password"
                  @input="checkPasswordStrength"
                  autocomplete="new-password" 
                  class="w-full h-12 px-4 pr-10 rounded-lg border border-[#dbe0e6] dark:border-gray-600 bg-white dark:bg-[#101922] text-[#111418] dark:text-white placeholder-[#617589] dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-base" 
                  id="password" 
                  name="password" 
                  placeholder="请设置密码" 
                  :type="showPassword ? 'text' : 'password'"
                />
                <button 
                  @click="togglePasswordVisibility" 
                  class="absolute right-3 text-[#617589] hover:text-[#111418] dark:hover:text-white transition-colors focus:outline-none" 
                  type="button"
                >
                  <span class="material-icons text-[20px]">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
                </button>
              </div>
              <!-- Password Strength Indicator -->
              <div class="flex gap-1.5 mt-1">
                <div class="h-1 flex-1 rounded-full" :class="passwordStrength >= 1 ? 'bg-yellow-400' : 'bg-[#e5e7eb] dark:bg-gray-700'"></div>
                <div class="h-1 flex-1 rounded-full" :class="passwordStrength >= 2 ? 'bg-yellow-400' : 'bg-[#e5e7eb] dark:bg-gray-700'"></div>
                <div class="h-1 flex-1 rounded-full" :class="passwordStrength >= 3 ? 'bg-green-400' : 'bg-[#e5e7eb] dark:bg-gray-700'"></div>
                <div class="h-1 flex-1 rounded-full" :class="passwordStrength >= 4 ? 'bg-green-400' : 'bg-[#e5e7eb] dark:bg-gray-700'"></div>
              </div>
              <p class="text-xs text-[#617589] dark:text-gray-400">强度：{{ passwordStrengthText }}</p>
            </div>

            <!-- Email -->
            <div class="flex flex-col gap-1.5">
              <label class="text-[#111418] dark:text-gray-200 text-sm font-medium" for="email">邮箱（用于找回密码）</label>
              <div class="relative">
                <input 
                  v-model="formData.email"
                  autocomplete="email" 
                  class="w-full h-12 px-4 rounded-lg border border-[#dbe0e6] dark:border-gray-600 bg-white dark:bg-[#101922] text-[#111418] dark:text-white placeholder-[#617589] dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-base" 
                  id="email" 
                  name="email" 
                  placeholder="student@university.edu" 
                  type="email"
                />
              </div>
            </div>

            <!-- Terms and Conditions -->
            <div class="flex items-start gap-3 mt-2">
              <input 
                v-model="formData.agreeTerms"
                class="mt-1 size-4 rounded border-gray-300 text-primary focus:ring-primary" 
                id="terms" 
                type="checkbox"
              />
              <label class="text-sm text-[#617589] dark:text-gray-400 leading-normal" for="terms">
                我同意<a class="text-primary hover:underline" href="#">服务条款</a>和<a class="text-primary hover:underline" href="#">隐私政策</a>。
              </label>
            </div>

            <!-- Submit Button -->
            <button 
              type="submit"
              class="w-full h-12 mt-2 bg-primary hover:bg-blue-600 text-white font-bold rounded-lg transition-colors focus:ring-4 focus:ring-primary/30 text-base"
            >
              创建账户
            </button>
          </form>

          <!-- Login Link -->
          <div class="mt-8 text-center">
            <p class="text-[#111418] dark:text-gray-300 text-sm">
              已有账户？ 
              <router-link to="/login" class="text-primary font-semibold hover:underline">立即登录</router-link>
            </p>
          </div>
        </div>

        <!-- Right Section - Banner (Desktop Only) -->
        <div class="hidden lg:block w-full lg:w-1/2 relative bg-[#f0f2f4] dark:bg-[#101922]">
          <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBJj8EXVnStCObZF2f5bWqjAlRJq2cXjpg17ctluHoxTdtdn94caxpkDWW0-iGhBLqU6ShPOd2Kjr-Yju42lnmnxnfKVvUsmaOxdzKeiY5ch652XjsXPgzvesKUOjkoTeXoUUAiaxoRh6Sp-4Hd-ZOS5n-fjJwz9N9T8Njl2Jjlp_1unUzj6eKApEm-Y-hjhcqCFto-RPJlk5bxQULb_wbbcr9RaGC6bLbHZ_hH_1z49ZbRcYYugIai6d9c4hmWDmomKWhEqvocsctA');"></div>
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-12">
            <div class="max-w-md">
              <div class="size-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-4 text-white">
                <span class="material-icons">menu_book</span>
              </div>
              <h3 class="text-white text-2xl font-bold mb-2">省钱买教材</h3>
              <p class="text-white/90 text-base">联系学长学姐，获取本学期课程资料的最佳优惠。</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Links -->
      <div class="mt-8 flex gap-6 text-sm text-[#617589] dark:text-gray-500">
        <a class="hover:text-primary transition-colors" href="#">帮助中心</a>
        <a class="hover:text-primary transition-colors" href="#">隐私政策</a>
        <a class="hover:text-primary transition-colors" href="#">条款</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const formData = ref({
  studentId: '',
  username: '',
  password: '',
  email: '',
  agreeTerms: false
})

const showPassword = ref(false)
const usernameAvailable = ref(false)
const passwordStrength = ref(0)

const passwordStrengthText = computed(() => {
  if (passwordStrength.value === 0) return '弱'
  if (passwordStrength.value <= 2) return '中等'
  return '强'
})

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const checkUsername = () => {
  // TODO: 实现用户名可用性检查
  // 这里简单模拟：如果用户名长度大于3，就显示可用
  usernameAvailable.value = formData.value.username.length > 3
}

const checkPasswordStrength = () => {
  // 简单的密码强度检查
  const password = formData.value.password
  let strength = 0
  
  if (password.length >= 6) strength++
  if (password.length >= 10) strength++
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
  if (/[0-9]/.test(password)) strength++
  if (/[^a-zA-Z0-9]/.test(password)) strength++
  
  passwordStrength.value = Math.min(strength, 4)
}

const handleRegister = () => {
  // TODO: 实现注册逻辑
  console.log('注册信息:', formData.value)
  
  // 验证表单
  if (!formData.value.username) {
    alert('请输入用户名')
    return
  }
  
  if (!formData.value.password) {
    alert('请输入密码')
    return
  }
  
  if (!formData.value.email) {
    alert('请输入邮箱')
    return
  }
  
  if (!formData.value.agreeTerms) {
    alert('请同意服务条款和隐私政策')
    return
  }
  
  // 模拟注册成功
  alert('注册成功！即将跳转到首页')
  // 保存模拟token
  localStorage.setItem('token', 'mock_token_' + Date.now())
  // 跳转到首页
  router.push('/')
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
  -webkit-box-shadow: 0 0 0 30px #101922 inset !important;
  -webkit-text-fill-color: white !important;
}
</style>
