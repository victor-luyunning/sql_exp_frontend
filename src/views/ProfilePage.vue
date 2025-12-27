<template>
  <div class="relative flex min-h-screen flex-col overflow-x-hidden">
    <!-- Header -->
    <AppHeader />

    <!-- Main Content -->
    <div class="layout-container flex h-full grow flex-col">
      <div class="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-5">
        <div class="layout-content-container flex flex-col max-w-[960px] flex-1 w-full">
          <!-- Breadcrumb -->
          <div class="flex flex-wrap gap-2 px-4 pt-4 pb-2">
            <a class="text-[#617589] dark:text-[#9aaebf] text-sm font-medium leading-normal hover:underline cursor-pointer" @click="$router.push('/')">首页</a>
            <span class="text-[#617589] dark:text-[#9aaebf] text-sm font-medium leading-normal">/</span>
            <span class="text-[#111418] dark:text-white text-sm font-medium leading-normal">个人中心</span>
          </div>

          <!-- Page Title -->
          <div class="flex flex-wrap justify-between gap-3 px-4 pb-6">
            <p class="text-[#111418] dark:text-white tracking-light text-[32px] font-bold leading-tight min-w-72">个人中心</p>
          </div>

          <!-- User Info Card -->
          <div class="px-4 mb-8">
            <div class="bg-white dark:bg-[#1a2632] rounded-xl border border-[#e5e7eb] dark:border-[#22303e] shadow-sm p-6 flex flex-col md:flex-row gap-6 items-start">
              <!-- Avatar -->
              <div class="shrink-0 flex justify-center md:justify-start w-full md:w-auto">
                <div class="relative">
                  <div 
                    class="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-28 h-28 border-4 border-[#f0f2f4] dark:border-[#22303e]" 
                    :style="`background-image: url('${userInfo.avatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCViKVOfHqt2-9UnYUpEzs287y79wFyt5RgXZoljAsZiXY1Yv6Ek-JedzvHPJdmnvPaDQe6xgkvDKfWJHAcfPSGQrRelaSox-PHSs0Nw6IHc50RANilEH_OBiupphEPR5sK43w8MznzWnnkXMRoOg77t61Aw0TR_VfYZgRPlsim9N9UWKAW1KgC9Bdq644UXAxAEUgFcFrPmz35qhR5jbyKyb11O8RrueWZmCT7fpDh2HLrhusLNEZrm4hrS8jwyQEb7bIRcBNaenJw'}');`"
                  ></div>
                  <div class="absolute bottom-1 right-1 bg-green-500 rounded-full p-1 border-2 border-white dark:border-[#1a2632]" title="在线">
                    <div class="w-2.5 h-2.5 rounded-full bg-white"></div>
                  </div>
                </div>
              </div>

              <!-- User Details -->
              <div class="flex flex-col flex-1 gap-4 w-full">
                <div class="flex flex-col gap-1 text-center md:text-left">
                  <div class="flex items-center justify-center md:justify-start gap-3">
                    <h2 class="text-2xl font-bold text-[#111418] dark:text-white">{{ userInfo.username || '李明' }}</h2>
                    <span class="inline-flex items-center rounded-md bg-blue-50 dark:bg-blue-900/30 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-300 ring-1 ring-inset ring-blue-700/10">已认证学生</span>
                  </div>
                  <p class="text-[#617589] dark:text-[#9aaebf] text-sm">{{ userInfo.bio || 'Always be coding.' }}</p>
                </div>

                <!-- User Info Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm border-t border-[#f0f2f4] dark:border-[#2c3b49] pt-4 mt-1">
                  <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-[#9aaebf] text-[18px]">badge</span>
                    <span class="text-[#617589] dark:text-[#9aaebf]">学号:</span>
                    <span class="font-medium text-[#111418] dark:text-white">{{ userInfo.studentId || '2021008542' }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-[#9aaebf] text-[18px]">school</span>
                    <span class="text-[#617589] dark:text-[#9aaebf]">学院:</span>
                    <span class="font-medium text-[#111418] dark:text-white">{{ userInfo.department || '计算机科学与技术学院' }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-[#9aaebf] text-[18px]">book</span>
                    <span class="text-[#617589] dark:text-[#9aaebf]">专业:</span>
                    <span class="font-medium text-[#111418] dark:text-white">{{ userInfo.major || '软件工程' }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-[#9aaebf] text-[18px]">calendar_month</span>
                    <span class="text-[#617589] dark:text-[#9aaebf]">年级:</span>
                    <span class="font-medium text-[#111418] dark:text-white">{{ userInfo.grade || '2021级' }}</span>
                  </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex gap-3 mt-2 justify-center md:justify-start">
                  <button 
                    @click="openEditProfile"
                    class="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
                  >
                    <span class="material-symbols-outlined text-[18px]">edit_square</span>
                    编辑资料
                  </button>
                  <button 
                    @click="showAccountSettings = true"
                    class="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#2c3b49] border border-[#d1d5db] dark:border-[#4b5563] text-[#111418] dark:text-white rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-[#37495b] transition-colors"
                  >
                    <span class="material-symbols-outlined text-[18px]">settings</span>
                    账号设置
                  </button>
                </div>
              </div>

              <!-- Statistics -->
              <div class="flex flex-row md:flex-col justify-between md:justify-center w-full md:w-40 gap-4 border-t md:border-t-0 md:border-l border-[#f0f2f4] dark:border-[#2c3b49] pt-4 md:pt-0 md:pl-6">
                <div class="text-center">
                  <p class="text-xs text-[#617589] dark:text-[#9aaebf] mb-1">信誉积分</p>
                  <p class="text-xl font-bold text-green-600 dark:text-green-400">{{ userStats.creditScore || 98 }}</p>
                </div>
                <div class="text-center">
                  <p class="text-xs text-[#617589] dark:text-[#9aaebf] mb-1">已买书籍</p>
                  <p class="text-xl font-bold text-[#111418] dark:text-white">{{ userStats.purchasedBooks || 12 }}</p>
                </div>
                <div class="text-center">
                  <p class="text-xs text-[#617589] dark:text-[#9aaebf] mb-1">已卖书籍</p>
                  <p class="text-xl font-bold text-[#111418] dark:text-white">{{ userStats.soldBooks || 5 }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Orders Section Header -->
          <div class="px-4 pb-4 flex items-center justify-between">
            <h3 class="text-xl font-bold text-[#111418] dark:text-white">我的订单</h3>
            <a 
              class="text-sm text-primary hover:underline flex items-center gap-1 cursor-pointer"
              @click="handleViewAllOrders"
            >
              查看全部订单
              <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
            </a>
          </div>

          <!-- Order Status Tabs -->
          <div class="px-4 pb-6">
            <div class="flex border-b border-[#dbe0e6] dark:border-[#22303e] gap-8 overflow-x-auto no-scrollbar">
              <a 
                v-for="tab in orderTabs" 
                :key="tab.value"
                @click="currentTab = tab.value"
                :class="[
                  'flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 min-w-max cursor-pointer transition-all',
                  currentTab === tab.value 
                    ? 'border-b-primary text-[#111418] dark:text-white' 
                    : 'border-b-transparent text-[#617589] dark:text-[#9aaebf] hover:text-[#111418] hover:border-b-[#dbe0e6]'
                ]"
              >
                <p class="text-inherit text-sm font-bold leading-normal tracking-[0.015em]">{{ tab.label }}</p>
              </a>
            </div>
          </div>

          <!-- Orders List -->
          <div class="flex flex-col gap-4 px-4">
            <div 
              v-for="order in filteredOrders" 
              :key="order.id"
              class="bg-white dark:bg-[#1a2632] rounded-lg border border-[#e5e7eb] dark:border-[#22303e] overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <!-- Order Header -->
              <div class="bg-[#f9fafb] dark:bg-[#22303e] px-4 py-3 flex flex-wrap justify-between items-center text-sm border-b border-[#e5e7eb] dark:border-[#1a2632]">
                <div class="flex gap-4 text-[#6b7280] dark:text-[#9aaebf]">
                  <span>{{ order.createTime }}</span>
                  <span>订单号: <span class="font-medium text-[#111418] dark:text-white">{{ order.orderNo }}</span></span>
                </div>
                <div :class="[
                  'flex items-center gap-1 font-medium',
                  getOrderStatusClass(order.status)
                ]">
                  <span class="material-symbols-outlined text-[18px]">{{ getOrderStatusIcon(order.status) }}</span>
                  <span>{{ getOrderStatusText(order.status) }}</span>
                </div>
              </div>

              <!-- Order Content -->
              <div class="p-4 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div class="flex items-start gap-4 flex-1">
                  <div 
                    class="bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-lg w-[70px] shrink-0 border border-[#f0f2f4] dark:border-transparent" 
                    :style="`background-image: url('${order.bookCover}');`"
                  ></div>
                  <div class="flex flex-col gap-1">
                    <h3 class="text-[#111418] dark:text-white text-base font-medium leading-tight line-clamp-2">{{ order.bookTitle }}</h3>
                    <p class="text-[#617589] dark:text-[#9aaebf] text-sm">{{ order.bookDesc }}</p>
                    <p class="text-[#617589] dark:text-[#9aaebf] text-sm mt-1">数量: x{{ order.quantity }}</p>
                  </div>
                </div>

                <!-- Order Actions -->
                <div class="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4 sm:gap-1">
                  <div class="text-right">
                    <p class="text-[#617589] dark:text-[#9aaebf] text-sm">{{ order.status === 'PENDING_PAYMENT' ? '需付款' : '实付款' }}</p>
                    <p :class="[
                      'text-lg font-bold',
                      order.status === 'PENDING_PAYMENT' ? 'text-primary' : 'text-[#111418] dark:text-white'
                    ]">¥{{ order.totalAmount.toFixed(2) }}</p>
                  </div>
                  <div class="flex gap-2 mt-2">
                    <button 
                      v-for="action in getOrderActions(order.status)" 
                      :key="action.text"
                      @click="handleOrderAction(action.type, order)"
                      :class="[
                        'flex cursor-pointer items-center justify-center overflow-hidden rounded-md h-8 px-3 text-sm font-medium transition-colors',
                        action.primary 
                          ? 'bg-primary text-white hover:bg-primary/90 shadow-sm' 
                          : action.bordered
                          ? 'bg-white dark:bg-[#1a2632] border border-primary text-primary hover:bg-primary/5'
                          : 'bg-white dark:bg-[#1a2632] border border-[#d1d5db] dark:border-[#4b5563] text-[#111418] dark:text-white hover:bg-gray-50 dark:hover:bg-[#2c3b49]'
                      ]"
                    >
                      {{ action.text }}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Empty State -->
            <div v-if="filteredOrders.length === 0" class="text-center py-16">
              <span class="material-symbols-outlined text-[#9aaebf] text-[64px] mb-4">inbox</span>
              <p class="text-[#617589] dark:text-[#9aaebf] text-base">暂无订单</p>
            </div>
          </div>

          <!-- Pagination -->
          <div v-if="totalPages > 1" class="flex justify-center mt-8 mb-12">
            <div class="flex items-center gap-2">
              <button 
                @click="currentPage > 1 && (currentPage--)"
                :disabled="currentPage === 1"
                class="flex items-center justify-center size-8 rounded-lg bg-white dark:bg-[#1a2632] border border-[#e5e7eb] dark:border-[#22303e] text-[#6b7280] dark:text-[#9aaebf] hover:bg-gray-50 dark:hover:bg-[#2c3b49] disabled:opacity-50 transition-colors"
              >
                <span class="material-symbols-outlined text-[16px]">chevron_left</span>
              </button>
              
              <button 
                v-for="page in displayedPages" 
                :key="page"
                @click="typeof page === 'number' && (currentPage = page)"
                :class="[
                  'flex items-center justify-center size-8 rounded-lg text-sm font-medium transition-colors',
                  page === currentPage 
                    ? 'bg-primary text-white' 
                    : typeof page === 'number'
                    ? 'bg-white dark:bg-[#1a2632] border border-[#e5e7eb] dark:border-[#22303e] text-[#111418] dark:text-white hover:bg-gray-50 dark:hover:bg-[#2c3b49]'
                    : 'text-[#6b7280] dark:text-[#9aaebf] cursor-default'
                ]"
              >
                {{ page }}
              </button>

              <button 
                @click="currentPage < totalPages && (currentPage++)"
                :disabled="currentPage === totalPages"
                class="flex items-center justify-center size-8 rounded-lg bg-white dark:bg-[#1a2632] border border-[#e5e7eb] dark:border-[#22303e] text-[#111418] dark:text-white hover:bg-gray-50 dark:hover:bg-[#2c3b49] disabled:opacity-50 transition-colors"
              >
                <span class="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

    <!-- Edit Profile Modal -->
  <div v-if="showEditProfile" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" @click.self="showEditProfile = false">
    <div class="bg-white dark:bg-[#1a2632] rounded-xl shadow-2xl w-full max-w-md">
      <!-- Modal Header -->
      <div class="sticky top-0 bg-white dark:bg-[#1a2632] border-b border-[#e5e7eb] dark:border-[#22303e] px-6 py-4 flex items-center justify-between">
        <h3 class="text-xl font-bold text-[#111418] dark:text-white">编辑资料</h3>
        <button @click="showEditProfile = false" class="text-[#617589] hover:text-[#111418] dark:hover:text-white transition-colors">
          <span class="material-symbols-outlined text-[24px]">close</span>
        </button>
      </div>

      <!-- Modal Body -->
      <div class="p-6 space-y-4">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-[#111418] dark:text-white mb-1">学号</label>
            <input 
              v-model="editForm.studentId" 
              type="text" 
              class="w-full px-3 py-2 border border-[#d1d5db] dark:border-[#4b5563] rounded-lg bg-white dark:bg-[#2c3b49] text-[#111418] dark:text-white"
              placeholder="请输入学号"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-[#111418] dark:text-white mb-1">邮箱</label>
            <input 
              v-model="editForm.email" 
              type="email" 
              class="w-full px-3 py-2 border border-[#d1d5db] dark:border-[#4b5563] rounded-lg bg-white dark:bg-[#2c3b49] text-[#111418] dark:text-white"
              placeholder="请输入邮箱"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-[#111418] dark:text-white mb-1">手机号</label>
            <input 
              v-model="editForm.phone" 
              type="text" 
              class="w-full px-3 py-2 border border-[#d1d5db] dark:border-[#4b5563] rounded-lg bg-white dark:bg-[#2c3b49] text-[#111418] dark:text-white"
              placeholder="请输入手机号"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-[#111418] dark:text-white mb-1">学院</label>
            <input 
              v-model="editForm.department" 
              type="text" 
              class="w-full px-3 py-2 border border-[#d1d5db] dark:border-[#4b5563] rounded-lg bg-white dark:bg-[#2c3b49] text-[#111418] dark:text-white"
              placeholder="请输入学院"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-[#111418] dark:text-white mb-1">年级</label>
            <input 
              v-model="editForm.grade" 
              type="text" 
              class="w-full px-3 py-2 border border-[#d1d5db] dark:border-[#4b5563] rounded-lg bg-white dark:bg-[#2c3b49] text-[#111418] dark:text-white"
              placeholder="请输入年级"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-[#111418] dark:text-white mb-1">头像链接</label>
            <input 
              v-model="editForm.avatar" 
              type="text" 
              class="w-full px-3 py-2 border border-[#d1d5db] dark:border-[#4b5563] rounded-lg bg-white dark:bg-[#2c3b49] text-[#111418] dark:text-white"
              placeholder="请输入头像链接"
            >
          </div>
        </div>
        
        <div class="flex gap-3 pt-4">
          <button 
            @click="handleUpdateProfile" 
            :disabled="isUpdating"
            class="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-base font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            <span v-if="isUpdating" class="animate-spin">spinner</span>
            <span v-else class="material-symbols-outlined text-[18px]">save</span>
            <span>{{ isUpdating ? '保存中...' : '保存' }}</span>
          </button>
          <button 
            @click="showEditProfile = false" 
            class="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-[#2c3b49] border border-[#d1d5db] dark:border-[#4b5563] text-[#111418] dark:text-white rounded-lg text-base font-medium hover:bg-gray-50 dark:hover:bg-[#37495b] transition-colors"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Account Settings Modal -->
  <div v-if="showAccountSettings" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" @click.self="showAccountSettings = false">
    <div class="bg-white dark:bg-[#1a2632] rounded-xl shadow-2xl w-full max-w-md">
      <!-- Modal Header -->
      <div class="sticky top-0 bg-white dark:bg-[#1a2632] border-b border-[#e5e7eb] dark:border-[#22303e] px-6 py-4 flex items-center justify-between">
        <h3 class="text-xl font-bold text-[#111418] dark:text-white">账号设置</h3>
        <button @click="showAccountSettings = false" class="text-[#617589] hover:text-[#111418] dark:hover:text-white transition-colors">
          <span class="material-symbols-outlined text-[24px]">close</span>
        </button>
      </div>

      <!-- Modal Body -->
      <div class="p-6 space-y-5">
        <div class="space-y-4">
          <button 
            @click="handleRecharge"
            class="w-full flex items-center justify-center gap-3 px-4 py-3 bg-green-600 text-white rounded-lg text-base font-medium hover:bg-green-700 transition-colors"
          >
            <span class="material-symbols-outlined">payments</span>
            充值
          </button>
          
          <button 
            @click="handleLogout"
            class="w-full flex items-center justify-center gap-3 px-4 py-3 bg-red-600 text-white rounded-lg text-base font-medium hover:bg-red-700 transition-colors"
          >
            <span class="material-symbols-outlined">logout</span>
            注销
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { getUserInfo } from '@/api/users'
import { getMyOrders, cancelOrder } from '@/api/orders'
import AppHeader from '../components/AppHeader.vue'

const router = useRouter()
const authStore = useAuthStore()


// Search
const searchQuery = ref('')

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: '/search', query: { keyword: searchQuery.value } })
  }
}

// User Info - 从 API 获取
const userInfo = ref({
  username: '',
  avatar: '',
  bio: '',
  studentId: '',
  student_id: '',
  department: '',
  major: '',
  grade: '',
  email: '',
  phone: '',
  balance: 0
})

const userStats = ref({
  creditScore: 98,
  purchasedBooks: 0,
  soldBooks: 0
})

// 加载用户信息
const loadUserInfo = async () => {
  try {
    const res = await getUserInfo()
    userInfo.value = {
      ...res.data,
      studentId: res.data.student_id || res.data.studentId,
      bio: res.data.bio || '这个人很懒，还没有留下什么~'
    }
  } catch (error) {
    console.error('获取用户信息失败:', error)
    // 只有在确认没有token时才跳转登录，如果有token但验证失败，保留页面让用户重试
    if (!authStore.token || error.message.includes('登录已过期')) {
      authStore.logout()
      router.push('/login')
    }
    // 否则保持当前页面，让用户可以看到部分信息
  }
}

// Modals
const showEditProfile = ref(false)
const showSettings = ref(false)

// Settings Modal
const showAccountSettings = ref(false)

// Edit Profile Form
const editForm = ref({
  studentId: '',
  email: '',
  phone: '',
  department: '',
  grade: '',
  avatar: ''
})

const isUpdating = ref(false)

// Handle Update Profile
const handleUpdateProfile = async () => {
  isUpdating.value = true
  try {
    const updateData = {}
    // Only include fields that have values (not empty strings)
    if (editForm.value.studentId.trim()) updateData.student_id = editForm.value.studentId.trim()
    if (editForm.value.email.trim()) updateData.email = editForm.value.email.trim()
    if (editForm.value.phone.trim()) updateData.phone = editForm.value.phone.trim()
    if (editForm.value.department.trim()) updateData.department = editForm.value.department.trim()
    if (editForm.value.grade.trim()) updateData.grade = editForm.value.grade.trim()
    if (editForm.value.avatar.trim()) updateData.avatar = editForm.value.avatar.trim()
    
    const { updateUserInfo } = await import('@/api/users')
    await updateUserInfo(updateData)
    
    alert('个人资料更新成功！')
    showEditProfile.value = false
    
    // 重新加载用户信息
    await loadUserInfo()
  } catch (error) {
    console.error('更新用户信息失败:', error)
    alert('更新失败：' + (error.message || '请稍后再试'))
  } finally {
    isUpdating.value = false
  }
}

// Open Edit Profile Modal
const openEditProfile = () => {
  // 将当前用户信息复制到编辑表单
  editForm.value = {
    studentId: userInfo.value.studentId || userInfo.value.student_id || '',
    email: userInfo.value.email || '',
    phone: userInfo.value.phone || '',
    department: userInfo.value.department || '',
    grade: userInfo.value.grade || '',
    avatar: userInfo.value.avatar || ''
  }
  showEditProfile.value = true
}

// Account Settings Actions
const handleRecharge = () => {
  alert('充值功能暂未实现')
  // 这里可以实现充值逻辑，例如跳转到充值页面
}

const handleLogout = async () => {
  if (confirm('确定要注销登录吗？')) {
    try {
      const { logout } = await import('@/api/auth')
      await logout()
      authStore.logout()
      router.push('/login')
      alert('已成功注销登录')
    } catch (error) {
      console.error('注销失败:', error)
      alert('注销失败：' + (error.message || '请稍后再试'))
    }
  }
}

const currentTab = ref('all')

// 订单标签页
const orderTabs = ref([
  { label: '全部订单', value: 'all' },
  { label: '待付款', value: 'PENDING_PAYMENT' },
  { label: '已付款', value: 'PAID' },
  { label: '已发货', value: 'SHIPPED' },
  { label: '已完成', value: 'COMPLETED' },
  { label: '已取消', value: 'CANCELLED' }
])

// Orders - 从 API 获取
const orders = ref([])
const isLoadingOrders = ref(false)

// 加载订单列表
const loadOrders = async () => {
  isLoadingOrders.value = true
  try {
    const res = await getMyOrders({
      pageNum: currentPage.value,
      pageSize: pageSize.value,
      status: currentTab.value === 'all' ? undefined : currentTab.value
    })
    
    // 转换后端数据格式为前端需要的格式
    orders.value = res.data.records.map(order => ({
      id: order.id,
      orderNo: order.orderNo,
      createTime: order.createTime,
      status: order.status,
      bookTitle: order.items?.[0]?.bookTitle || '未知书籍',
      bookDesc: order.items?.[0]?.bookAuthor ? `作者: ${order.items[0].bookAuthor}` : '',
      bookCover: order.items?.[0]?.bookCover || '',
      quantity: order.items?.[0]?.quantity || 1,
      totalAmount: order.totalAmount
    }))
    
    // 统计订单数量
    userStats.value.purchasedBooks = res.data.total || orders.value.length
  } catch (error) {
    console.error('获取订单列表失败:', error)
    // 订单加载失败不登出用户，因为可能只是没有订单或网络问题
    // 检查是否是认证问题且没有token
    if ((!authStore.token || error.message.includes('登录已过期')) && error.response?.status === 401) {
      authStore.logout()
      router.push('/login')
    }
    // 否则保持当前页面
  } finally {
    isLoadingOrders.value = false
  }
}

// Filtered Orders
const filteredOrders = computed(() => {
  if (currentTab.value === 'all') {
    return orders.value
  }
  return orders.value.filter(order => order.status === currentTab.value)
})

// Pagination
const currentPage = ref(1)
const pageSize = ref(10)

const totalPages = computed(() => {
  return Math.ceil(filteredOrders.value.length / pageSize.value)
})

const displayedPages = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    if (current <= 3) {
      pages.push(1, 2, 3, '...', total)
    } else if (current >= total - 2) {
      pages.push(1, '...', total - 2, total - 1, total)
    } else {
      pages.push(1, '...', current - 1, current, current + 1, '...', total)
    }
  }

  return pages
})

// Order Status Helpers
const getOrderStatusClass = (status) => {
  const statusClasses = {
    COMPLETED: 'text-green-600 dark:text-green-400',
    PENDING_PAYMENT: 'text-orange-500',
    PAID: 'text-blue-500',
    SHIPPED: 'text-blue-500',
    CANCELLED: 'text-red-500'
  }
  return statusClasses[status] || 'text-gray-500'
}

const getOrderStatusIcon = (status) => {
  const statusIcons = {
    COMPLETED: 'check_circle',
    PENDING_PAYMENT: 'schedule',
    PAID: 'inventory',
    SHIPPED: 'local_shipping',
    CANCELLED: 'cancel'
  }
  return statusIcons[status] || 'info'
}

const getOrderStatusText = (status) => {
  const statusTexts = {
    COMPLETED: '交易成功',
    PENDING_PAYMENT: '待付款',
    PAID: '待发货',
    SHIPPED: '卖家已发货',
    CANCELLED: '已取消'
  }
  return statusTexts[status] || '未知状态'
}

// Order Actions
const getOrderActions = (status) => {
  const actions = {
    PENDING_PAYMENT: [
      { text: '取消订单', type: 'cancel', primary: false, bordered: false },
      { text: '立即付款', type: 'pay', primary: true, bordered: false }
    ],
    PAID: [
      { text: '联系卖家', type: 'contact', primary: false, bordered: false },
      { text: '查看详情', type: 'detail', primary: false, bordered: true }
    ],
    SHIPPED: [
      { text: '查看物流', type: 'logistics', primary: false, bordered: false },
      { text: '确认收货', type: 'confirm', primary: false, bordered: true }
    ],
    COMPLETED: [
      { text: '联系卖家', type: 'contact', primary: false, bordered: false },
      { text: '查看详情', type: 'detail', primary: false, bordered: true }
    ]
  }
  return actions[status] || []
}

const handleOrderAction = async (type, order) => {
  const actions = {
    cancel: async () => {
      if (confirm('确定要取消订单吗?')) {
        try {
          await cancelOrder(order.id)
          alert(`订单 ${order.orderNo} 已取消`)
          loadOrders() // 重新加载订单列表
        } catch (error) {
          alert('取消订单失败：' + (error.message || '请稍后再试'))
        }
      }
    },
    pay: () => {
      router.push({ path: '/checkout', query: { orderId: order.id } })
    },
    contact: () => {
      alert(`正在联系卖家...`)
      // 实际应打开聊天窗口或跳转到消息页面
    },
    detail: () => {
      router.push({ path: '/order/' + order.id })
    },
    logistics: () => {
      alert(`查看物流信息...`)
      // 实际应显示物流信息弹窗
    },
    confirm: () => {
      if (confirm('确认已收到货物吗?')) {
        alert(`订单 ${order.orderNo} 已确认收货`)
        // 实际应调用API确认收货
      }
    }
  }
  
  actions[type]?.()
}

const handleViewAllOrders = () => {
  alert('跳转到订单列表页...')
  // 实际应跳转到专门的订单管理页面
}

// Lifecycle
onMounted(async () => {
  // 如果没有token，直接跳转到登录
  if (!authStore.token) {
    router.push('/login')
    return
  }
  // 加载用户信息和订单数据
  await loadUserInfo()
  await loadOrders()
})
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
