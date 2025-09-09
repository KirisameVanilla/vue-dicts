<template>
  <section class="flex justify-center items-center bg-white h-[88px]">
    <div class="relative w-[804px]" :class="{ 'focused': isInputFocused }">
      <select 
        v-model="selectedLang"
        class="top-1/2 left-0 z-10 absolute px-8 py-3 border-none rounded-full outline-none text-white transition-colors -translate-y-1/2 duration-200 appearance-none cursor-pointer"
        :style="{ backgroundColor: isInputFocused ? '#3b82f6' : '#1d4ed8' }"
      >
        <option value="jp">日语</option>
        <option value="fr">法语</option>
      </select>
      <input
          v-model="searchQuery"
          @keyup.enter="handleSearch"
          @input="handleInputChange"
          @focus="handleInputFocus"
          @blur="handleInputBlur"
          type="text"
          placeholder="请输入单词"
          class="pr-[70px] pl-[160px] border-[5px] border-blue-700 focus:border-blue-500 rounded-full outline-none w-full h-[56px] text-xl transition-colors duration-200"
      />
      <button 
        @click="handleSearch"
        @mouseenter="handleButtonMouseEnter"
        @mouseleave="handleButtonMouseLeave"
        ref="searchButton"
        class="top-1/2 right-0 absolute bg-[length:60%] bg-[url('/images/search.png')] bg-no-repeat bg-center rounded-full w-[56px] h-[56px] transition-colors -translate-y-1/2 duration-200" 
        :style="{ backgroundColor: buttonBgColor }"
      />
      
      <!-- 搜索推荐下拉框 -->
      <div 
        v-if="showSuggestions && suggestions.length > 0"
        class="top-full left-0 z-20 absolute bg-white shadow-lg mt-1 border border-gray-200 rounded-lg w-full max-h-60 overflow-y-auto"
      >
        <div
          v-for="(suggestion, index) in suggestions"
          :key="index"
          @mousedown="selectSuggestion(suggestion)"
          class="hover:bg-gray-100 px-4 py-2 text-left cursor-pointer"
        >
          {{ suggestion }}
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import { searchSuggest } from '../api/dict'

const router = useRouter()
const searchQuery = ref('')
const selectedLang = ref('jp')
const suggestions = ref<string[]>([])
const showSuggestions = ref(false)
const isInputFocused = ref(false)
const isButtonHovered = ref(false)
const debounceTimer = ref<number | null>(null)
const isLoading = ref(false)

// 计算按钮背景色
const buttonBgColor = computed(() => {
  if (isButtonHovered.value) {
    return isInputFocused.value ? '#60a5fa' : '#2563eb' // hover时的颜色
  }
  return isInputFocused.value ? '#3b82f6' : '#1d4ed8' // 默认颜色
})

// 防抖函数
const debounce = (fn: Function, delay: number) => {
  return (...args: any[]) => {
    if (debounceTimer.value) {
      clearTimeout(debounceTimer.value)
    }
    debounceTimer.value = window.setTimeout(() => {
      fn(...args)
    }, delay)
  }
}

// 获取搜索建议
const fetchSuggestions = async (query: string) => {
  if (!query || query.length < 1) {
    suggestions.value = []
    return
  }

  try {
    isLoading.value = true
    const response = await searchSuggest({
      query: query.trim(),
      language: selectedLang.value
    })
    suggestions.value = response.list || []
  } catch (error) {
    console.error('获取搜索建议失败:', error)
    suggestions.value = []
  } finally {
    isLoading.value = false
  }
}

// 防抖的搜索建议函数
const debouncedFetchSuggestions = debounce(fetchSuggestions, 300)

// 处理输入变化
const handleInputChange = () => {
  if (searchQuery.value.trim()) {
    debouncedFetchSuggestions(searchQuery.value)
    showSuggestions.value = true
  } else {
    suggestions.value = []
    showSuggestions.value = false
  }
}

// 处理输入框获得焦点
const handleInputFocus = () => {
  isInputFocused.value = true
  showSuggestions.value = true
}

// 处理输入框失去焦点
const handleInputBlur = () => {
  isInputFocused.value = false
  // 延迟隐藏建议列表，让点击事件有时间执行
  setTimeout(() => {
    showSuggestions.value = false
  }, 200)
}

// 处理按钮鼠标进入
const handleButtonMouseEnter = () => {
  isButtonHovered.value = true
}

// 处理按钮鼠标离开
const handleButtonMouseLeave = () => {
  isButtonHovered.value = false
}

// 选择建议
const selectSuggestion = (suggestion: string) => {
  searchQuery.value = suggestion
  showSuggestions.value = false
  handleSearch()
}

// 处理搜索
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

// 监听语言变化，重新获取建议
watch(selectedLang, () => {
  if (searchQuery.value.trim()) {
    debouncedFetchSuggestions(searchQuery.value)
  }
})
</script>