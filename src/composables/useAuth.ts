import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { login as apiLogin, logout as apiLogout, register as apiRegister, type LoginRequest, type RegisterRequest } from '../api/auth'

// 全局状态
const user = ref<any>(null)
const token = ref<string | null>(null)

// 从localStorage恢复状态
const initAuth = () => {
  const savedToken = localStorage.getItem('access_token')
  const savedUser = localStorage.getItem('user')
  
  if (savedToken) {
    token.value = savedToken
  }
  
  if (savedUser) {
    try {
      user.value = JSON.parse(savedUser)
    } catch (e) {
      console.error('Failed to parse saved user:', e)
      localStorage.removeItem('user')
    }
  }
}

export const useAuth = () => {
  const router = useRouter()
  
  const isAuthenticated = computed(() => !!token.value && !!user.value)
  
  const login = async (credentials: LoginRequest) => {
    try {
      const response = await apiLogin(credentials)
      
      // 保存到状态
      token.value = response.access_token
      user.value = response.user
      
      // 保存到localStorage
      localStorage.setItem('access_token', response.access_token)
      localStorage.setItem('user', JSON.stringify(response.user))
      
      return response
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  }
  
  const register = async (userData: RegisterRequest) => {
    try {
      const response = await apiRegister(userData)
      return response
    } catch (error) {
      console.error('Registration failed:', error)
      throw error
    }
  }
  
  const logout = async () => {
    try {
      await apiLogout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // 无论API调用是否成功，都清除本地状态
      token.value = null
      user.value = null
      localStorage.removeItem('access_token')
      localStorage.removeItem('user')
      router.push('/login')
    }
  }
  
  return {
    user: computed(() => user.value),
    token: computed(() => token.value),
    isAuthenticated,
    login,
    register,
    logout
  }
}

// 初始化认证状态
initAuth()
