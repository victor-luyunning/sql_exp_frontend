<template>
  <div class="bg-background-light dark:bg-background-dark font-body text-[#111418] dark:text-white transition-colors duration-200">
    <div class="flex flex-col min-h-screen">
      <!-- Header -->
      <AppHeader />

      <!-- Main Content -->
      <main class="flex-1 px-4 md:px-10 lg:px-40 py-8 max-w-[1440px] mx-auto w-full">
        <!-- Breadcrumb -->
        <div class="flex flex-wrap gap-2 pb-6 text-sm">
          <router-link to="/" class="text-[#617589] dark:text-gray-400 font-medium hover:text-primary transition-colors">首页</router-link>
          <span class="text-[#617589] dark:text-gray-500 font-medium">/</span>
          <router-link to="/search" class="text-[#617589] dark:text-gray-400 font-medium hover:text-primary transition-colors">教材</router-link>
          <span class="text-[#617589] dark:text-gray-500 font-medium">/</span>
          <a class="text-[#617589] dark:text-gray-400 font-medium hover:text-primary transition-colors" href="#">{{ bookData.department || '计算机科学' }}</a>
          <span class="text-[#617589] dark:text-gray-500 font-medium">/</span>
          <span class="text-[#111418] dark:text-gray-200 font-medium truncate max-w-[200px] md:max-w-none">{{ bookData.title }}</span>
        </div>

        <!-- Book Detail Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <!-- Left Section - Images -->
          <div class="lg:col-span-5 flex flex-col gap-4">
            <!-- Main Image -->
            <div class="w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-[#f0f2f4] dark:border-gray-700 shadow-sm aspect-[3/4] flex items-center justify-center p-8 relative group">
              <div class="w-full h-full bg-contain bg-center bg-no-repeat drop-shadow-xl transform transition-transform duration-300 group-hover:scale-105" :style="`background-image: url('${currentImage}');`"></div>
            </div>

            <!-- Tabs Section (Desktop) -->
            <div class="hidden lg:block mt-8">
              <div class="border-b border-[#f0f2f4] dark:border-gray-700">
                <nav aria-label="Tabs" class="flex gap-8">
                  <button 
                    @click="activeTab = 'seller'"
                    :class="activeTab === 'seller' ? 'border-primary text-primary' : 'border-transparent text-[#617589] dark:text-gray-400 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-300'"
                    class="border-b-2 py-4 text-sm font-medium"
                  >卖家备注</button>
                  <button 
                    @click="activeTab = 'description'"
                    :class="activeTab === 'description' ? 'border-primary text-primary' : 'border-transparent text-[#617589] dark:text-gray-400 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-300'"
                    class="border-b-2 py-4 text-sm font-medium"
                  >内容简介</button>
                  <button 
                    @click="activeTab = 'reviews'"
                    :class="activeTab === 'reviews' ? 'border-primary text-primary' : 'border-transparent text-[#617589] dark:text-gray-400 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-300'"
                    class="border-b-2 py-4 text-sm font-medium"
                  >评价 ({{ bookData.reviewCount }})</button>
                </nav>
              </div>
              <div class="py-6 text-sm text-[#111418] dark:text-gray-300 leading-relaxed">
                <h4 class="font-bold mb-2 text-base text-[#111418] dark:text-white">成色详情</h4>
                <p class="mb-4">{{ bookData.condition_note || '卖家暂未添加备注' }}</p>
              </div>
            </div>
          </div>

          <!-- Right Section - Details -->
          <div class="lg:col-span-7 flex flex-col gap-6">
            <!-- Title and Tags -->
            <div class="flex flex-col gap-2">
              <div class="flex items-center justify-between">
                <div class="flex gap-2">
                  <span class="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-bold uppercase tracking-wide">教材</span>
                  <span v-if="bookData.department" class="bg-[#f0f2f4] dark:bg-gray-700 text-[#617589] dark:text-gray-300 px-2 py-1 rounded text-xs font-bold uppercase tracking-wide">{{ bookData.department }}</span>
                </div>
                <div class="flex items-center gap-1 text-primary cursor-pointer" @click="toggleFavorite">
                  <span class="material-icons text-[18px]" :class="isFavorite ? 'fill-current' : ''">favorite</span>
                  <span class="text-xs font-medium hover:underline">{{ isFavorite ? '已收藏' : '收藏' }}</span>
                </div>
              </div>
              <h1 class="text-[#111418] dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-tight">{{ bookData.title }}</h1>
              <p v-if="bookData.title_en" class="text-[#617589] dark:text-gray-400 text-base italic">{{ bookData.title_en }}</p>
              <p class="text-[#617589] dark:text-gray-400 text-lg">作者： <span class="text-[#111418] dark:text-gray-200 font-medium">{{ bookData.author }}</span></p>
            </div>

            <hr class="border-[#f0f2f4] dark:border-gray-800"/>

            <!-- Price and Purchase Section -->
            <div class="bg-white dark:bg-[#15202b] rounded-xl border border-[#f0f2f4] dark:border-gray-700 p-6 shadow-sm">
              <div class="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center mb-6">
                <div>
                  <div class="flex items-baseline gap-3">
                    <span class="text-4xl font-bold text-primary">¥{{ bookData.price?.toFixed(2) }}</span>
                    <span v-if="bookData.original_price" class="text-lg text-[#617589] dark:text-gray-500 line-through decoration-red-500/50">¥{{ bookData.original_price.toFixed(2) }}</span>
                    <span v-if="bookData.original_price" class="text-sm font-bold text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded-full">-{{ Math.round((1 - bookData.price / bookData.original_price) * 100) }}%</span>
                  </div>
                  <div class="mt-2 flex items-center gap-2">
                    <div class="flex h-6 shrink-0 items-center justify-center gap-x-1 rounded bg-orange-100 dark:bg-orange-900/30 px-2 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800">
                      <span class="material-icons text-[16px]">verified</span>
                      <p class="text-xs font-bold leading-normal">{{ conditionMap[bookData.condition] || bookData.condition }}</p>
                    </div>
                    <div class="flex h-6 shrink-0 items-center justify-center gap-x-1 rounded bg-blue-100 dark:bg-blue-900/30 px-2 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                      <span class="material-icons text-[16px]">inventory_2</span>
                      <p class="text-xs font-bold leading-normal">库存: 1本</p>
                    </div>
                  </div>
                </div>
                <div class="hidden md:flex flex-col items-end">
                  <span class="text-xs text-[#617589] dark:text-gray-500 mb-1">卖家</span>
                  <div class="flex items-center gap-2">
                    <div class="size-8 rounded-full bg-cover bg-center" :style="`background-image: url('${bookData.seller_avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(bookData.seller_name || 'User') + '&background=0D8ABC&color=fff'}');`"></div>
                    <div class="text-right">
                      <p class="text-sm font-medium leading-none text-[#111418] dark:text-white">{{ bookData.seller_name }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex flex-col sm:flex-row gap-3">
                <button @click="addToCart" class="flex-1 bg-primary hover:bg-blue-600 text-white font-bold h-12 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/20" :disabled="loading">
                  <span class="material-icons">shopping_cart</span>
                  加入购物车
                </button>
                <button @click="contactSeller" class="flex-1 sm:flex-none sm:w-auto px-6 border border-[#f0f2f4] dark:border-gray-600 bg-white dark:bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 text-[#111418] dark:text-white font-medium h-12 rounded-lg transition-colors flex items-center justify-center gap-2">
                  <span class="material-icons">chat</span>
                  联系卖家
                </button>
              </div>
              <div class="mt-4 flex gap-3 items-start p-3 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-100 dark:border-blue-900/30">
                <span class="material-icons text-primary text-[20px] mt-0.5">security</span>
                <div class="text-xs text-[#617589] dark:text-gray-300">
                  <span class="font-bold text-[#111418] dark:text-blue-200">校园安全提示：</span> 
                  线下交易请务必选择图书馆或学生活动中心等公共场所，并在白天进行。
                </div>
              </div>
            </div>

            <!-- Specifications -->
            <div class="grid grid-cols-2 gap-y-4 gap-x-8 py-4">
              <div v-if="bookData.isbn">
                <p class="text-xs font-medium text-[#617589] dark:text-gray-500 uppercase tracking-wider mb-1">ISBN-13</p>
                <p class="text-sm font-medium text-[#111418] dark:text-gray-300 font-mono">{{ bookData.isbn }}</p>
              </div>
              <div v-if="bookData.isbn10">
                <p class="text-xs font-medium text-[#617589] dark:text-gray-500 uppercase tracking-wider mb-1">ISBN-10</p>
                <p class="text-sm font-medium text-[#111418] dark:text-gray-300 font-mono">{{ bookData.isbn10 }}</p>
              </div>
              <div v-if="bookData.publisher">
                <p class="text-xs font-medium text-[#617589] dark:text-gray-500 uppercase tracking-wider mb-1">出版社</p>
                <p class="text-sm font-medium text-[#111418] dark:text-gray-300">{{ bookData.publisher }}</p>
              </div>
              <div v-if="bookData.edition">
                <p class="text-xs font-medium text-[#617589] dark:text-gray-500 uppercase tracking-wider mb-1">版本</p>
                <p class="text-sm font-medium text-[#111418] dark:text-gray-300">{{ bookData.edition }}</p>
              </div>
              <div v-if="bookData.publish_date" class="col-span-2">
                <p class="text-xs font-medium text-[#617589] dark:text-gray-500 uppercase tracking-wider mb-1">出版日期</p>
                <p class="text-sm font-medium text-[#111418] dark:text-gray-300">{{ bookData.publish_date }}</p>
              </div>
              <div v-if="bookData.categories" class="col-span-2">
                <p class="text-xs font-medium text-[#617589] dark:text-gray-500 uppercase tracking-wider mb-1">分类</p>
                <div class="flex flex-wrap gap-2 mt-1">
                  <span v-for="tag in bookData.categories.split(',')" :key="tag" class="inline-flex items-center px-2 py-1 rounded bg-[#f0f2f4] dark:bg-gray-800 text-xs font-medium text-[#617589] dark:text-gray-400">{{ tag.trim() }}</span>
                </div>
              </div>
            </div>

            <!-- Seller Info (Mobile) -->
            <div class="md:hidden mt-4 p-4 border border-[#f0f2f4] dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
              <span class="text-xs text-[#617589] dark:text-gray-500 mb-2 block uppercase tracking-wider font-bold">卖家信息</span>
              <div class="flex items-center gap-3">
                <div class="size-10 rounded-full bg-cover bg-center" :style="`background-image: url('${bookData.seller_avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(bookData.seller_name || 'User') + '&background=0D8ABC&color=fff'}');`"></div>
                <div>
                  <p class="text-base font-medium leading-none text-[#111418] dark:text-white">{{ bookData.seller_name }}</p>
                  <p v-if="bookData.department" class="text-xs text-[#617589] dark:text-gray-400 mt-1">{{ bookData.department }}</p>
                </div>
              </div>
            </div>

            <!-- Seller Notes (Mobile) -->
            <div class="lg:hidden mt-6">
              <h3 class="font-bold text-lg mb-2 text-[#111418] dark:text-white">卖家备注</h3>
              <p class="text-sm text-[#617589] dark:text-gray-300 mb-4 leading-relaxed">
                {{ bookData.condition_note || '卖家暂未添加备注' }}
              </p>
            </div>
          </div>
        </div>

        <!-- Seller's Other Books -->
        <div v-if="relatedBooks.length > 0" class="mt-16 pt-10 border-t border-[#f0f2f4] dark:border-gray-800">
          <h3 class="text-xl font-bold text-[#111418] dark:text-white mb-6">{{ bookData.seller_name }} 的其他教材</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            <div v-for="relatedBook in relatedBooks" :key="relatedBook.id" class="group flex flex-col gap-3 cursor-pointer" @click="router.push(`/book/${relatedBook.id}`)">
              <div class="w-full aspect-[2/3] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden relative">
                <div class="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300" :style="`background-image: url('${relatedBook.image}');`"></div>
                <div class="absolute bottom-2 right-2 bg-white dark:bg-gray-900 text-[#111418] dark:text-white text-xs font-bold px-2 py-1 rounded shadow-sm">¥{{ relatedBook.price }}</div>
              </div>
              <div>
                <h4 class="font-medium text-sm text-[#111418] dark:text-white line-clamp-2 group-hover:text-primary transition-colors">{{ relatedBook.title }}</h4>
                <p class="text-xs text-[#617589] dark:text-gray-500 mt-1">{{ relatedBook.condition }}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getBookDetail, getSellerBooks } from '@/api/books'
