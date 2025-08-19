<template>
  <header class="flex items-center bg-white h-[174px]">
    <div class="flex items-center mx-auto w-full max-w-[1030px]">
      <!-- Logo -->
      <router-link to="/" class="block bg-[url('/images/LOGO.png')] bg-contain bg-no-repeat pl-[100px] w-[237px] h-[61px] font-deserta text-blue-700 text-5xl leading-[60px]">
        CiDian
      </router-link>

      <!-- Nav -->
      <nav class="flex space-x-[53px] ml-[187px] text-xl">
        <router-link v-slot="{ isActive }" to="/dict">
          <a
              :class="[
              'w-[87px] text-center py-2 border-b-4 transition-colors duration-300 font-inter',
              isActive ? 'border-b-blue-700' : 'border-b-transparent',
              'hover:border-b-blue-700'
            ]"
          >
            查词
          </a>
        </router-link>

        <router-link v-slot="{ isActive }" to="/trans">
          <a
              :class="[
              'w-[87px] text-center py-2 border-b-4 transition-colors duration-300 font-inter',
              isActive ? 'border-b-blue-700' : 'border-b-transparent',
              'hover:border-b-blue-700'
            ]"
          >
            翻译
          </a>
        </router-link>

        <router-link v-slot="{ isActive }" to="/write">
          <a
              :class="[
              'w-[87px] text-center py-2 border-b-4 transition-colors duration-300 font-inter',
              isActive ? 'border-b-blue-700' : 'border-b-transparent hover:border-b-blue-700'
            ]"
          >
            写作指导
          </a>
        </router-link>
      </nav>

      <!-- User -->
      <div class="flex items-center space-x-4 ml-auto">
        <template v-if="isAuthenticated">
          <span class="font-inter text-gray-700">{{ user?.username }}</span>
          <a href="#" class="block bg-gray-300 border-2 border-blue-700 rounded-full w-[42px] h-[42px]" />
          <a href="#" class="bg-[url('/images/bell.png')] bg-cover w-[25px] h-[32px]" />
          <button @click="handleLogout" class="bg-[url('/images/icon_任务栏收缩.png')] bg-cover w-[42px] h-[42px]" />
        </template>
        <template v-else>
          <router-link to="/login" class="bg-blue-700 hover:bg-blue-600 px-6 py-2 rounded-full font-inter text-white">
            登录
          </router-link>
        </template>
      </div>
    </div>
  </header>
</template>
<script setup lang="ts">
import { useAuth } from '../composables/useAuth'

const { user, isAuthenticated, logout } = useAuth()

const handleLogout = async () => {
  await logout()
}
</script>