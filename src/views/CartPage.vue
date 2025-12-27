<template>
  <div class="bg-background-light dark:bg-background-dark min-h-screen flex flex-col transition-colors duration-200">
    <!-- Header -->
    <AppHeader />

    <!-- Main Content -->
    <main class="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <!-- Left Section - Cart Items -->
        <div class="lg:col-span-8 flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">购物车</h2>
            <p class="text-slate-500 dark:text-slate-400 text-lg">当前购物车内有 {{ cartItems.length }} 件商品</p>
            <div class="mt-2 flex gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg">
              <span class="material-icons text-primary shrink-0">info</span>
              <p class="text-sm text-slate-700 dark:text-blue-100">
                <strong>注意：</strong> 购物车中的商品在完成支付前不会被保留。二手商品具有唯一性，可能会在您结算前被他人购买。
              </p>
            </div>
          </div>

          <!-- Cart Items List -->
          <div class="flex flex-col gap-4 mt-2">
            <div 
              v-for="item in cartItems" 
              :key="item.id" 
              class="group bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-800 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row gap-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div class="shrink-0 w-24 h-36 sm:w-28 sm:h-40 rounded-lg overflow-hidden shadow-inner bg-gray-100 dark:bg-gray-800 relative">
                <div class="absolute inset-0 bg-cover bg-center" :style="`background-image: url('${item.image}');`"></div>
              </div>
              <div class="flex flex-1 flex-col justify-between">
                <div>
                  <div class="flex justify-between items-start gap-4">
                    <div>
                      <h3 class="text-lg font-bold text-slate-900 dark:text-white leading-tight">{{ item.title }}</h3>
                      <p class="text-slate-500 dark:text-slate-400 text-sm mt-1">{{ item.author }} • ISBN: {{ item.isbn }}</p>
                    </div>
                    <p class="text-lg font-bold text-slate-900 dark:text-white">¥{{ item.price.toFixed(2) }}</p>
                  </div>
                  <div class="mt-3 flex flex-wrap gap-2">
                    <span 
                      v-for="tag in item.tags" 
                      :key="tag.text" 
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      :class="tag.className"
                    >
                      {{ tag.text }}
                    </span>
                  </div>
                </div>
                <div class="flex items-end justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <div class="flex items-center gap-2">
                    <div class="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                      <div class="w-full h-full bg-cover bg-center" :style="`background-image: url('${item.sellerAvatar}');`"></div>
                    </div>
                    <span class="text-sm text-slate-600 dark:text-slate-400">
                      卖家：<a class="text-primary hover:underline font-medium" href="#">{{ item.seller }}</a>
                    </span>
                  </div>
                  <div class="flex items-center gap-4">
                    <div class="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
                      <button 
                        @click="decreaseQuantity(item.id)" 
                        class="px-2 py-0.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50" 
                        :disabled="item.quantity <= 1"
                      >-</button>
                      <span class="text-sm font-medium text-slate-900 dark:text-slate-100 px-2 select-none">{{ item.quantity }}</span>
                      <button 
                        @click="increaseQuantity(item.id)" 
                        class="px-2 py-0.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50" 
                        :disabled="item.quantity >= item.maxQuantity"
                      >+</button>
                    </div>
                    <button 
                      @click="removeItem(item.id)" 
                      class="text-sm font-medium text-red-500 hover:text-red-600 dark:hover:text-red-400 flex items-center gap-1 transition-colors"
                    >
                      <span class="material-icons text-[18px]">delete</span>
                      删除商品
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="pt-4">
            <router-link to="/search" class="inline-flex items-center text-primary font-medium hover:underline gap-1">
              <span class="material-icons text-sm">arrow_back</span>
              继续浏览教材
            </router-link>
          </div>
        </div>

        <!-- Right Section - Order Summary -->
        <div class="lg:col-span-4 relative">
          <div class="sticky top-24">
            <div class="bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
              <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-6">订单摘要</h3>
              <div class="flex flex-col gap-4 mb-6">
                <div class="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>商品小计 ({{ totalItems }} 件)</span>
                  <span class="font-medium text-slate-900 dark:text-white">¥{{ subtotal.toFixed(2) }}</span>
                </div>
                <div class="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>服务费</span>
                  <span class="font-medium text-green-600 dark:text-green-400">免费</span>
                </div>
                <div class="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>预估税费</span>
                  <span class="font-medium text-slate-900 dark:text-white">¥0.00</span>
                </div>
              </div>
              <div class="border-t border-gray-100 dark:border-gray-700 pt-4 mb-8">
                <div class="flex justify-between items-center">
                  <span class="text-lg font-bold text-slate-900 dark:text-white">总计</span>
                  <span class="text-2xl font-black text-slate-900 dark:text-white">¥{{ totalPrice.toFixed(2) }}</span>
                </div>
              </div>
              <button 
                @click="goToCheckout" 
                class="w-full bg-primary hover:bg-primary-dark text-white font-bold text-lg py-3.5 px-4 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
              >
                去结算
                <span class="material-icons group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
              <div class="mt-6 flex items-center justify-center gap-2 text-slate-400">
                <span class="material-icons text-[18px]">lock</span>
                <span class="text-xs font-medium">安全支付保障</span>
              </div>
            </div>
            <div class="mt-6 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
              <div class="flex gap-3">
                <span class="material-icons text-gray-400">handshake</span>
                <div class="text-xs text-slate-500 dark:text-slate-400">
                  <p class="font-bold text-slate-700 dark:text-slate-300 mb-1">校园交易安全提示</p>
                  建议在图书馆或学生活动中心等校园公共场所进行图书面交。
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-surface-light dark:bg-surface-dark border-t border-gray-200 dark:border-gray-800 py-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row justify-between items-center gap-6">
          <div class="text-slate-500 dark:text-slate-400 text-sm text-center md:text-left">
            <p>© 2023 CampusBooks. 保留所有权利。</p>
            <p class="mt-1">为学生打造，由学生创造。</p>
          </div>
          <div class="flex gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
            <a class="hover:text-primary transition-colors" href="#">帮助中心</a>
            <a class="hover:text-primary transition-colors" href="#">安全提示</a>
            <a class="hover:text-primary transition-colors" href="#">服务条款</a>
            <a class="hover:text-primary transition-colors" href="#">隐私政策</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '../components/AppHeader.vue'

