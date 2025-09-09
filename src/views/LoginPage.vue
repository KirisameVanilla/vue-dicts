<template>
  <div>
    <header class="flex items-center bg-white h-[174px]">
      <div class="mx-auto max-w-[1030px]">
        <router-link to="/" class="block bg-[url('/images/LOGO.png')] bg-contain bg-no-repeat pl-[100px] w-[237px] h-[61px] font-deserta text-2xl leading-[31px]">
          CiDian
        </router-link>
      </div>
    </header>

    <main class="relative overflow-visible">
      <div class="mx-auto pt-10 max-w-[1030px]">
        <ul class="flex flex-col items-end font-deserta text-5xl leading-[76px]">
          <li class="font-inter text-gray-500 text-lg">BONJOUR</li>
          <li class="text-blue-700">{{ isLogin ? 'WELCOME BACK' : 'JOIN US TODAY' }}</li>
          <li>LET'S GET STARTED</li>
        </ul>

        <!-- 切换按钮 -->
        <div class="flex bg-gray-100 mt-8 p-1 rounded-full w-fit">
          <button 
            @click="isLogin = true"
            :class="[
              'px-6 py-2 rounded-full transition-all font-inter',
              isLogin ? 'bg-blue-700 text-white' : 'text-gray-600 hover:text-blue-700'
            ]"
          >
            登录
          </button>
          <button 
            @click="isLogin = false"
            :class="[
              'px-6 py-2 rounded-full transition-all font-inter',
              !isLogin ? 'bg-blue-700 text-white' : 'text-gray-600 hover:text-blue-700'
            ]"
          >
            注册
          </button>
        </div>

        <form @submit.prevent="isLogin ? handleLogin() : handleRegister()" class="mt-[77px] max-w-[401px]">
          <div v-if="error" class="bg-red-100 mb-4 p-3 border border-red-400 rounded text-red-700">
            {{ error }}
          </div>
          <div v-if="successMessage" class="bg-green-100 mb-4 p-3 border border-green-400 rounded text-green-700">
            {{ successMessage }}
          </div>
          
          <label class="block mb-6 text-gray-500 text-xl">用户名</label>
          <input 
            :value="isLogin ? loginForm.name : registerForm.username"
            @input="handleUsernameInput"
            type="text" 
            required
            class="px-8 border border-blue-700 focus:border-blue-500 rounded-full outline-none w-full h-[63px] text-2xl" 
          />

          <label class="block mt-8 mb-6 text-gray-500 text-xl">密码</label>
          <input 
            :value="isLogin ? loginForm.password : registerForm.password"
            @input="handlePasswordInput"
            type="password" 
            required
            class="px-8 border border-blue-700 focus:border-blue-500 rounded-full outline-none w-full h-[63px] text-2xl" 
          />

          <!-- 注册时显示确认密码 -->
          <template v-if="!isLogin">
            <label class="block mt-8 mb-6 text-gray-500 text-xl">确认密码</label>
            <input 
              v-model="confirmPassword"
              type="password" 
              required
              class="px-8 border border-blue-700 focus:border-blue-500 rounded-full outline-none w-full h-[63px] text-2xl" 
            />

            <label class="block mt-8 mb-6 text-gray-500 text-xl">语言偏好</label>
            <select 
              v-model="registerForm.lang_pref"
              class="bg-white px-8 border border-blue-700 focus:border-blue-500 rounded-full outline-none w-full h-[63px] text-2xl"
            >
              <option value="fr">法语</option>
              <option value="jp">日语</option>
              <option value="private">私人</option>
            </select>
          </template>

          <button 
            type="submit" 
            :disabled="loading"
            class="bg-blue-700 hover:bg-blue-600 disabled:opacity-50 mt-[72px] rounded-full w-[268px] h-[63px] text-white text-2xl disabled:cursor-not-allowed"
          >
            {{ loading ? (isLogin ? 'LOGGING IN...' : 'REGISTERING...') : (isLogin ? 'LOG IN' : 'REGISTER') }}
          </button>
        </form>
      </div>

      <!-- 背景图 -->
      <div class="top-4 -right-[200px] -z-10 absolute bg-[position:-100px_0] bg-[url('/images/9d1ecd03bf3f17a66e03547f54973cf5a254ac10a6b97a5bfb60098680db7160.png')] bg-auto bg-no-repeat w-[1200px] h-[800px]" />
    </main>

    <footer class="bg-gradient-to-t from-[#4284e8] to-transparent h-[465px]" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { useModal } from '../composables/useModal'

