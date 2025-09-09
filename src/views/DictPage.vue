<template>
  <div>
    <AppHeader active="dict" />
    
    <!-- 搜索区域 -->
    <section class="bg-white py-12">
      <div class="mx-auto px-4 max-w-[1030px]">
        <div class="mb-8 text-center">
          <h1 class="mb-4 font-deserta text-blue-700 text-4xl">多语言词典查询</h1>
          <p class="font-inter text-gray-600">输入单词，获取详细释义和例句</p>
        </div>
        
        <div class="mx-auto max-w-[600px]">
          <div class="relative flex gap-4">
            <div class="relative flex-1">
              <input
                v-model="searchQuery"
                @keyup.enter="handleSearch"
                @input="handleInputChange"
                @focus="showSuggestions = true"
                @blur="handleInputBlur"
                type="text"
                placeholder="请输入单词..."
                class="px-6 border-2 border-blue-700 focus:border-blue-500 rounded-full outline-none w-full h-[60px] text-xl"
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
            
            <button
              @click="handleSearch"
              :disabled="loading || !searchQuery.trim()"
              class="bg-blue-700 hover:bg-blue-600 disabled:opacity-50 rounded-full w-[120px] h-[60px] font-inter text-white disabled:cursor-not-allowed"
            >
              {{ loading ? '搜索中...' : '搜索' }}
            </button>
          </div>
          
          <div class="flex justify-center mt-4">
            <select v-model="selectedLang" class="px-4 py-2 border border-gray-300 rounded">
              <option value="jp">日语</option>
              <option value="fr">法语</option>
            </select>
          </div>
        </div>
      </div>
    </section>

    <!-- 搜索结果 -->
    <section class="bg-gray-50 py-12 min-h-[400px]">
      <div class="mx-auto px-4 max-w-[1030px]">
        <div v-if="error" class="bg-red-100 mb-6 px-4 py-3 border border-red-400 rounded text-red-700">
          {{ error }}
        </div>
        
        <div v-if="searchResult" class="space-y-6">
          <h2 class="mb-6 font-deserta text-blue-700 text-2xl">搜索结果</h2>
          
          <div class="bg-white shadow-md p-6 rounded-lg">
            <div class="flex justify-between items-start mb-4">
              <h3 class="font-bold text-blue-700 text-2xl">{{ searchResult.query }}</h3>
              <div class="flex gap-2">
                <span 
                  v-for="(pos, index) in searchResult.pos" 
                  :key="index"
                  class="bg-blue-100 px-3 py-1 rounded-full text-blue-700 text-sm"
                >
                  {{ pos }}
                </span>
              </div>
            </div>
            
            <div class="space-y-4">
              <div 
                v-for="(content, index) in searchResult.contents" 
                :key="index"
                class="pl-4 border-blue-200 border-l-4"
              >
                <div class="mb-2">
                  <h4 class="mb-2 font-semibold text-gray-700">释义：</h4>
                  <p class="text-gray-800 leading-relaxed">{{ content.chi_exp }}</p>
                </div>
                
                <div v-if="content.example">
                  <h4 class="mb-2 font-semibold text-gray-700">例句：</h4>
                  <p class="bg-gray-50 p-3 rounded text-gray-600 italic">{{ content.example }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div v-else-if="!loading && hasSearched" class="py-12 text-gray-500 text-center">
          <div class="mb-4 text-6xl">📚</div>
          <p class="text-xl">未找到相关词汇</p>
          <p class="mt-2 text-gray-400">请尝试其他关键词</p>
        </div>
        
        <div v-else-if="!hasSearched" class="py-12 text-gray-400 text-center">
          <div class="mb-4 text-6xl">🔍</div>
          <p class="text-xl">开始您的词汇探索之旅</p>
          <p class="mt-2">在上方输入框中输入单词进行查询</p>
        </div>
      </div>
    </section>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'
import { searchWord, searchSuggest, type WordDefinition } from '../api/dict'

const route = useRoute()
const searchQuery = ref('')
const selectedLang = ref('jp')
const searchResult = ref<WordDefinition | null>(null)
const loading = ref(false)
const error = ref('')
const hasSearched = ref(false)
const suggestions = ref<string[]>([])
const showSuggestions = ref(false)
const debounceTimer = ref<number | null>(null)

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
    const response = await searchSuggest({
      query: query.trim(),
      language: selectedLang.value
    })
    suggestions.value = response.list || []
  } catch (error) {
    console.error('获取搜索建议失败:', error)
    suggestions.value = []
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

// 处理输入框失去焦点
const handleInputBlur = () => {
  // 延迟隐藏建议列表，让点击事件有时间执行
  setTimeout(() => {
    showSuggestions.value = false
  }, 200)
}

// 选择建议
const selectSuggestion = (suggestion: string) => {
  searchQuery.value = suggestion
  showSuggestions.value = false
  handleSearch()
}

// 从路由参数初始化搜索
onMounted(() => {
  const q = route.query.q as string
  const lang = route.query.lang as string
  
  if (q) {
    searchQuery.value = q
  }
  if (lang) {
    selectedLang.value = lang
  }
  
  // 如果有查询参数，自动执行搜索
  if (q) {
    handleSearch()
  }
})

const handleSearch = async () => {
  if (!searchQuery.value.trim()) return

  loading.value = true
  error.value = ''
  hasSearched.value = true

  try {
    const result = await searchWord({
      lang_pref: selectedLang.value,
      query_word: searchQuery.value.trim()
    })
    searchResult.value = result
  } catch (err: any) {
    console.error('Search error:', err)
    error.value = err.response?.data?.detail || '搜索失败，请稍后重试'
    searchResult.value = null
  } finally {
    loading.value = false
  }
}

// 监听语言变化，重新获取建议
watch(selectedLang, () => {
  if (searchQuery.value.trim()) {
    debouncedFetchSuggestions(searchQuery.value)
  }
})
</script>