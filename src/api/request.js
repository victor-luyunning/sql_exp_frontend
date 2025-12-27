import axios from 'axios'

// 创建 axios 实例
const request = axios.create({
  baseURL: '/api',  // 使用 Vite 代理
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器 - 自动添加 token
request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.error('请求错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器 - 统一处理响应
request.interceptors.response.use(
  (response) => {
    const res = response.data
    
    // 后端返回格式: { code, message, data, timestamp }
    if (res.code === 200) {
      return res  // 成功返回完整响应
    } else {
      // 业务错误
      console.error('业务错误:', res.message)
      return Promise.reject(new Error(res.message || '请求失败'))
    }
  },
  (error) => {
    // HTTP 错误
    console.error('HTTP错误:', error)
    
    if (error.response) {
      const status = error.response.status
      
      if (status === 401) {
        // token 过期或无效，清除本地存储
        localStorage.removeItem('token')
        localStorage.removeItem('userInfo')
        // 不在这里跳转，而是让组件处理
        return Promise.reject(new Error('登录已过期，请重新登录'))
      } else if (status === 403) {
        return Promise.reject(new Error('没有权限访问'))
      } else if (status === 404) {
        return Promise.reject(new Error('请求的资源不存在'))
      } else if (status >= 500) {
        return Promise.reject(new Error('服务器错误，请稍后重试'))
      }
    }
    
    return Promise.reject(error)
  }
)

export default request