const router = useRouter()

// 购物车商品列表
const cartItems = ref([
  {
    id: 1,
    title: '微积分：早期超越（第8版）',
    author: 'James Stewart',
    isbn: '978-1285741550',
    price: 315.00,
    quantity: 1,
    maxQuantity: 1, // 二手书通常只有1本
    seller: '张伟',
    sellerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvKYR_awui_iNfK0CqPE5xOS_8bsVUZ1Qrt-BK4EspnClrERHL8HLZbFY9uZERCznSxZjjNm4g48bhsZilq19YDm9vpd5FzoggUECSUURnDO_CciLhbo2blsmFEZo4Jv9XhcBIsCErL8kTF1Zfjnj6aFtH93mYTi1FsLlJV028-oX9g61-adKzRELrXPmlYRmRP_G5UsHVo_fNOZtL6jnr8hLATOX5c4rupNuMHUwBc3uuYBaNq8RZw1CbS4mQh3o7rCUsZ5MiMLyK',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7LaPqe7Sr8bgiH6DQpm6ctS_vBV6_SSPOYrx6wTqErb-SEsmw2pEpfmjw2agr7Qs0AmOX7zR0wxdsP0NtgE-pUQ9x_bhp-hLYoq9kjCGGo52Cnr7FPxGZKThEUehxGPY9Lwr6iRGYfHSWcZQp9LaBC2UoI2k0Dz-kHu7GWweg98kxgfVk4Q288oHTdY3iXbQL8QAN1_isgwOf05BxmVFKxkalesXGPx9zCoa-wL3GFaNKEf_gW1DVo37DJtQjE6IBPw2mcJhmBniG',
    tags: [
      { text: '九五新', className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' },
      { text: '精装本', className: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300' }
    ]
  },
  {
    id: 2,
    title: '心理学导论（第11版）',
    author: 'David G. Myers',
    isbn: '978-1464140815',
    price: 210.00,
    quantity: 1,
    maxQuantity: 1,
    seller: '李娜',
    sellerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFH3FbWKjbFyVH3DOiYZLK9HohkQ67gtWULGiVAEnkgktiYSuNa8YVUj_nCZrxt8KrAVadWx9u24wTfIVAfntVKfTEbs4G5pk0hvvbZvM05Lq95wqj6eJICqhLPmP9wHSQThmNozOqM9-1MWsyRnGunDoqmjjVeAAZng9llSk5jt6Edzk3JgRyac0vmYoHQh2yuwzHmq3gxeOfRMbPyh9H5pp27lryP25ekwufafrf7FSk2k-0V14CwZoNFyggDxXSKZmwzexSxqu6',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACcCKPzJ4t3HcpROK-W7hhmPbhevgOm_bWa33bzJkllywHrbLJSGuP3QoNC-ADM_k-fCmGfyVLq3Q541WNCqxZ5h_51AeIpZXREVJycF0UJpU4Alt7nnkyBeQI6XQHrGcqCzXutSoOrgwDIKXJzVfHGgYB0RPKHXQJkUDP33ho8vcwOavDoJvri1-jYQYKJKFfqdCPWopxV1K27vtYp68NssoYl7x76f1j1KFz6RwbBrZt5xJp47mFaBvI55hwVjVs0z84v77hBm-8',
    tags: [
      { text: '八成新', className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' }
    ]
  },
  {
    id: 3,
    title: '化学：中心科学',
    author: 'Brown, LeMay, Bursten',
    isbn: '978-0134414232',
    price: 350.00,
    quantity: 1,
    maxQuantity: 1,
    seller: '王强',
    sellerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjEfQxvoF7-EE98WWZAnHKzmWh_N_NSWpSYVTPWpjDTPDcc4xyvpjwnsiZxTEc00pwE-7afSJA8FD1S7cIvsL-mIi-kFEi6ZvxQJFYbmQ1buMwdw4p6sTuM43-TANU3PUm62hOOvuaj8DNx5rxlCbAAgAq58g3YqjxbKvKwB0c1k3L4mFfvL1NDsEObu1a_eVJG9PNneNdyGiNLL-qNuGwLisAKSvaVU5UgIrR3C9sZkb24eH-k_lS9wsZgItSoFUcuLaoZCKRWVMB',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCC9zIptZkzkwfBSzrri6G_w5LD3oPSN1sFgdfFWgassRL3Uk91ZRpoFY-9h6UnNtJrSG0Rfl5XXNnKHR3dVj20RozDvE9VTECPHllbsoMP6EiXfOcPU4hyToXvCPDUkVmiH3ifRdE-fQi4YE6MgLIQxbzD3rXjviNPSSuMmZbpmspJgMLvzoIwNhKTu2HO7hUYkCD39tv27Q_1Kt00kmIRtONYOCAqhLWLXT0O-arjp8XFBAw4YRXRFau8ahsBjwfzjes_pSF5xGId',
    tags: [
      { text: '有笔记', className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' }
    ]
  }
])

// 计算总商品数量
const totalItems = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
})

// 计算商品小计
const subtotal = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
})

// 计算总价
const totalPrice = computed(() => {
  return subtotal.value // 服务费免费，税费为0
})

// 增加商品数量
const increaseQuantity = (itemId) => {
  const item = cartItems.value.find(i => i.id === itemId)
  if (item && item.quantity < item.maxQuantity) {
    item.quantity++
  }
}

// 减少商品数量
const decreaseQuantity = (itemId) => {
  const item = cartItems.value.find(i => i.id === itemId)
  if (item && item.quantity > 1) {
    item.quantity--
  }
}

// 删除商品
const removeItem = (itemId) => {
  if (confirm('确定要从购物车中删除这本书吗？')) {
    const index = cartItems.value.findIndex(i => i.id === itemId)
    if (index > -1) {
      cartItems.value.splice(index, 1)
    }
  }
}

// 去结算
const goToCheckout = () => {
  if (cartItems.value.length === 0) {
    alert('购物车为空，无法结算')
    return
  }
  
  // TODO: 将购物车数据传递到结算页
  router.push('/checkout')
}
</script>

<style scoped>
/* 自定义样式 */
</style>
