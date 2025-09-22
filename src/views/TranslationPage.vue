<template>
  <div>
    <AppHeader />
    
    <!-- 翻译区域 -->
    <section class="bg-white py-12">
      <div class="mx-auto px-4 max-w-[1030px]">
        <div class="mb-8 text-center">
          <h1 class="mb-4 font-deserta text-blue-700 text-4xl">多语言翻译</h1>
          <p class="font-inter text-gray-600">支持中文、法语、日语互译，助力语言学习</p>
        </div>
        
        <div class="mx-auto max-w-[900px]">
          <div class="gap-6 grid grid-cols-1 md:grid-cols-2">
            <!-- 输入区域 -->
            <div class="bg-gray-50 p-6 rounded-lg">
              <div class="flex justify-between items-center mb-4">
                <h3 class="font-semibold text-gray-700">源语言</h3>
                <select v-model="sourceLang" class="px-3 py-1 border border-gray-300 rounded">
                  <option value="auto">自动检测</option>
                  <option value="zh">中文</option>
                  <option value="fr">法语</option>
                  <option value="jp">日语</option>
                </select>
              </div>
              <textarea
                v-model="sourceText"
                placeholder="请输入要翻译的文本..."
                class="p-4 border border-gray-300 focus:border-blue-500 rounded-lg outline-none w-full h-[200px] resize-none"
              ></textarea>
            </div>
            
            <!-- 输出区域 -->
            <div class="bg-blue-50 p-6 rounded-lg">
              <div class="flex justify-between items-center mb-4">
                <h3 class="font-semibold text-gray-700">目标语言</h3>
                <select v-model="targetLang" class="px-3 py-1 border border-gray-300 rounded">
                  <option value="zh">中文</option>
                  <option value="fr">法语</option>
                  <option value="jp">日语</option>
                </select>
              </div>
              <div class="bg-white p-4 border border-gray-300 rounded-lg w-full h-[200px] overflow-y-auto">
                <div v-if="loading" class="flex justify-center items-center h-full text-gray-500">
                  <div class="border-b-2 border-blue-700 rounded-full w-8 h-8 animate-spin"></div>
                  <span class="ml-2">翻译中...</span>
                </div>
                <div v-else-if="translationResult" class="text-gray-800 leading-relaxed">
                  {{ translationResult }}
                </div>
                <div v-else class="text-gray-400 italic">
                  翻译结果将在这里显示
                </div>
              </div>
            </div>
          </div>
          
          <!-- 操作按钮 -->
          <div class="flex justify-center space-x-4 mt-6">
            <button
              @click="handleTranslate"
              :disabled="loading || !sourceText.trim()"
              class="bg-blue-700 hover:bg-blue-600 disabled:opacity-50 px-8 py-3 rounded-full font-inter text-white disabled:cursor-not-allowed"
            >
              {{ loading ? '翻译中...' : '翻译' }}
            </button>
            <button
              @click="swapLanguages"
              class="hover:bg-blue-50 px-8 py-3 border border-blue-700 rounded-full font-inter text-blue-700"
            >
              ⇄ 交换语言
            </button>
            <button
              @click="clearText"
              class="hover:bg-gray-50 px-8 py-3 border border-gray-300 rounded-full font-inter text-gray-700"
            >
              清空
            </button>
          </div>
          
          <div v-if="error" class="bg-red-100 mt-4 px-4 py-3 border border-red-400 rounded text-red-700">
            {{ error }}
          </div>
        </div>
      </div>
    </section>

    <!-- 翻译历史 -->
    <section class="bg-gray-50 py-12">
      <div class="mx-auto px-4 max-w-[1030px]">
        <h2 class="mb-6 font-deserta text-blue-700 text-2xl">翻译历史</h2>
        
        <div v-if="translationHistory.length > 0" class="space-y-4">
          <div v-for="(item, index) in translationHistory" :key="index" class="bg-white shadow-sm p-4 rounded-lg">
            <div class="gap-4 grid grid-cols-1 md:grid-cols-2">
              <div>
                <p class="mb-1 text-gray-500 text-sm">{{ getLanguageDisplayName(item.sourceLang) }}</p>
                <p class="text-gray-800">{{ item.sourceText }}</p>
              </div>
              <div>
                <p class="mb-1 text-gray-500 text-sm">{{ getLanguageDisplayName(item.targetLang) }}</p>
                <p class="text-gray-800">{{ item.translationResult }}</p>
              </div>
            </div>
            <p class="mt-2 text-gray-400 text-xs">{{ item.timestamp }}</p>
          </div>
        </div>
        
        <div v-else class="py-12 text-gray-400 text-center">
          <div class="mb-4 text-6xl">📝</div>
          <p class="text-xl">暂无翻译历史</p>
          <p class="mt-2">开始翻译以建立您的历史记录</p>
        </div>
      </div>
    </section>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'