import { useCartStore } from '@/stores/cart'
import AppHeader from '@/components/AppHeader.vue'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()

const bookId = computed(() => route.params.id)

// 加载状态
const loading = ref(true)

// 当前显示的图片
const currentImage = ref('')

// 活动标签页
const activeTab = ref('seller')

// 收藏状态
const isFavorite = ref(false)

// 搜索关键词
const searchQuery = ref('')

// 书籍详情数据
const bookData = ref({
  id: 0,
  title: '',
  title_en: '',
  author: '',
  isbn: '',
  isbn10: '',
  cover_image: '',
  price: 0,
  original_price: 0,
  condition: '',
  condition_note: '',
  edition: '',
  publisher: '',
  publish_date: '',
  course_name: '',
  department: '',
  categories: '',
  seller_id: 0,
  seller_name: '',
  seller_avatar: '',
  description: ''
})

// 相关书籍（卖家的其他书籍）
const relatedBooks = ref([])

// 成色映射
const conditionMap = {
  'LIKE_NEW': '二手 - 99新',
  'GOOD': '二手 - 良好',
  'FAIR': '二手 - 可接受'
}

// 获取教材详情
const fetchBookDetail = async () => {
  try {
    loading.value = true
    const response = await getBookDetail(bookId.value)
    if (response.code === 200) {
      bookData.value = response.data
      // 初始化当前图片
      currentImage.value = bookData.value.cover_image || 'https://ui-avatars.com/api/?name=No+Cover&size=400&background=f0f2f4&color=617589'
      
      // 获取卖家的其他教材
      if (bookData.value.seller_id) {
        await fetchSellerBooks()
      }
    } else {
      console.error('获取教材详情失败:', response.message)
    }
  } catch (error) {
    console.error('获取教材详情失败:', error)
  } finally {
    loading.value = false
  }
}

