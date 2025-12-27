import request from './request'

// 验证购物车
export const validateCart = (data) => {
  return request({
    url: '/cart/validate',
    method: 'post',
    data  // { items: [{ bookId, quantity }] }
  })
}

// 获取购物车商品详情
export const getCartItems = (data) => {
  return request({
    url: '/cart/items',
    method: 'post',
    data  // { items: [{ bookId, quantity }] }
  })
}
