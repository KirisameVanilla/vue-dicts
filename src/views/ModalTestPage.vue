<template>
  <div class="p-8">
    <h1 class="mb-8 text-2xl">Modal 测试页面</h1>
    
    <div class="space-x-4">
      <button 
        @click="showSuccess('这是一个成功消息！', 3000)"
        class="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white"
      >
        测试成功Modal
      </button>
      
      <button 
        @click="showError('这是一个错误消息！', 3000)"
        class="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white"
      >
        测试错误Modal
      </button>
      
      <button 
        @click="showWarning('这是一个警告消息！', 3000)"
        class="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded text-white"
      >
        测试警告Modal
      </button>
      
      <button 
        @click="showInfo('这是一个信息消息！', 3000)"
        class="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white"
      >
        测试信息Modal
      </button>
    </div>
    
    <div class="mt-8">
      <router-link to="/login" class="text-blue-600 underline">
        回到登录页面
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useModal } from '../composables/useModal'

const { showSuccess, showError, showWarning, showInfo } = useModal()
</script>
