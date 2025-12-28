<template>
  <div class="bg-background-light dark:bg-background-dark min-h-screen flex flex-col transition-colors duration-200">
    <!-- Header -->
    <AppHeader />

    <!-- Search Bar Section -->
    <div class="bg-surface-light dark:bg-surface-dark border-b border-slate-200 dark:border-slate-700 pt-8 pb-8 px-4 md:px-8">
      <div class="max-w-[960px] mx-auto flex flex-col gap-6">
        <div class="text-center">
          <h1 class="text-3xl md:text-4xl font-black tracking-tight text-text-main dark:text-white mb-2">
            寻找你下学期的教材
          </h1>
          <p class="text-text-muted dark:text-gray-400">
            支持按 教材名称、作者、ISBN 或 课程名 搜索
          </p>
        </div>
        <div class="relative w-full max-w-2xl mx-auto">
          <div class="flex w-full items-center rounded-xl bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-600 overflow-hidden h-14 focus-within:ring-2 ring-primary transition-all">
            <div class="pl-4 pr-2 text-text-muted dark:text-gray-400">
              <span class="material-symbols-outlined">search</span>
            </div>
            <input 
              v-model="searchQuery"
              @keyup.enter="handleSearch"
              class="w-full h-full bg-transparent border-none focus:ring-0 text-text-main dark:text-white placeholder:text-slate-400 text-base" 
              placeholder="试试搜索 '高等数学' 或 '978-0134093413'..."
            />
            <button 
              @click="handleSearch" 
              class="m-1 h-10 px-6 rounded-lg bg-primary hover:bg-primary-dark text-white font-bold text-sm transition-colors whitespace-nowrap flex-shrink-0"
            >
              搜索
            </button>
          </div>
        </div>
        <div class="flex justify-center flex-wrap gap-2 md:gap-3">
          <span class="text-sm font-medium text-text-muted dark:text-gray-400 py-1">快速筛选:</span>
          <button @click="setSearchType('title')" :class="[searchType === 'title' ? 'bg-primary/20 text-primary border-primary' : 'bg-slate-100 dark:bg-slate-700 hover:bg-primary/10 hover:text-primary', 'px-3 py-1 rounded-full text-sm font-medium text-text-main dark:text-gray-200 transition-colors border border-slate-200 dark:border-slate-600']">教材名称</button>
          <button @click="setSearchType('author')" :class="[searchType === 'author' ? 'bg-primary/20 text-primary border-primary' : 'bg-slate-100 dark:bg-slate-700 hover:bg-primary/10 hover:text-primary', 'px-3 py-1 rounded-full text-sm font-medium text-text-main dark:text-gray-200 transition-colors border border-slate-200 dark:border-slate-600']">作者</button>
          <button @click="setSearchType('isbn')" :class="[searchType === 'isbn' ? 'bg-primary/20 text-primary border-primary' : 'bg-slate-100 dark:bg-slate-700 hover:bg-primary/10 hover:text-primary', 'px-3 py-1 rounded-full text-sm font-medium text-text-main dark:text-gray-200 transition-colors border border-slate-200 dark:border-slate-600']">ISBN</button>
          <button @click="setSearchType('course')" :class="[searchType === 'course' ? 'bg-primary/20 text-primary border-primary' : 'bg-slate-100 dark:bg-slate-700 hover:bg-primary/10 hover:text-primary', 'px-3 py-1 rounded-full text-sm font-medium text-text-main dark:text-gray-200 transition-colors border border-slate-200 dark:border-slate-600']">课程名</button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <main class="flex-1 max-w-[1280px] w-full mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
      <!-- Sidebar Filters -->
      <aside class="lg:col-span-3 space-y-6">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold text-text-main dark:text-white">筛选条件</h2>
          <button @click="resetFilters" class="text-sm font-medium text-primary hover:text-primary-dark">重置</button>
        </div>
        <div class="flex flex-col gap-3">
          <!-- 成色筛选 -->
          <details class="group rounded-lg bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-700 overflow-hidden" open>
            <summary class="flex cursor-pointer items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors select-none">
              <span class="font-bold text-text-main dark:text-white text-sm">成色</span>
              <span class="material-symbols-outlined text-text-muted transition-transform group-open:rotate-180 text-lg">expand_more</span>
            </summary>
            <div class="px-4 pb-4 pt-1 space-y-2">
              <label class="flex items-center gap-3 cursor-pointer">
                <input v-model="filters.conditions" value="LIKE_NEW" class="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4 bg-white dark:bg-slate-800 dark:border-slate-600" type="checkbox"/>
                <span class="text-sm text-text-main dark:text-gray-300">全新 / 九九新</span>
              </label>
              <label class="flex items-center gap-3 cursor-pointer">
                <input v-model="filters.conditions" value="GOOD" class="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4 bg-white dark:bg-slate-800 dark:border-slate-600" type="checkbox"/>
                <span class="text-sm text-text-main dark:text-gray-300">良好</span>
              </label>
              <label class="flex items-center gap-3 cursor-pointer">
                <input v-model="filters.conditions" value="FAIR" class="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4 bg-white dark:bg-slate-800 dark:border-slate-600" type="checkbox"/>
                <span class="text-sm text-text-main dark:text-gray-300">一般</span>
              </label>
            </div>
          </details>

          <!-- 价格范围 -->
          <details class="group rounded-lg bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-700 overflow-hidden" open>
            <summary class="flex cursor-pointer items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors select-none">
              <span class="font-bold text-text-main dark:text-white text-sm">价格范围</span>
              <span class="material-symbols-outlined text-text-muted transition-transform group-open:rotate-180 text-lg">expand_more</span>
            </summary>
            <div class="px-4 pb-4 pt-1 space-y-3">
              <div class="flex items-center gap-2">
                <input 
                  v-model.number="filters.minPrice" 
                  type="number" 
                  min="0" 
                  placeholder="最低价" 
                  class="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-text-main dark:text-white text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <span class="text-text-muted dark:text-gray-400 text-sm">—</span>
                <input 
                  v-model.number="filters.maxPrice" 
                  type="number" 
                  min="0" 
                  placeholder="最高价" 
                  class="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-text-main dark:text-white text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div class="flex items-center justify-between text-xs text-text-muted dark:text-gray-400">
                <span>¥{{ filters.minPrice || 0 }}</span>
                <span>¥{{ filters.maxPrice || '无限' }}</span>
              </div>
            </div>
          </details>
        </div>
      </aside>

      <!-- Results Section -->
      <section class="lg:col-span-9 flex flex-col gap-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-700">
          <p class="text-text-muted dark:text-gray-400 text-sm">找到 <span class="font-bold text-text-main dark:text-white">{{ totalResults }}</span> 个关于 "{{ displayKeyword }}" 的结果</p>
          <div class="flex items-center gap-2">
            <span class="text-sm text-text-muted dark:text-gray-400 hidden sm:inline">排序方式:</span>
            <div class="relative group">
              <select v-model="sortBy" class="appearance-none bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-text-main dark:text-white text-sm rounded-lg pl-3 pr-8 py-2 focus:ring-primary focus:border-primary cursor-pointer">
                <option value="relevance">相关度</option>
                <option value="price_asc">价格: 从低到高</option>
                <option value="price_desc">价格: 从高到低</option>
                <option value="latest">最新发布</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-text-main dark:text-white">
                <span class="material-symbols-outlined text-lg">expand_more</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Book List -->
        <div v-if="loading" class="flex justify-center items-center py-20">
          <div class="text-text-muted dark:text-gray-400">加载中...</div>
        </div>
        
        <div v-else-if="books.length === 0" class="flex flex-col items-center justify-center py-20">
          <span class="material-symbols-outlined text-6xl text-text-muted dark:text-gray-600 mb-4">search_off</span>
          <p class="text-text-muted dark:text-gray-400 text-lg">没有找到相关教材</p>
          <p class="text-text-muted dark:text-gray-500 text-sm mt-2">试试其他关键词吧</p>
        </div>
        
        <div v-else class="flex flex-col gap-4">
          <!-- 动态渲染书籍卡片 -->
          <article 
            v-for="book in books" 
            :key="book.id" 
            @click="goToBook(book.id)" 
            class="group flex flex-col md:flex-row bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden hover:shadow-lg hover:border-primary/50 transition-all duration-200 cursor-pointer"
          >
            <div class="w-full md:w-48 h-48 md:h-auto shrink-0 bg-slate-100 dark:bg-slate-800 relative flex items-center justify-center p-4">
              <img 
                :alt="book.title" 
                class="h-full w-auto object-contain shadow-md rounded-sm transform group-hover:scale-105 transition-transform duration-300" 
                :src="book.cover_image || 'https://via.placeholder.com/200x280?text=No+Cover'"
                @error="$event.target.src='https://via.placeholder.com/200x280?text=No+Cover'"
              />
            </div>
            <div class="flex-1 p-5 flex flex-col justify-between">
              <div class="flex flex-col md:flex-row justify-between gap-4">
                <div class="space-y-2">
                  <h3 class="text-xl font-bold text-text-main dark:text-white group-hover:text-primary transition-colors">{{ book.title }}</h3>
                  <div class="text-sm text-text-muted dark:text-gray-400">
                    <p>作者 <span class="font-medium text-text-main dark:text-gray-200">{{ book.author }}</span></p>
                    <p class="font-mono text-xs mt-1">ISBN: {{ book.isbn }}</p>
                  </div>
                  <div class="flex gap-2 pt-2">
                    <span :class="['inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium border', getConditionClass(book.condition)]">
                      <span class="material-symbols-outlined text-[14px]">{{ getConditionIcon(book.condition) }}</span> 
                      成色: {{ getConditionLabel(book.condition) }}
                    </span>
                  </div>
                </div>
                <div class="flex flex-row md:flex-col justify-between items-center md:items-end gap-2 text-right">
                  <div>
                    <p class="text-2xl font-black text-primary">¥{{ book.price.toFixed(2) }}</p>
                    <p v-if="book.original_price" class="text-xs text-text-muted dark:text-gray-500 line-through">新书估价 ¥{{ book.original_price.toFixed(2) }}</p>
                  </div>
                  <button class="hidden md:flex h-9 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-sm px-4 hover:bg-primary hover:text-white transition-all">
                    查看详情
                  </button>
                </div>
              </div>
              <div class="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-600 bg-center bg-cover" :style="book.seller_avatar ? `background-image: url('${book.seller_avatar}')` : ''"></div>
                  <div class="text-sm">
                    <p class="font-medium text-text-main dark:text-white leading-none">{{ book.seller_name || '匿名卖家' }}</p>
                  </div>
                </div>
                <button class="md:hidden h-9 items-center justify-center rounded-lg bg-primary text-white font-bold text-sm px-4 shadow-sm">
                  查看详情
                </button>
              </div>
            </div>
          </article>
        </div>

        <!-- Pagination -->
        <div v-if="books.length > 0" class="flex justify-center items-center gap-2 pt-8">
          <button 
            @click="prevPage" 
            :disabled="currentPage === 1"
            :class="['flex items-center justify-center size-10 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-text-muted hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors', currentPage === 1 ? 'opacity-50 cursor-not-allowed' : '']"
          >
            <span class="material-symbols-outlined">chevron_left</span>
          </button>
          
          <!-- 页码按钮 -->
          <template v-if="totalPages <= 7">
            <button 
              v-for="page in totalPages" 
              :key="page"
              @click="goToPage(page)"
              :class="[
                'flex items-center justify-center size-10 rounded-lg font-bold transition-colors',
                currentPage === page 
                  ? 'bg-primary text-white shadow-md shadow-primary/30' 
                  : 'border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-text-main dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-slate-700'
              ]"
            >
              {{ page }}
            </button>
          </template>
          
          <template v-else>
            <button 
              @click="goToPage(1)"
              :class="[
                'flex items-center justify-center size-10 rounded-lg font-bold transition-colors',
                currentPage === 1 
                  ? 'bg-primary text-white shadow-md shadow-primary/30' 
                  : 'border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-text-main dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-slate-700'
              ]"
            >
              1
            </button>
            
            <span v-if="currentPage > 3" class="text-text-muted px-2">...</span>
            
            <template v-for="page in [currentPage - 1, currentPage, currentPage + 1]" :key="page">
              <button 
                v-if="page > 1 && page < totalPages"
                @click="goToPage(page)"
                :class="[
                  'flex items-center justify-center size-10 rounded-lg font-bold transition-colors',
                  currentPage === page 
                    ? 'bg-primary text-white shadow-md shadow-primary/30' 
                    : 'border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-text-main dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                ]"
              >
                {{ page }}
              </button>
            </template>
            
            <span v-if="currentPage < totalPages - 2" class="text-text-muted px-2">...</span>
            
            <button 
              @click="goToPage(totalPages)"
              :class="[
                'flex items-center justify-center size-10 rounded-lg font-bold transition-colors',
                currentPage === totalPages 
                  ? 'bg-primary text-white shadow-md shadow-primary/30' 
                  : 'border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-text-main dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-slate-700'
              ]"
            >
              {{ totalPages }}
            </button>
          </template>
          
          <button 
            @click="nextPage" 
            :disabled="currentPage === totalPages"
            :class="['flex items-center justify-center size-10 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-text-muted hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors', currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : '']"
          >
            <span class="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="bg-surface-light dark:bg-surface-dark border-t border-slate-200 dark:border-slate-700 py-8 mt-auto">
      <div class="max-w-[1280px] mx-auto px-4 md:px-8 text-center text-text-muted dark:text-gray-500 text-sm">
        <p>© 2023 CampusBooks. 校园二手书交易平台,始于2015。</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppHeader from '../components/AppHeader.vue'
