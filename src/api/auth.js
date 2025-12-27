import request from './request'

// 用户登录
export const login = (data) => {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}

// 用户注册
export const register = (data) => {
  return request({
    url: '/auth/register',
    method: 'post',
    data
  })
}

// 退出登录
export const logout = () => {
  return request({
    url: '/auth/logout',
    method: 'post'
  })
}

// 检查用户名是否可用
export const checkUsername = (username) => {
  return request({
    url: '/auth/check-username',
    method: 'get',
    params: { username }
  })
}
