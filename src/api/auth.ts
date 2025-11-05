import apiClient from './client'

export interface LoginRequest {
  name: string
  password: string
}

export interface RegisterRequest {
  username: string
  password: string
  email: string
  phone?: string
  lang_pref: 'jp' | 'fr' | 'private'
  portrait?: string
  code: string
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

export interface EmailVerifyRequest {
  email: string
}

export interface EmailVerifyResponse {
  message: string
}

export interface VerifyCodeRequest {
  email: string
  code: string
}

export interface VerifyCodeResponse {
  reset_token: string
}

export interface ResetPasswordRequest {
  password: string
}

export interface UpdateUserRequest {
  current_password: string
  new_username?: string
  new_password?: string
  new_language?: 'jp' | 'fr' | 'private'
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

// 邮箱验证 - 注册时
export const sendEmailVerification = async (data: EmailVerifyRequest): Promise<EmailVerifyResponse> => {
  const response = await apiClient.post('/users/register/email_verify', data)
  return response.data
}

// 邮箱找回密码（发送验证码）
export const sendPasswordResetEmail = async (data: EmailVerifyRequest): Promise<EmailVerifyResponse> => {
  const response = await apiClient.post('/users/auth/forget-password/email', data)
  return response.data
}

// 邮箱验证码验证
export const verifyEmailCode = async (data: VerifyCodeRequest): Promise<VerifyCodeResponse> => {
  const response = await apiClient.post('/users/auth/varify_code/email', data)
  return response.data
}

// 重置密码
export const resetPassword = async (data: ResetPasswordRequest, resetToken: string): Promise<{ message: string }> => {
  const response = await apiClient.post('/users/auth/reset-password', data, {
    headers: {
      'x-reset-token': resetToken
    }
  })
  return response.data
}

// 更新用户信息
export const updateUser = async (data: UpdateUserRequest): Promise<{ message: string }> => {
  const response = await apiClient.put('/users/update', data)
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