const router = useRouter()
const { login, register } = useAuth()
const { showSuccess, showError } = useModal()

const isLogin = ref(true)

const loginForm = ref({
  name: '',
  password: ''
})

const registerForm = ref({
  username: '',
  password: '',
  lang_pref: 'fr' as 'jp' | 'fr' | 'private',
  portrait: ''
})

const confirmPassword = ref('')
const loading = ref(false)
const error = ref('')
const successMessage = ref('')

// 处理用户名输入
const handleUsernameInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (isLogin.value) {
    loginForm.value.name = target.value
  } else {
    registerForm.value.username = target.value
  }
}

// 处理密码输入
const handlePasswordInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (isLogin.value) {
    loginForm.value.password = target.value
  } else {
    registerForm.value.password = target.value
  }
}

const handleLogin = async () => {
  if (!loginForm.value.name || !loginForm.value.password) {
    error.value = '请填写用户名和密码'
    return
  }

  loading.value = true
  error.value = ''

  try {
    const response = await login(loginForm.value)
    
    // 检查登录是否成功
    if (response && response.access_token) {
      // 显示成功modal
      showSuccess('登录成功！正在跳转...', 2000)
      
      // 2秒后跳转到字典页面
      setTimeout(() => {
        router.push('/dict')
      }, 2000)
    } else {
      showError('登录失败，请检查用户名和密码')
    }
  } catch (err: any) {
    console.error('Login error:', err)
    const errorMessage = err.response?.data?.detail || err.response?.data?.message || '登录失败，请检查用户名和密码'
    showError(errorMessage)
    error.value = errorMessage
  } finally {
    loading.value = false
  }
}

const handleRegister = async () => {
  // 验证表单
  if (!registerForm.value.username || !registerForm.value.password) {
    error.value = '请填写所有必填字段'
    return
  }

  if (registerForm.value.password !== confirmPassword.value) {
    error.value = '两次输入的密码不一致'
    return
  }

  if (registerForm.value.password.length < 6) {
    error.value = '密码长度至少6位'
    return
  }

  loading.value = true
  error.value = ''
  successMessage.value = ''

  try {
    const username = registerForm.value.username // 保存用户名
    const response = await register(registerForm.value)
    
    // 检查注册是否成功
    if (response && response.id) {
      // 显示成功modal
      showSuccess('注册成功！2秒后将切换到登录页面', 2000)
      
      // 将用户名填入登录表单
      loginForm.value.name = username
      
      // 2秒后切换到登录模式并清空注册表单
      setTimeout(() => {
        isLogin.value = true
        registerForm.value = {
          username: '',
          password: '',
          lang_pref: 'fr',
          portrait: ''
        }
        confirmPassword.value = ''
      }, 2000)
    } else {
      // 注册失败
      showError('注册失败，请检查返回信息')
    }
    
  } catch (err: any) {
    console.error('Register error:', err)
    const errorMessage = err.response?.data?.detail || err.response?.data?.message || '注册失败，请稍后重试'
    showError(errorMessage)
    error.value = errorMessage
  } finally {
    loading.value = false
  }
}

// 切换模式时清空错误和成功信息
const clearMessages = () => {
  error.value = ''
  successMessage.value = ''
}

// 监听模式切换
import { watch } from 'vue'
watch(isLogin, () => {
  clearMessages()
})
</script>