// 获取卖家的其他教材
const fetchSellerBooks = async () => {
  try {
    const response = await getSellerBooks(bookData.value.seller_id)
    if (response.code === 200) {
      // 排除当前教材,最多显示5本
      relatedBooks.value = response.data
        .filter(book => book.id !== bookData.value.id)
        .slice(0, 5)
        .map(book => ({
          id: book.id,
          title: book.title,
          price: book.price,
          condition: conditionMap[book.condition] || book.condition,
          image: book.cover_image || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(book.title.substring(0, 2)) + '&size=200&background=f0f2f4&color=617589'
        }))
    }
  } catch (error) {
    console.error('获取卖家其他教材失败:', error)
  }
}

// 监听路由变化,重新获取数据
watch(() => route.params.id, () => {
  if (route.params.id) {
    fetchBookDetail()
  }
})

// 页面加载时获取数据
onMounted(() => {
  fetchBookDetail()
})

// 切换收藏状态
const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
  if (isFavorite.value) {
    alert('已添加到收藏')
  } else {
    alert('已取消收藏')
  }
}

// 加入购物车
const addToCart = async () => {
  try {
    const success = cartStore.addItem(bookData.value.id, 1)
    if (success) {
      alert(`已将《${bookData.value.title}》加入购物车`)
    } else {
      alert(`《${bookData.value.title}》已在购物车中，二手书每次只能购买1本`)
    }
  } catch (error) {
    console.error('加入购物车失败:', error)
    alert('加入购物车失败,请重试')
  }
}

// 联系卖家
const contactSeller = () => {
  // TODO: 实现联系卖家功能
  alert(`正在联系卖家 ${bookData.value.seller_name}...`)
}
</script>

<style scoped>
/* 隐藏滚动条 */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* 行数限制 */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
