<template>
  <div class="bg-background-light dark:bg-background-dark text-[#111418] dark:text-white font-display overflow-x-hidden antialiased">
    <div class="relative flex h-auto min-h-screen w-full flex-col">
      <!-- Header -->
      <AppHeader />

      <!-- Main Content -->
      <div class="layout-container flex h-full grow flex-col px-4 md:px-10 lg:px-20 xl:px-40 py-8">
        <!-- Breadcrumb -->
        <div class="flex flex-wrap gap-2 items-center pb-6">
          <router-link to="/" class="text-[#617589] hover:text-primary text-sm font-medium leading-normal">首页</router-link>
          <span class="material-icons text-[#617589] text-base">chevron_right</span>
          <router-link to="/cart" class="text-[#617589] hover:text-primary text-sm font-medium leading-normal">购物车</router-link>
          <span class="material-icons text-[#617589] text-base">chevron_right</span>
          <span class="text-[#111418] dark:text-white text-sm font-medium leading-normal">结算</span>
        </div>

        <h1 class="text-[#111418] dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em] mb-8">订单结算</h1>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <!-- Left Section - Forms -->
          <div class="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
            <!-- Shipping Address Section -->
            <section class="bg-white dark:bg-[#1a2632] rounded-xl border border-[#e5e7eb] dark:border-gray-700 p-6 md:p-8 shadow-sm">
              <div class="flex items-center gap-3 mb-6 border-b border-[#f0f2f4] dark:border-gray-700 pb-4">
                <div class="flex items-center justify-center size-10 rounded-full bg-primary/10 text-primary">
                  <span class="material-icons">local_shipping</span>
                </div>
                <h2 class="text-xl font-bold text-[#111418] dark:text-white">收货地址</h2>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="flex flex-col gap-2">
                  <label class="text-[#111418] dark:text-gray-200 text-sm font-medium">校内宿舍楼</label>
                  <div class="relative">
                    <select v-model="formData.dormitory" class="w-full h-14 rounded-lg border border-[#dbe0e6] dark:border-gray-600 bg-white dark:bg-gray-800 text-[#111418] dark:text-white px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none cursor-pointer">
                      <option disabled value="">请选择宿舍楼</option>
                      <option value="mei14">梅一四围合</option>
                      <option value="mei58">梅五八围合</option>
                      <option value="mei9">梅九围合</option>
                      <option value="tao12">桃一二围合</option>
                      <option value="tao34">桃三四围合</option>
                      <option value="tao56">桃五六围合</option>
                      <option value="tao78">桃七八围合</option>
                      <option value="tao910">桃九十围合</option>
                    </select>
                    <span class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#617589]">
                      <span class="material-icons">expand_more</span>
                    </span>
                  </div>
                </div>
                <div class="flex flex-col gap-2">
                  <label class="text-[#111418] dark:text-gray-200 text-sm font-medium">房间号</label>
                  <input v-model="formData.roomNumber" class="w-full h-14 rounded-lg border border-[#dbe0e6] dark:border-gray-600 bg-white dark:bg-gray-800 text-[#111418] dark:text-white px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-[#617589]" placeholder="例如：304B" type="text"/>
                </div>
                <div class="flex flex-col gap-2 md:col-span-2">
                  <label class="text-[#111418] dark:text-gray-200 text-sm font-medium">联系电话</label>
                  <input v-model="formData.phone" class="w-full h-14 rounded-lg border border-[#dbe0e6] dark:border-gray-600 bg-white dark:bg-gray-800 text-[#111418] dark:text-white px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-[#617589]" placeholder="138 0000 0000" type="tel"/>
                </div>
              </div>
              <div class="mt-6 flex items-center gap-3">
                <input v-model="formData.saveAddress" class="size-5 rounded border-[#dbe0e6] text-primary focus:ring-primary" id="save-address" type="checkbox"/>
                <label class="text-[#111418] dark:text-gray-300 text-sm font-medium cursor-pointer" for="save-address">保存地址以便下次使用</label>
              </div>
            </section>

            <!-- Payment Information Section -->
            <section class="bg-white dark:bg-[#1a2632] rounded-xl border border-[#e5e7eb] dark:border-gray-700 p-6 md:p-8 shadow-sm">
              <div class="flex items-center gap-3 mb-6 border-b border-[#f0f2f4] dark:border-gray-700 pb-4">
                <div class="flex items-center justify-center size-10 rounded-full bg-primary/10 text-primary">
                  <span class="material-icons">credit_card</span>
                </div>
                <h2 class="text-xl font-bold text-[#111418] dark:text-white">支付信息</h2>
              </div>
              <div class="flex gap-4 mb-6">
                <label class="flex-1 relative cursor-pointer group">
                  <input v-model="formData.paymentType" value="campus-card" class="peer sr-only" name="payment-type" type="radio"/>
                  <div class="p-4 rounded-lg border border-[#dbe0e6] dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-primary peer-checked:border-primary peer-checked:bg-primary/5 transition-all flex flex-col items-center gap-2 text-center h-full">
                    <span class="material-icons text-3xl text-[#617589] peer-checked:text-primary">school</span>
                    <span class="text-sm font-bold text-[#111418] dark:text-white">校园一卡通</span>
                  </div>
                  <div class="absolute top-2 right-2 opacity-0 peer-checked:opacity-100 text-primary transition-opacity">
                    <span class="material-icons text-xl">check_circle</span>
                  </div>
                </label>
                <label class="flex-1 relative cursor-pointer group">
                  <input v-model="formData.paymentType" value="credit-card" class="peer sr-only" name="payment-type" type="radio"/>
                  <div class="p-4 rounded-lg border border-[#dbe0e6] dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-primary peer-checked:border-primary peer-checked:bg-primary/5 transition-all flex flex-col items-center gap-2 text-center h-full">
                    <span class="material-icons text-3xl text-[#617589] peer-checked:text-primary">credit_card</span>
                    <span class="text-sm font-bold text-[#111418] dark:text-white">虚拟信用卡</span>
                  </div>
                  <div class="absolute top-2 right-2 opacity-0 peer-checked:opacity-100 text-primary transition-opacity">
                    <span class="material-icons text-xl">check_circle</span>
                  </div>
                </label>
              </div>
              <div class="flex flex-col gap-6">
                <div class="flex flex-col gap-2">
                  <label class="text-[#111418] dark:text-gray-200 text-sm font-medium">校园卡号 / 虚拟卡号</label>
                  <div class="relative">
                    <span class="absolute left-4 top-1/2 -translate-y-1/2 text-[#617589]">
                      <span class="material-icons">badge</span>
                    </span>
                    <input v-model="formData.cardNumber" class="w-full h-14 pl-12 rounded-lg border border-[#dbe0e6] dark:border-gray-600 bg-white dark:bg-gray-800 text-[#111418] dark:text-white px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-[#617589] tracking-wider" placeholder="2023 0000 1234" type="text"/>
                  </div>
                </div>
                <div class="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-primary text-sm">
                  <span class="material-icons text-lg">info</span>
                  <span>费用将直接从您的账户中扣除。</span>
                </div>
              </div>
            </section>
          </div>

          <!-- Right Section - Order Summary -->
          <div class="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24">
            <div class="bg-white dark:bg-[#1a2632] rounded-xl border border-[#e5e7eb] dark:border-gray-700 shadow-sm flex flex-col overflow-hidden">
              <div class="p-6 border-b border-[#f0f2f4] dark:border-gray-700">
                <h2 class="text-xl font-bold text-[#111418] dark:text-white">订单摘要</h2>
                <p class="text-sm text-[#617589] mt-1">共 {{ cartStore.itemsWithDetails?.length || 0 }} 件商品</p>
              </div>
              <div class="flex flex-col max-h-[400px] overflow-y-auto px-6 py-2">
                <div v-for="item in cartStore.itemsWithDetails" :key="item.bookId" class="flex gap-4 py-4 border-b border-[#f0f2f4] dark:border-gray-700 last:border-0">
                  <div class="size-16 rounded-lg bg-gray-100 dark:bg-gray-700 flex-shrink-0 bg-cover bg-center" :style="`background-image: url('${item.cover_image || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(item.title?.substring(0, 2) || 'Book') + '&size=200&background=f0f2f4&color=617589'}');`"></div>
                  <div class="flex flex-col flex-1 min-w-0 justify-center">
                    <h3 class="text-sm font-bold text-[#111418] dark:text-white truncate">{{ item.title }}</h3>
                    <p class="text-xs text-[#617589] truncate">{{ item.author }} • {{ item.edition }}</p>
                    <p class="text-xs font-medium mt-1" :class="conditionColorMap[item.condition]">品相：{{ conditionMap[item.condition] || item.condition }}</p>
                  </div>
                  <div class="flex flex-col items-end justify-center">
                    <span class="text-sm font-bold text-[#111418] dark:text-white">¥{{ item.price.toFixed(2) }}</span>
                  </div>
                </div>
              </div>
              <div class="p-6 bg-[#f9fafb] dark:bg-gray-800/50 border-t border-[#f0f2f4] dark:border-gray-700 space-y-3">
                <div class="flex justify-between items-center text-sm">
                  <span class="text-[#617589]">商品小计</span>
                  <span class="font-medium text-[#111418] dark:text-white">¥{{ subtotal.toFixed(2) }}</span>
                </div>
                <div class="flex justify-between items-center text-sm">
                  <span class="text-[#617589]">平台服务费 (5%)</span>
                  <span class="font-medium text-[#111418] dark:text-white">¥{{ serviceFee.toFixed(2) }}</span>
                </div>
                <div class="flex justify-between items-center text-sm">
                  <span class="text-[#617589]">运费</span>
                  <span class="font-medium text-emerald-600">免运费</span>
                </div>
                <div class="pt-4 mt-2 border-t border-dashed border-[#dbe0e6] dark:border-gray-600 flex justify-between items-end">
                  <span class="text-base font-bold text-[#111418] dark:text-white">总价</span>
                  <span class="text-2xl font-black text-primary">¥{{ totalPrice.toFixed(2) }}</span>
                </div>
                <button @click="submitOrder" class="w-full mt-4 h-12 bg-primary hover:bg-blue-600 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20">
                  <span>提交订单</span>
                  <span class="material-icons text-sm">arrow_forward</span>
                </button>
                <div class="flex items-center justify-center gap-2 pt-2 text-[#617589]">
                  <span class="material-icons text-base text-emerald-500">lock</span>
                  <span class="text-xs font-medium">SSL 安全加密支付</span>
                </div>
              </div>
            </div>
            <div class="mt-4 p-4 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 flex items-start gap-3">
              <span class="material-icons text-emerald-600 dark:text-emerald-400 mt-0.5">verified_user</span>
              <div class="flex-1">
                <h4 class="text-sm font-bold text-emerald-800 dark:text-emerald-300">买家保障</h4>
                <p class="text-xs text-emerald-700 dark:text-emerald-400 mt-1 leading-relaxed">如果收到的书籍与描述不符，您可在 48 小时内申请全额退款。</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <footer class="mt-auto border-t border-[#f0f2f4] dark:border-gray-800 bg-white dark:bg-[#111418] py-8">
        <div class="px-10 text-center">
          <p class="text-[#617589] text-sm">© 2023 CampusTrade Inc. 专为学生打造的二手书交易平台。</p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'
