<template>
  <div>
    <AppHeader />
    
    <!-- 写作指导主区域 -->
    <section class="bg-white py-12">
      <div class="mx-auto px-4 max-w-[1030px]">
        <div class="mb-8 text-center">
          <h1 class="mb-4 font-deserta text-blue-700 text-4xl">法语写作指导</h1>
          <p class="font-inter text-gray-600">AI助力法语写作，提升表达水平</p>
        </div>
        
        <div class="mx-auto max-w-[900px]">
          <!-- 写作类型选择 -->
          <div class="mb-6">
            <h3 class="mb-3 font-semibold text-gray-700">写作类型</h3>
            <div class="flex flex-wrap gap-3">
              <button
                v-for="type in writingTypes"
                :key="type.value"
                @click="selectedType = type.value"
                :class="[
                  'px-4 py-2 rounded-full border transition-colors',
                  selectedType === type.value 
                    ? 'bg-blue-700 text-white border-blue-700' 
                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500'
                ]"
              >
                {{ type.label }}
              </button>
            </div>
          </div>
          
          <!-- 写作主题输入 -->
          <div class="mb-6">
            <h3 class="mb-3 font-semibold text-gray-700">写作主题或要求</h3>
            <input
              v-model="writingTopic"
              type="text"
              placeholder="请输入写作主题，如：我的假期、环境保护、法国文化等..."
              class="px-4 border border-gray-300 focus:border-blue-500 rounded-lg outline-none w-full h-[50px]"
            />
          </div>
          
          <!-- 写作内容区域 -->
          <div class="gap-6 grid grid-cols-1 lg:grid-cols-2 mb-6">
            <!-- 写作区域 -->
            <div class="bg-gray-50 p-6 rounded-lg">
              <h3 class="mb-4 font-semibold text-gray-700">您的法语作文</h3>
              <textarea
                v-model="userText"
                placeholder="请在这里写下您的法语作文..."
                class="p-4 border border-gray-300 focus:border-blue-500 rounded-lg outline-none w-full h-[300px] resize-none"
              ></textarea>
              <div class="flex justify-between items-center mt-2">
                <span class="text-gray-500 text-sm">字数: {{ userText.length }}</span>
                <button
                  @click="getWritingHelp"
                  :disabled="loading || !userText.trim()"
                  class="bg-blue-700 hover:bg-blue-600 disabled:opacity-50 px-4 py-2 rounded text-white disabled:cursor-not-allowed"
                >
                  {{ loading ? '分析中...' : '获取指导' }}
                </button>
              </div>
            </div>
            
            <!-- 指导建议区域 -->
            <div class="bg-blue-50 p-6 rounded-lg">
              <h3 class="mb-4 font-semibold text-gray-700">AI写作指导</h3>
              <div class="h-[300px] overflow-y-auto">
                <div v-if="loading" class="flex justify-center items-center h-full text-gray-500">
                  <div class="border-blue-700 border-b-2 rounded-full w-8 h-8 animate-spin"></div>
                  <span class="ml-2">AI正在分析您的作文...</span>
                </div>
                <div v-else-if="writingFeedback" class="space-y-4">
                  <div v-for="(section, key) in writingFeedback" :key="key" class="bg-white p-4 rounded">
                    <h4 class="mb-2 font-semibold text-blue-700">{{ getSectionTitle(String(key)) }}</h4>
                    <div v-if="Array.isArray(section)">
                      <ul class="space-y-1 list-disc list-inside">
                        <li v-for="(item, index) in section" :key="index" class="text-gray-700 text-sm">
                          {{ item }}
                        </li>
                      </ul>
                    </div>
                    <div v-else class="text-gray-700 text-sm">
                      {{ section }}
                    </div>
                  </div>
                </div>
                <div v-else class="flex justify-center items-center h-full text-gray-400 italic">
                  AI写作指导将在这里显示
                </div>
              </div>
            </div>
          </div>
          
          <!-- 错误信息 -->
          <div v-if="error" class="bg-red-100 mb-6 px-4 py-3 border border-red-400 rounded text-red-700">
            {{ error }}
          </div>
          
          <!-- 快速写作模板 -->
          <div class="bg-white p-6 border border-gray-200 rounded-lg">
            <h3 class="mb-4 font-semibold text-gray-700">写作模板参考</h3>
            <div class="gap-4 grid grid-cols-1 md:grid-cols-2">
              <div v-for="template in writingTemplates" :key="template.type" class="p-4 border border-gray-200 rounded">
                <h4 class="mb-2 font-semibold text-blue-700">{{ template.title }}</h4>
                <p class="mb-3 text-gray-600 text-sm">{{ template.description }}</p>
                <button
                  @click="useTemplate(template.template)"
                  class="text-blue-600 text-sm hover:underline"
                >
                  使用此模板
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'
import { reviewArticle, resetArticleSession } from '../api/writing'