import { translateText, type TranslateRequest } from '../api/translate'

interface TranslationHistoryItem {
  sourceText: string
  translationResult: string
  sourceLang: string
  targetLang: string
  timestamp: string
}

// 语言显示名称映射
const langDisplayMap: Record<string, string> = {
  'zh': '中文',
  'fr': '法语', 
  'jp': '日语',
  'auto': '自动检测'
}

const sourceText = ref('')
const translationResult = ref('')
const sourceLang = ref('auto')
const targetLang = ref('zh')
const loading = ref(false)
const error = ref('')
const translationHistory = ref<TranslationHistoryItem[]>([])

// 真实翻译API调用
const handleTranslate = async () => {
  if (!sourceText.value.trim()) return

  loading.value = true
  error.value = ''

  try {
    // 准备API请求参数
    const translateParams: TranslateRequest = {
      query: sourceText.value.trim(),
      from_lang: sourceLang.value as 'auto' | 'fr' | 'jp' | 'zh',
      to_lang: targetLang.value as 'fr' | 'jp' | 'zh'
    }

    // 如果目标语言是auto，则不能翻译，需要选择具体语言
    if (targetLang.value === 'auto') {
      error.value = '目标语言不能为自动检测，请选择具体语言'
      return
    }

    // 调用翻译API
    const result = await translateText(translateParams)
    translationResult.value = result.translated_text
    
    // 添加到历史记录
    const historyItem: TranslationHistoryItem = {
      sourceText: sourceText.value,
      translationResult: result.translated_text,
      sourceLang: sourceLang.value,
      targetLang: targetLang.value,
      timestamp: new Date().toLocaleString('zh-CN')
    }
    
    translationHistory.value.unshift(historyItem)
    
    // 保存到localStorage
    localStorage.setItem('translationHistory', JSON.stringify(translationHistory.value.slice(0, 10))) // 只保存最近10条
    
  } catch (err: any) {
    console.error('Translation error:', err)
    error.value = err.message || '翻译失败，请稍后重试'
  } finally {
    loading.value = false
  }
}

const swapLanguages = () => {
  // 防止目标语言被设置为auto
  if (sourceLang.value === 'auto') {
    error.value = '无法交换：源语言为自动检测时不能进行语言交换'
    return
  }
  
  const temp = sourceLang.value
  sourceLang.value = targetLang.value
  targetLang.value = temp
  
  // 交换文本内容
  if (translationResult.value) {
    const tempText = sourceText.value
    sourceText.value = translationResult.value
    translationResult.value = tempText
  }
}

const clearText = () => {
  sourceText.value = ''
  translationResult.value = ''
  error.value = ''
}

// 获取语言显示名称
const getLanguageDisplayName = (langCode: string): string => {
  return langDisplayMap[langCode] || langCode
}

// 从localStorage加载翻译历史
onMounted(() => {
  const saved = localStorage.getItem('translationHistory')
  if (saved) {
    try {
      translationHistory.value = JSON.parse(saved)
    } catch (e) {
      console.error('Failed to load translation history:', e)
    }
  }
})
</script>
