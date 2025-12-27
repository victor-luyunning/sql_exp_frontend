import request from './request'

// 获取最新教材列表
export const getLatestBooks = () => {
  return request({
    url: '/books/latest',
    method: 'get'
  })
}

// 搜索教材
export const searchBooks = (params) => {
  return request({
    url: '/books/search',
    method: 'get',
    params  // { keyword, condition, minPrice, maxPrice, pageNum, pageSize }
  })
}

// 获取教材详情
export const getBookDetail = (id) => {
  return request({
    url: `/books/${id}`,
    method: 'get'
  })
}

// 获取卖家的其他教材
export const getSellerBooks = (sellerId) => {
  return request({
    url: `/books/seller/${sellerId}`,
    method: 'get'
  })
}

// 发布教材
export const publishBook = (data) => {
  return request({
    url: '/books/publish',
    method: 'post',
    data
  })
}

// 更新教材信息
export const updateBook = (id, data) => {
  return request({
    url: `/books/${id}`,
    method: 'put',
    data
  })
}

// 删除教材
export const deleteBook = (id) => {
  return request({
    url: `/books/${id}`,
    method: 'delete'
  })
}
