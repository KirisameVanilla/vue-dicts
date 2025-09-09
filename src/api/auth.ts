import apiClient from './client'

export interface LoginRequest {
  name: string
  password: string
}

export interface RegisterRequest {
  username: string
  password: string
  lang_pref: 'jp' | 'fr' | 'private'
  portrait?: string
}

export interface LoginResponse {
  access_token: string
  token_type: string
  user: {
    id: number
    username: string
    is_admin: boolean
  }
}

export interface RegisterResponse {
  id: number
  message: string
}

// 用户登录
export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const response = await apiClient.post('/users/login', credentials)
  return response.data
}

// 用户注册
export const register = async (userData: RegisterRequest): Promise<RegisterResponse> => {
  // 确保 portrait 字段存在，如果没有则设置为空字符串
  const requestData = {
    ...userData,
    portrait: userData.portrait || ''
  }
  const response = await apiClient.post('/users/register', requestData)
  return response.data
}

// 用户登出
export const logout = async (): Promise<void> => {
  await apiClient.post('/users/logout')
  localStorage.removeItem('access_token')
  localStorage.removeItem('user')
}

// 获取当前用户信息
export const getCurrentUser = async () => {
  const response = await apiClient.get('/users/me')
  return response.data
}
