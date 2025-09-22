import apiClient from './client'

/**
 * 翻译接口参数
 */
export interface TranslateRequest {
  query: string
  from_lang?: 'auto' | 'fr' | 'jp' | 'zh' | 'en'
  to_lang: 'fr' | 'jp' | 'zh' | 'en'
}

/**
 * 翻译接口响应
 */
export interface TranslateResponse {
  translated_text: string
}

/**
 * 翻译文本
 * @param params 翻译参数
 * @returns 翻译结果
 */
export const translateText = async (params: TranslateRequest): Promise<TranslateResponse> => {
  try {
    const response = await apiClient.post<TranslateResponse>('/translate', params)
    return response.data
  } catch (error: any) {
    console.error('Translation API error:', error)
    
    // 处理不同类型的错误
    if (error.response) {
      const status = error.response.status
      const message = error.response.data?.message || '翻译失败'
      
      switch (status) {
        case 401:
          throw new Error('请先登录后再使用翻译功能')
        case 500:
          throw new Error('翻译服务暂时不可用，请稍后重试')
        case 400:
          throw new Error('翻译请求参数错误')
        default:
          throw new Error(`翻译失败：${message}`)
      }
    } else if (error.request) {
      throw new Error('网络连接失败，请检查网络连接')
    } else {
      throw new Error('翻译请求失败，请稍后重试')
    }
  }
}

/**
 * 管理员调试翻译接口
 * @param query 待翻译文本
 * @param from_lang 源语言
 * @param to_lang 目标语言
 * @returns 翻译结果
 */
export const debugTranslate = async (
  query: string,
  from_lang: string = 'auto',
  to_lang: string = 'zh'
): Promise<TranslateResponse> => {
  try {
    const response = await apiClient.post<TranslateResponse>('/translate/debug', null, {
      params: { query, from_lang, to_lang }
    })
    return response.data
  } catch (error: any) {
    console.error('Debug translation API error:', error)
    
    if (error.response) {
      const status = error.response.status
      const message = error.response.data?.message || '调试翻译失败'
      
      switch (status) {
        case 403:
          throw new Error('权限不足，仅管理员可使用此功能')
        case 429:
          throw new Error('请求频率过高，请稍后再试')
        case 401:
          throw new Error('请先登录后再使用翻译功能')
        default:
          throw new Error(`调试翻译失败：${message}`)
      }
    } else {
      throw new Error('调试翻译请求失败，请稍后重试')
    }
  }
}