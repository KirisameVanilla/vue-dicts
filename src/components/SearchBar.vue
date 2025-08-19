<template>
  <section class="flex justify-center items-center bg-white h-[88px]">
    <div class="relative w-[804px]">
      <select 
        v-model="selectedLang"
        class="top-1/2 left-0 z-10 absolute bg-blue-700 px-8 py-3 border-none rounded-full outline-none text-white -translate-y-1/2 appearance-none cursor-pointer"
      >
        <option value="fr">法语</option>
        <option value="en">英语</option>
      </select>
      <input
          v-model="searchQuery"
          @keyup.enter="handleSearch"
          type="text"
          placeholder="请输入单词"
          class="pr-[70px] pl-[207px] border-[5px] border-blue-700 focus:border-blue-500 rounded-full outline-none w-full h-[56px] text-xl"
      />
      <button 
        @click="handleSearch"
        class="top-1/2 right-0 absolute bg-[length:60%] bg-[url('/images/search.png')] bg-blue-700 hover:bg-blue-600 bg-no-repeat bg-center rounded-full w-[56px] h-[56px] -translate-y-1/2" 
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchQuery = ref('')
const selectedLang = ref('fr')

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    // 跳转到词典页面并传递搜索参数
    router.push({
      name: 'Dict',
      query: {
        q: searchQuery.value.trim(),
        lang: selectedLang.value
      }
    })
  }
}
</script>