import request from './request'

// 获取当前用户信息
export const getUserInfo = () => {
  return request({
    url: '/user/me',
    method: 'get'
  })
}

// 更新用户信息
export const updateUserInfo = (data) => {
  return request({
    url: '/user/profile',
    method: 'put',
    data  // { email, studentId, phone, avatar, department, grade }
  })
}

// 检查用户名是否可用
export const checkUsername = (username) => {
  return request({
    url: '/user/check-username',
    method: 'get',
    params: { username }
  })
}