const writingTypes = [
  { value: 'essay', label: '议论文' },
  { value: 'narrative', label: '记叙文' },
  { value: 'letter', label: '书信' },
  { value: 'diary', label: '日记' },
  { value: 'description', label: '描述文' },
  { value: 'report', label: '报告' }
]

const writingTemplates = [
  {
    type: 'essay',
    title: '议论文模板',
    description: '适用于表达观点和论证',
    template: `Introduction:\nDe nos jours, [主题] est un sujet qui préoccupe beaucoup de gens...\n\nDéveloppement:\nD'une part, ...\nD'autre part, ...\n\nConclusion:\nEn conclusion, je pense que...`
  },
  {
    type: 'letter',
    title: '正式书信模板',
    description: '适用于正式场合的书信写作',
    template: `[Lieu], le [date]\n\nMonsieur/Madame,\n\nJ'ai l'honneur de vous écrire pour...\n\nJe vous prie d'agréer, Monsieur/Madame, l'expression de mes salutations distinguées.\n\n[Signature]`
  },
  {
    type: 'narrative',
    title: '记叙文模板',
    description: '适用于叙述事件和经历',
    template: `Il était une fois... / Un jour...\n\nTout d'abord...\nEnsuite...\nEnfin...\n\nCette expérience m'a appris que...`
  },
  {
    type: 'description',
    title: '描述文模板',
    description: '适用于描述人物、地点或事物',
    template: `[Objet de description] se trouve/est...\n\nPhysiquement, il/elle...\nDu point de vue du caractère...\n\nEn conclusion, [objet] est vraiment...`
  }
]

const selectedType = ref('essay')
const writingTopic = ref('')
const userText = ref('')
const writingFeedback = ref<any>(null)
const loading = ref(false)
const error = ref('')

const getSectionTitle = (key: string) => {
  const titles: Record<string, string> = {
    grammar: '语法建议',
    vocabulary: '词汇改进',
    structure: '结构优化',
    style: '文体建议',
    overall: '总体评价'
  }
  return titles[key] || key
}

const getWritingHelp = async () => {
  if (!userText.value.trim()) return

  loading.value = true
  error.value = ''

  try {
    // 调用真实的作文批改API
    const result = await reviewArticle({
      title_content: userText.value.trim(),
      article_type: writingTypes.find(t => t.value === selectedType.value)?.label || '议论文'
    }, 'fr-FR')
    
    // 将API返回的reply文本解析为结构化反馈
    // 这里简单地将整个回复作为overall显示
    // 如果API返回的是结构化的JSON，可以直接使用
    writingFeedback.value = {
      overall: result.reply,
      tokens: `使用Token数: ${result.tokens}`,
      conversation_length: `对话长度: ${result.conversation_length}`
    }
    
  } catch (err: any) {
    console.error('Writing help error:', err)
    error.value = err.message || '获取写作指导失败，请稍后重试'
  } finally {
    loading.value = false
  }
}

// 组件卸载时重置会话
onUnmounted(async () => {
  try {
    await resetArticleSession()
  } catch (err) {
    console.error('Failed to reset article session:', err)
  }
})

const useTemplate = (template: string) => {
  if (userText.value && !confirm('使用模板将替换当前内容，确定继续吗？')) {
    return
  }
  userText.value = template
}
</script>
