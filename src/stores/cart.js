import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  // 状态 - 购物车项 [{ bookId, quantity }]
  const items = ref(JSON.parse(localStorage.getItem('cart') || '[]'))

  // 计算属性
  const itemCount = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))
  const isEmpty = computed(() => items.value.length === 0)

  // 添加到购物车
  const addItem = (bookId, quantity = 1) => {
    const existingItem = items.value.find(item => item.bookId === bookId)
    
    if (existingItem) {
      // 已存在，增加数量
      existingItem.quantity += quantity
    } else {
      // 不存在，新增
      items.value.push({ bookId, quantity })
    }
    
    saveToLocalStorage()
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
    saveToLocalStorage()
  }

  // 保存到 localStorage
  const saveToLocalStorage = () => {
    localStorage.setItem('cart', JSON.stringify(items.value))
  }

  return {
    items,
    itemCount,
    isEmpty,
    addItem,
    updateQuantity,
    removeItem,
    clearCart
  }
})