import { searchBooks } from '../api/books'

const route = useRoute()
const router = useRouter()

// 搜索相关
const searchQuery = ref('')
const searchType = ref('title')
const sortBy = ref('relevance')

// 书籍列表数据
const books = ref([])
const totalResults = ref(0)
const loading = ref(false)

// 分页
const currentPage = ref(1)
const pageSize = ref(10)
const totalPages = computed(() => Math.ceil(totalResults.value / pageSize.value))

// 筛选条件
const filters = ref({
  conditions: [],
  minPrice: null,
  maxPrice: null
})

const displayKeyword = computed(() => {
  return searchQuery.value || route.query.keyword || '全部教材'
})

// 获取书籍列表
const fetchBooks = async () => {
  try {
    loading.value = true
    const params = {
      keyword: searchQuery.value || '',
      pageNum: currentPage.value,
      pageSize: pageSize.value,
      sortBy: sortBy.value
    }

    // 添加成色筛选
    if (filters.value.conditions.length > 0) {
      // 后端只支持单个成色,取第一个
      params.condition = filters.value.conditions[0]
    }

    // 添加价格范围
    if (filters.value.minPrice !== null && filters.value.minPrice !== '') {
      params.minPrice = filters.value.minPrice
    }
    if (filters.value.maxPrice !== null && filters.value.maxPrice !== '') {
      params.maxPrice = filters.value.maxPrice
    }

    const response = await searchBooks(params)
    if (response.code === 200) {
      books.value = response.data.records || []
      totalResults.value = response.data.total || 0
    }
  } catch (error) {
    console.error('获取书籍列表失败:', error)
    books.value = []
    totalResults.value = 0
  } finally {
    loading.value = false
  }
}

