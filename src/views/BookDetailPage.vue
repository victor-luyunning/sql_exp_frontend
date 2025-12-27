<template>
  <div class="bg-background-light dark:bg-background-dark font-body text-[#111418] dark:text-white transition-colors duration-200">
    <div class="flex flex-col min-h-screen">
      <!-- Header -->
      <header class="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f2f4] dark:border-b-gray-800 bg-white dark:bg-[#101922] px-6 lg:px-10 py-3">
        <div class="flex items-center gap-8">
          <div class="flex items-center gap-4 text-[#111418] dark:text-white cursor-pointer" @click="router.push('/')">
            <div class="size-8 text-primary">
              <svg class="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z" fill="currentColor"></path>
              </svg>
            </div>
            <h2 class="text-lg font-bold leading-tight tracking-[-0.015em] font-display">CampusBooks</h2>
          </div>
          <nav class="hidden md:flex items-center gap-9">
            <router-link to="/" class="text-[#111418] dark:text-gray-200 text-sm font-medium leading-normal hover:text-primary transition-colors">首页</router-link>
            <router-link to="/search" class="text-primary text-sm font-medium leading-normal">教材</router-link>
            <a class="text-[#111418] dark:text-gray-200 text-sm font-medium leading-normal hover:text-primary transition-colors" href="#">出售</a>
            <router-link to="/profile" class="text-[#111418] dark:text-gray-200 text-sm font-medium leading-normal hover:text-primary transition-colors">个人中心</router-link>
          </nav>
        </div>
        <div class="flex flex-1 justify-end gap-4 md:gap-8 items-center">
          <label class="hidden md:flex flex-col min-w-40 !h-10 max-w-64">
            <div class="flex w-full flex-1 items-stretch rounded-lg h-full group focus-within:ring-2 ring-primary/20 transition-all">
              <div class="text-[#617589] dark:text-gray-400 flex border-none bg-[#f0f2f4] dark:bg-gray-800 items-center justify-center pl-4 rounded-l-lg border-r-0">
                <span class="material-icons text-[20px]">search</span>
              </div>
              <input v-model="searchQuery" @keyup.enter="handleSearch" class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] dark:text-white focus:outline-0 focus:ring-0 border-none bg-[#f0f2f4] dark:bg-gray-800 focus:border-none h-full placeholder:text-[#617589] dark:placeholder:text-gray-500 px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal" placeholder="搜索书名、ISBN..." type="text"/>
            </div>
          </label>
          <div class="flex items-center gap-4">
            <button @click="router.push('/cart')" class="flex items-center justify-center rounded-full size-10 bg-[#f0f2f4] dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <span class="material-icons text-[#111418] dark:text-white">shopping_cart</span>
            </button>
            <div class="bg-center bg-no-repeat bg-cover rounded-full size-10 ring-2 ring-white dark:ring-gray-800 cursor-pointer" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCgA4yoDBDJEwkcyCVWnSl9-WV0qMCKNEGFhDe5StkpkCdiLQGq0jr2sjzabSQn0uT_Wmsv564ZaCODrf4b3bN54qt0t5ZG42LvBAuw-3Q1y6D2Y170epYiENnKRBMP98u4nYnjETAGhd2H-k4zZNcOPi07jsn0Al2zx93-fIc0y0GpMtgmYGnu-Mhyc_DPwAtiv9ey4-0FBTwQad6WyimWDXSInYVxvZTOrQaRE-a6LTV1Qby9uOsiBOjNRMV-4eUfNBMpzBljTht1");'></div>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="flex-1 px-4 md:px-10 lg:px-40 py-8 max-w-[1440px] mx-auto w-full">
        <!-- Breadcrumb -->
        <div class="flex flex-wrap gap-2 pb-6 text-sm">
          <router-link to="/" class="text-[#617589] dark:text-gray-400 font-medium hover:text-primary transition-colors">首页</router-link>
          <span class="text-[#617589] dark:text-gray-500 font-medium">/</span>
          <router-link to="/search" class="text-[#617589] dark:text-gray-400 font-medium hover:text-primary transition-colors">教材</router-link>
          <span class="text-[#617589] dark:text-gray-500 font-medium">/</span>
          <a class="text-[#617589] dark:text-gray-400 font-medium hover:text-primary transition-colors" href="#">{{ bookData.category }}</a>
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
              <div class="absolute top-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                <span class="material-icons text-sm align-middle mr-1">zoom_in</span>点击放大
              </div>
            </div>

            <!-- Thumbnail Gallery -->
            <div class="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              <button 
                v-for="(img, index) in bookData.images" 
                :key="index" 
                @click="currentImage = img"
                class="shrink-0 w-20 h-24 rounded overflow-hidden bg-white dark:bg-gray-800 transition-colors"
                :class="currentImage === img ? 'border-2 border-primary' : 'border border-[#f0f2f4] dark:border-gray-700 hover:border-primary/50'"
              >
                <div class="w-full h-full bg-cover bg-center" :style="`background-image: url('${img}');`"></div>
              </button>
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
                <p class="mb-4" v-html="bookData.sellerNotes"></p>
                <div class="p-3 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 rounded border border-yellow-200 dark:border-yellow-900/50 text-xs">
                  <strong>卖家诚信声明：</strong> 画廊中包含有高亮标记页面的照片。
                </div>
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
                  <span class="bg-[#f0f2f4] dark:bg-gray-700 text-[#617589] dark:text-gray-300 px-2 py-1 rounded text-xs font-bold uppercase tracking-wide">{{ bookData.department }}</span>
                </div>
                <div class="flex items-center gap-1 text-primary cursor-pointer" @click="toggleFavorite">
                  <span class="material-icons text-[18px]" :class="isFavorite ? 'fill-current' : ''">favorite</span>
                  <span class="text-xs font-medium hover:underline">{{ isFavorite ? '已收藏' : '收藏' }}</span>
                </div>
              </div>
              <h1 class="text-[#111418] dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-tight">{{ bookData.title }}</h1>
              <p class="text-[#617589] dark:text-gray-400 text-lg">作者： <span class="text-[#111418] dark:text-gray-200 font-medium">{{ bookData.author }}</span></p>
              <div class="flex items-center gap-2 mt-1">
                <div class="flex text-yellow-500">
                  <span v-for="i in 5" :key="i" class="material-icons text-[18px]" :style="getRatingStyle(i)">star</span>
                </div>
                <span class="text-sm font-medium text-[#111418] dark:text-gray-300">{{ bookData.rating }}</span>
                <span class="text-sm text-[#617589] dark:text-gray-500 underline decoration-dotted cursor-pointer hover:text-primary">{{ bookData.ratingCount.toLocaleString() }} 条全球评分</span>
              </div>
            </div>

            <hr class="border-[#f0f2f4] dark:border-gray-800"/>

            <!-- Price and Purchase Section -->
            <div class="bg-white dark:bg-[#15202b] rounded-xl border border-[#f0f2f4] dark:border-gray-700 p-6 shadow-sm">
              <div class="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center mb-6">
                <div>
                  <div class="flex items-baseline gap-3">
                    <span class="text-4xl font-bold text-primary">¥{{ bookData.price.toFixed(2) }}</span>
                    <span class="text-lg text-[#617589] dark:text-gray-500 line-through decoration-red-500/50">¥{{ bookData.originalPrice.toFixed(2) }}</span>
                    <span class="text-sm font-bold text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded-full">-{{ Math.round((1 - bookData.price / bookData.originalPrice) * 100) }}%</span>
                  </div>
                  <div class="mt-2 flex items-center gap-2">
                    <div class="flex h-6 shrink-0 items-center justify-center gap-x-1 rounded bg-orange-100 dark:bg-orange-900/30 px-2 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800">
                      <span class="material-icons text-[16px]">verified</span>
                      <p class="text-xs font-bold leading-normal">{{ bookData.condition }}</p>
                    </div>
                    <span class="text-xs text-[#617589] dark:text-gray-500">库存数量：{{ bookData.stock }} 件</span>
                  </div>
                </div>
                <div class="hidden md:flex flex-col items-end">
                  <span class="text-xs text-[#617589] dark:text-gray-500 mb-1">卖家</span>
                  <div class="flex items-center gap-2">
                    <div class="size-8 rounded-full bg-cover bg-center" :style="`background-image: url('${bookData.seller.avatar}');`"></div>
                    <div class="text-right">
                      <p class="text-sm font-medium leading-none text-[#111418] dark:text-white">{{ bookData.seller.name }}</p>
                      <div class="flex items-center justify-end gap-1 mt-0.5">
                        <span class="material-icons text-[12px] text-yellow-500" style="font-variation-settings: 'FILL' 1">star</span>
                        <span class="text-xs text-[#617589] dark:text-gray-400">{{ bookData.seller.rating }} ({{ bookData.seller.transactions }} 次交易)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex flex-col sm:flex-row gap-3">
                <button @click="addToCart" class="flex-1 bg-primary hover:bg-blue-600 text-white font-bold h-12 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
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
              <div>
                <p class="text-xs font-medium text-[#617589] dark:text-gray-500 uppercase tracking-wider mb-1">ISBN-13</p>
                <p class="text-sm font-medium text-[#111418] dark:text-gray-300 font-mono">{{ bookData.isbn13 }}</p>
              </div>
              <div>
                <p class="text-xs font-medium text-[#617589] dark:text-gray-500 uppercase tracking-wider mb-1">ISBN-10</p>
                <p class="text-sm font-medium text-[#111418] dark:text-gray-300 font-mono">{{ bookData.isbn10 }}</p>
              </div>
              <div>
                <p class="text-xs font-medium text-[#617589] dark:text-gray-500 uppercase tracking-wider mb-1">出版社</p>
                <p class="text-sm font-medium text-[#111418] dark:text-gray-300">{{ bookData.publisher }}</p>
              </div>
              <div>
                <p class="text-xs font-medium text-[#617589] dark:text-gray-500 uppercase tracking-wider mb-1">版本</p>
                <p class="text-sm font-medium text-[#111418] dark:text-gray-300">{{ bookData.edition }}</p>
              </div>
              <div class="col-span-2">
                <p class="text-xs font-medium text-[#617589] dark:text-gray-500 uppercase tracking-wider mb-1">分类</p>
                <div class="flex flex-wrap gap-2 mt-1">
                  <span v-for="tag in bookData.tags" :key="tag" class="inline-flex items-center px-2 py-1 rounded bg-[#f0f2f4] dark:bg-gray-800 text-xs font-medium text-[#617589] dark:text-gray-400">{{ tag }}</span>
                </div>
              </div>
            </div>

            <!-- Seller Info (Mobile) -->
            <div class="md:hidden mt-4 p-4 border border-[#f0f2f4] dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
              <span class="text-xs text-[#617589] dark:text-gray-500 mb-2 block uppercase tracking-wider font-bold">卖家信息</span>
              <div class="flex items-center gap-3">
                <div class="size-10 rounded-full bg-cover bg-center" :style="`background-image: url('${bookData.seller.avatar}');`"></div>
                <div>
                  <p class="text-base font-medium leading-none text-[#111418] dark:text-white">{{ bookData.seller.name }}</p>
                  <p class="text-xs text-[#617589] dark:text-gray-400 mt-1">{{ bookData.seller.department }} • {{ bookData.seller.year }}届</p>
                </div>
              </div>
            </div>

            <!-- Seller Notes (Mobile) -->
            <div class="lg:hidden mt-6">
              <h3 class="font-bold text-lg mb-2 text-[#111418] dark:text-white">卖家备注</h3>
              <p class="text-sm text-[#617589] dark:text-gray-300 mb-4 leading-relaxed">
                这本书在 CS 301 课程中使用了一个学期。封面边角有轻微磨损，但装订依然完好紧实。
                注意：第3章（排序算法）和第6章（堆排序）有少量黄色高亮标记。
              </p>
            </div>
          </div>
        </div>

        <!-- Seller's Other Books -->
        <div class="mt-16 pt-10 border-t border-[#f0f2f4] dark:border-gray-800">
          <h3 class="text-xl font-bold text-[#111418] dark:text-white mb-6">{{ bookData.seller.name }} 的其他教材</h3>
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
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const bookId = computed(() => route.params.id)

// 当前显示的图片
const currentImage = ref('')

// 活动标签页
const activeTab = ref('seller')

// 收藏状态
const isFavorite = ref(false)

// 搜索关键词
const searchQuery = ref('')

// 书籍详情数据（模拟数据）
const bookData = ref({
  title: '算法导论 (Introduction to Algorithms)',
  author: 'Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein',
  category: '计算机科学',
  department: '计算机系',
  rating: 4.5,
  ratingCount: 1204,
  reviewCount: 12,
  price: 298.00,
  originalPrice: 680.00,
  condition: '二手 - 良好 (Used - Good)',
  stock: 1,
  isbn13: '978-0262046305',
  isbn10: '026204630X',
  publisher: 'MIT Press',
  edition: '第4版 (2022年4月5日)',
  tags: ['计算机科学', '算法', '数据结构'],
  seller: {
    name: 'Alex Smith',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDn_bg98erl0QHcmbcgm6xHtb4TQ_hYyfuk39gVlMdTrd3ryADoBfdiySNbT7n8yer4ty3LCFLw615SZRDOdBnN3V9dOESSRGggje2iUoQ35G_15Wa0cyNnzmhMvCmVYQ33U2yfqP_7JtQ8R7YzUiIMp1ZO_kODXhdyIRYPzLitkLrPKYMrIzmtn_slUIrJL61gq8Q6RSXOR2owoKgoIFTXb_f-hj4QJqGuUhodQF2tLIxdIrjcddDDT1lRLsKQjUKWkDSD2LOcv0RU',
    rating: 4.8,
    transactions: 24,
    department: '计算机系',
    year: 2025
  },
  sellerNotes: '这本书在 CS 301 课程中使用了一个学期。封面边角有轻微磨损，但装订依然完好紧实。<br/><br/>注意：第3章（排序算法）和第6章（堆排序）有少量黄色高亮标记。其余页面整洁干净，无缺页。',
  images: [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDrtBZCGq__Rkf2NMGA2K8Qqt8R62_HnWkbAFls_WNTxm_J5fU1XU7AwIWjBosHurwTp-N3-joaD7t2X--K-lXZMFQLPB_plG6b-DYsR4QKaY4Mm8RXh_CKfvFK6SoKoC26JbJFLuatba0HeVRxlxseUJjGm9bc4b7IvuFwhqw0hmRoaYq71aW_yr_8umGQxwLyGkJcCtrn1fLkNTqtt6v7FP_orAiiLe6KL-IpJsJHzA8P60VcG9lwEte2iLMtEHQpbZDBN5A_Eo-B',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCPxY35SnxFpk41a75XWSgtwgpw6P7ViQula0BndncFrEs_Co6rCAkdyR8-KpMTAb6GxjYPS1myb9XfLzIpAQSPq0I5Q-F5DQct2qi117umyYI5vBRr9b6dXvQ1UlxAxcFFVHYA4zHELtW2LE9D1oS04XDRuqNdSCh9IKhI0JQQPy91XWF1P693wHZoQExTNNz3GNgm7cu2PQCwpZ-5S30arHOnEmjrSZRBdaQUcSqJTtPf70LFBIjgkSIdzo7AFHi00aXMnxC3qec_',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCGKDVEb8z03vZR0lEt1TbIFz2NL3mTEJ_Zy8auXexxTSzXQ7dT38iFp5Jjf2D3xZ1zOL-n_x46CireHTuXhSWrl_MzWvMUVhhMwlDKSY2pwul04ha4T_EjfcCU6tJC8HNq7OGCzEdc2ySlA4oJ5JQk49DkFOvi__EHjGUQwkad1y90_05L4AA8Op4PRcKvKoe2usFSEmldsePdP6AeKcm6EhWSylLN8CMyMdrCmc8KsjGBiSyX2R6VP4qpr0vqe6_ArVG5xbd0IN8m'
  ]
})

// 相关书籍（卖家的其他书籍）
const relatedBooks = ref([
  {
    id: 2,
    title: '人工智能：一种现代的方法',
    price: 398,
    condition: '二手 - 99新',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8L7aTesgpPoTXihX39S-qoGVnQioHLmhnb7Ae_Nr6k4x2HUjByDvHV8_s9ctJF6--NsnwLX4fruwSISWVk5Kp9n_fjJLrx6IW0sysIpR6ZYNJAlcSRQdLznYoxxr-GViKNq5s_3eTL-zeb1be013zFUvpCsbFNJdBbEiQGC5-uD6D0eBCkCSVYD18f_wxm5oK9U1Wc5uAT7k4A2HDAgR_U9olskSpo9J2gaCpt7rXzV-uQFfM7qaI6Ct9yPVnA1dB1jZPjVo0rVRd'
  },
  {
    id: 3,
    title: '操作系统概念 (恐龙书)',
    price: 228,
    condition: '二手 - 可接受',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxoswYahWfFQKWg-sRcofr1T94kX-KMLnYC9vjNaY3sdvk5uUWztomf8-Ew80XNoq6pfTZ6ZXrS9CkyAm5AwY41skvGJBNqB6cBicS1j_gG7T5Mg64qT3BrAnzsLQXXQvAJyNFN51q99rie96Di8SCDUp5SvSXiRqCkuv-VDJ1JYz2iAxPtbIdoPkNz0kNZT9reCtKmrn0HXPCcNh18jyvpUw8mPJpmzc7aN7FBPiOfG2GXwpOlCJgfU0Ag1MbztoadRv-rSS5UlFr'
  }
])

// 初始化当前图片
currentImage.value = bookData.value.images[0]

// 获取星级样式
const getRatingStyle = (index) => {
  const rating = bookData.value.rating
  if (index <= Math.floor(rating)) {
    return "font-variation-settings: 'FILL' 1"
  } else if (index === Math.ceil(rating) && rating % 1 !== 0) {
    return "font-variation-settings: 'FILL' 0.5"
  }
  return "font-variation-settings: 'FILL' 0"
}

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
const addToCart = () => {
  // TODO: 实现加入购物车逻辑
  alert(`已将《${bookData.value.title}》加入购物车`)
  router.push('/cart')
}

// 联系卖家
const contactSeller = () => {
  // TODO: 实现联系卖家功能
  alert(`正在联系卖家 ${bookData.value.seller.name}...`)
}

// 处理搜索
const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: '/search', query: { keyword: searchQuery.value } })
  }
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
