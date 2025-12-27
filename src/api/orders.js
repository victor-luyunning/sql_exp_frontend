import request from './request'

// 创建订单
export const createOrder = (data) => {
  return request({
    url: '/orders/create',
    method: 'post',
    data  // { bookId, building, room, phone, paymentType, remark }
  })
}

// 获取我的订单列表
export const getMyOrders = (params) => {
  return request({
    url: '/orders',
    method: 'get',
    params  // { pageNum, pageSize, status }
  })
}

// 获取订单详情
export const getOrderDetail = (orderId) => {
  return request({
    url: `/orders/${orderId}`,
    method: 'get'
  })
}

// 取消订单
export const cancelOrder = (orderId) => {
  return request({
    url: `/orders/${orderId}/cancel`,
    method: 'put'
  })
}
