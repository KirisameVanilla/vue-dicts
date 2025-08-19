<template>
  <div>
    <AppHeader active="dict" />
    
    <!-- 搜索区域 -->
    <section class="bg-white py-12">
      <div class="mx-auto px-4 max-w-[1030px]">
        <div class="mb-8 text-center">
          <h1 class="mb-4 font-deserta text-blue-700 text-4xl">法语词典查询</h1>
          <p class="font-inter text-gray-600">输入法语单词，获取详细释义和例句</p>
        </div>
        
        <div class="mx-auto max-w-[600px]">
          <div class="flex gap-4">
            <input
              v-model="searchQuery"
              @keyup.enter="handleSearch"
              type="text"
              placeholder="请输入法语单词..."
              class="flex-1 px-6 border-2 border-blue-700 focus:border-blue-500 rounded-full outline-none h-[60px] text-xl"
            />
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
              <option value="fr">法语</option>
              <option value="en">英语</option>
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
        
        <div v-if="searchResults.length > 0" class="space-y-6">
          <h2 class="mb-6 font-deserta text-blue-700 text-2xl">搜索结果</h2>
          
          <div v-for="(result, index) in searchResults" :key="index" class="bg-white shadow-md p-6 rounded-lg">
            <div class="flex justify-between items-start mb-4">
              <h3 class="font-bold text-blue-700 text-2xl">{{ result.word }}</h3>
              <span class="bg-blue-100 px-3 py-1 rounded-full text-blue-700 text-sm">
                {{ result.part_of_speech }}
              </span>
            </div>
            
            <div class="mb-4">
              <h4 class="mb-2 font-semibold text-gray-700">释义：</h4>
              <p class="text-gray-800 leading-relaxed">{{ result.meaning }}</p>
            </div>
            
            <div v-if="result.example">
              <h4 class="mb-2 font-semibold text-gray-700">例句：</h4>
              <p class="bg-gray-50 p-3 rounded text-gray-600 italic">{{ result.example }}</p>
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
          <p class="text-xl">开始您的法语词汇探索之旅</p>
          <p class="mt-2">在上方输入框中输入法语单词进行查询</p>
        </div>
      </div>
    </section>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'
import { searchWord, type WordDefinition } from '../api/dict'

const route = useRoute()
const searchQuery = ref('')
const selectedLang = ref('fr')
const searchResults = ref<WordDefinition[]>([])
const loading = ref(false)
const error = ref('')
const hasSearched = ref(false)

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
    const results = await searchWord({
      lang_pref: selectedLang.value,
      query_word: searchQuery.value.trim()
    })
    searchResults.value = results
  } catch (err: any) {
    console.error('Search error:', err)
    error.value = err.response?.data?.detail || '搜索失败，请稍后重试'
    searchResults.value = []
  } finally {
    loading.value = false
  }
}
</script>