<template>
  <header class="bg-white h-[174px] flex items-center">
    <div class="max-w-[1030px] mx-auto flex items-center w-full">
      <!-- Logo -->
      <router-link to="/" class="block w-[237px] h-[61px] bg-[url('/images/LOGO.png')] bg-contain bg-no-repeat pl-[100px] leading-[60px] font-deserta text-5xl text-blue-700">
        CiDian
      </router-link>

      <!-- Nav -->
      <nav class="ml-[187px] flex space-x-[53px] text-xl">
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
      <div class="flex space-x-4 ml-auto">
        <a href="#" class="w-[42px] h-[42px] bg-gray-300 rounded-full border-2 border-primary block" />
        <a href="#" class="w-[25px] h-[32px] bg-[url('/images/bell.png')] bg-cover" />
        <a href="#" class="w-[42px] h-[42px] bg-[url('/images/icon_任务栏收缩.png')] bg-cover" />
      </div>
    </div>
  </header>
</template>
<script setup lang="ts">
</script>