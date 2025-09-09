<template>
  <div>
    <AppHeader active="dict" />
    
    <SearchBar />
    
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
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'
import SearchBar from '../components/SearchBar.vue'
import { searchWord, type WordDefinition } from '../api/dict'

const route = useRoute()
const searchResult = ref<WordDefinition | null>(null)
const loading = ref(false)
const error = ref('')
const hasSearched = ref(false)

// 从路由参数执行搜索
const handleSearch = async (query: string, lang: string) => {
  if (!query.trim()) return

  loading.value = true
  error.value = ''
  hasSearched.value = true

  try {
    const result = await searchWord({
      lang_pref: lang,
      query_word: query.trim()
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

// 监听路由变化以响应搜索
watch(() => route.query, (newQuery) => {
  const q = newQuery.q as string
  const lang = newQuery.lang as string || 'jp'
  
  if (q) {
    handleSearch(q, lang)
  }
}, { immediate: true })
</script>