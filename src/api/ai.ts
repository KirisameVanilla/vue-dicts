import apiClient from './client'

/**
 * AI助手问答请求参数
 */
export interface AiQuestionRequest {
  word: string
  question: string
}

/**
 * AI助手问答响应
 */
export interface AiQuestionResponse {
  word: string
  answer: string
  model: string
  tokens_used: number
}

/**
 * 词语智能问答
 * @param data 问答参数
 * @returns AI回答
 */
export const askAiAssistant = async (data: AiQuestionRequest): Promise<AiQuestionResponse> => {
  try {
    const response = await apiClient.post<AiQuestionResponse>('/ai_assist/word/exp', data)
    return response.data
  } catch (error: any) {
    console.error('AI Assistant API error:', error)
    
    if (error.response) {
      const status = error.response.status
      const message = error.response.data?.message || 'AI助手请求失败'
      
      switch (status) {
        case 400:
          throw new Error('本月API使用量已超')
        case 401:
          throw new Error('请先登录后再使用AI助手')
        case 500:
          throw new Error('AI服务暂时不可用，请稍后重试')
        default:
          throw new Error(`AI助手请求失败：${message}`)
      }
    } else if (error.request) {
      throw new Error('网络连接失败，请检查网络连接')
    } else {
      throw new Error('AI助手请求失败，请稍后重试')
    }
  }
}

/**
 * 清除词语聊天记录
 * @param word 词语
 * @returns 清除结果
 */
export const clearAiHistory = async (word: string): Promise<{ msg: string }> => {
  try {
    const response = await apiClient.post<{ msg: string }>('/ai_assist/clear', null, {
      params: { word }
    })
    return response.data
  } catch (error: any) {
    console.error('Clear AI history error:', error)
    
    if (error.response) {
      const message = error.response.data?.message || '清除聊天记录失败'
      throw new Error(message)
    } else {
      throw new Error('清除聊天记录失败，请稍后重试')
    }
  }
}

/**
 * 通用AI对话（预留接口）
 * @returns 空响应
 */
export const universalAiChat = async (): Promise<void> => {
  try {
    await apiClient.post('/ai_assist/univer')
  } catch (error: any) {
    console.error('Universal AI chat error:', error)
    throw new Error('通用AI对话功能暂未开放')
  }
}
