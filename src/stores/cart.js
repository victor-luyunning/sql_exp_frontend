import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getCartItems } from '@/api/cart'

export const useCartStore = defineStore('cart', () => {
  // 状态 - 购物车项 [{ bookId, quantity }]
  const items = ref(JSON.parse(localStorage.getItem('cart') || '[]'))
  
  // 详细信息缓存 - 确保初始化为空数组
  const itemsWithDetails = ref([])
  const loading = ref(false)

  // 计算属性
  const itemCount = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))
  const isEmpty = computed(() => items.value.length === 0)

  // 添加到购物车
  const addItem = (bookId, quantity = 1) => {
    const existingItem = items.value.find(item => item.bookId === bookId)
    
    if (existingItem) {
      // 二手书已存在，不增加数量，返回false表示已在购物车
      return false
    } else {
      // 不存在，新增
      items.value.push({ bookId, quantity })
      saveToLocalStorage()
      return true
    }
  }

  // 更新数量
  const updateQuantity = (bookId, quantity) => {
    const item = items.value.find(item => item.bookId === bookId)
    if (item) {
      item.quantity = quantity
      saveToLocalStorage()
    }
  }

  // 移除商品
  const removeItem = (bookId) => {
    items.value = items.value.filter(item => item.bookId !== bookId)
    saveToLocalStorage()
  }

  // 清空购物车
  const clearCart = () => {
    items.value = []
    itemsWithDetails.value = []
    saveToLocalStorage()
  }

  // 保存到 localStorage
  const saveToLocalStorage = () => {
    localStorage.setItem('cart', JSON.stringify(items.value))
  }
  
  // 获取购物车商品详情
  const fetchCartDetails = async () => {
    if (items.value.length === 0) {
      itemsWithDetails.value = []
      return
    }
    
    try {
      loading.value = true
      const response = await getCartItems({ items: items.value })
      
      if (response.code === 200) {
        itemsWithDetails.value = response.data.items
      } else {
        console.error('获取购物车详情失败:', response.message)
        itemsWithDetails.value = []
      }
    } catch (error) {
      console.error('获取购物车详情失败:', error)
      itemsWithDetails.value = []
    } finally {
      loading.value = false
    }
  }

  return {
    items,
    itemsWithDetails,
    loading,
    itemCount,
    isEmpty,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    fetchCartDetails
  }
})