import AppHeader from '@/components/AppHeader.vue'

const router = useRouter()
const cartStore = useCartStore()
const authStore = useAuthStore()

// 表单数据
const formData = ref({
  dormitory: '',
  roomNumber: '',
  phone: '',
  saveAddress: false,
  paymentType: 'campus-card',
  cardNumber: ''
})

// 成色映射
const conditionMap = {
  'LIKE_NEW': '九五新',
  'GOOD': '八成新',
  'FAIR': '七成新'
}

// 成色颜色映射
const conditionColorMap = {
  'LIKE_NEW': 'text-emerald-600',
  'GOOD': 'text-blue-600',
  'FAIR': 'text-amber-600'
}

// 计算商品小计
const subtotal = computed(() => {
  return cartStore.itemsWithDetails?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0
})

// 计算服务费 (5%)
const serviceFee = computed(() => {
  return subtotal.value * 0.05
})

// 计算总价
const totalPrice = computed(() => {
  return subtotal.value + serviceFee.value
})

// 页面加载时获取购物车详情和用户信息
onMounted(async () => {
  // 如果购物车为空，跳转到购物车页面
  if (cartStore.isEmpty) {
    alert('购物车为空，请先添加商品')
    router.push('/cart')
    return
  }
  
  await cartStore.fetchCartDetails()
  
  // 加载用户默认地址和卡号信息
  if (authStore.user) {
    formData.value.dormitory = authStore.user.default_dormitory || ''
    formData.value.roomNumber = authStore.user.default_room_number || ''
    formData.value.phone = authStore.user.phone || ''
    formData.value.cardNumber = authStore.user.campus_card_number || ''
    
    // 如果有保存的地址，默认勾选保存地址
    if (authStore.user.default_dormitory) {
      formData.value.saveAddress = true
    }
  }
})