// 监听路由变化
watch(() => route.query.keyword, (newKeyword) => {
  // 支持空关键词(显示全部)
  searchQuery.value = newKeyword || ''
  currentPage.value = 1
  fetchBooks()
})

// 监听筛选条件变化
watch([filters, sortBy], () => {
  currentPage.value = 1
  fetchBooks()
}, { deep: true })

onMounted(() => {
  // 从URL参数获取关键词,如果没有则为空(显示全部)
  searchQuery.value = route.query.keyword || ''
  fetchBooks()
})

const handleSearch = () => {
  // 支持空搜索,显示全部书籍
  const keyword = searchQuery.value.trim()
  if (keyword) {
    router.push({ path: '/search', query: { keyword } })
  } else {
    // 清空搜索,显示全部
    router.push({ path: '/search' })
  }
}

const setSearchType = (type) => {
  searchType.value = type
}

const resetFilters = () => {
  filters.value = {
    conditions: [],
    minPrice: null,
    maxPrice: null
  }
}

const goToBook = (id) => {
  router.push(`/book/${id}`)
}

// 分页功能
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    fetchBooks()
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    fetchBooks()
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    fetchBooks()
  }
}

// 成色映射
const getConditionLabel = (condition) => {
  const map = {
    'LIKE_NEW': '九九新',
    'GOOD': '良好',
    'FAIR': '一般'
  }
  return map[condition] || condition
}

const getConditionClass = (condition) => {
  const map = {
    'LIKE_NEW': 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800',
    'GOOD': 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800',
    'FAIR': 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800'
  }
  return map[condition] || 'bg-gray-100 dark:bg-gray-900/20 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-800'
}

const getConditionIcon = (condition) => {
  const map = {
    'LIKE_NEW': 'auto_awesome',
    'GOOD': 'check_circle',
    'FAIR': 'info'
  }
  return map[condition] || 'info'
}
</script>