// 提交订单
const submitOrder = async () => {
  // 验证表单
  if (!formData.value.dormitory) {
    alert('请选择宿舍楼')
    return
  }
  
  if (!formData.value.roomNumber) {
    alert('请输入房间号')
    return
  }
  
  if (!formData.value.phone) {
    alert('请输入联系电话')
    return
  }
  
  // 验证手机号必须是11位数字
  const phoneRegex = /^\d{11}$/
  if (!phoneRegex.test(formData.value.phone)) {
    alert('手机号必须是11位数字')
    return
  }
  
  if (!formData.value.cardNumber) {
    alert('请输入卡号')
    return
  }
  
  // 如果用户勾选了保存地址，保存到数据库
  if (formData.value.saveAddress) {
    try {
      await authStore.updateProfile({
        defaultDormitory: formData.value.dormitory,
        defaultRoomNumber: formData.value.roomNumber,
        phone: formData.value.phone,
        campusCardNumber: formData.value.cardNumber
      })
    } catch (error) {
      console.error('保存地址信息失败:', error)
      // 保存失败不阻挡订单提交
    }
  }
  
  try {
    // 导入订单API
    const { createOrder } = await import('@/api/orders')
    
    // 为每本书创建一个订单（后端目前只支持单本书订单）
    const orderPromises = cartStore.itemsWithDetails.map(item => {
      return createOrder({
        bookId: item.bookId,
        building: formData.value.dormitory,
        room: formData.value.roomNumber,
        phone: formData.value.phone,
        paymentType: formData.value.paymentType
      })
    })
    
    // 等待所有订单创建完成
    const results = await Promise.all(orderPromises)
    
    // 检查是否有失败的订单
    const failedOrders = results.filter(r => r.code !== 200)
    if (failedOrders.length > 0) {
      const errorMsg = failedOrders[0].message || '订单创建失败'
      // 特别处理余额不足的情况
      if (failedOrders[0].code === 1006) {
        alert(`余额不足！\n${errorMsg}\n\n请先充值后再购买。`)
      } else {
        alert(`订单创建失败：${errorMsg}`)
      }
      return
    }
    
    // 所有订单创建成功
    alert(`订单提交成功！
共创建 ${results.length} 个订单
总金额：¥${totalPrice.value.toFixed(2)}

请到个人中心查看订单详情。`)
    
    // 清空购物车
    cartStore.clearCart()
    
    // 跳转到个人中心订单页
    router.push('/profile')
  } catch (error) {
    console.error('订单提交失败:', error)
    alert('订单提交失败：' + (error.message || '请稍后再试'))
  }
}
</script>

<style scoped>
/* 修复自动填充时的背景色问题 */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px white inset !important;
  -webkit-text-fill-color: #111418 !important;
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
