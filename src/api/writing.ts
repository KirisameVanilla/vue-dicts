import apiClient from './client'

/**
 * 作文批改请求参数
 */
export interface ArticleReviewRequest {
  title_content: string
  article_type: string
}

/**
 * 作文批改响应
 */
export interface ArticleReviewResponse {
  reply: string
  tokens: number
  conversation_length: number
}

/**
 * 作文追问请求参数
 */
export interface ArticleQuestionRequest {
  query: string
}

/**
 * 作文追问响应
 */
export interface ArticleQuestionResponse {
  reply: string
  tokens: number
  conversation_length: number
}

/**
 * 重置会话响应
 */
export interface ResetSessionResponse {
  message: string
}

/**
 * 作文批改会话
 * @param data 作文内容和类型
 * @param lang 作文语种，默认 fr-FR
 * @returns AI批改结果
 */
export const reviewArticle = async (
  data: ArticleReviewRequest,
  lang: string = 'fr-FR'
): Promise<ArticleReviewResponse> => {
  try {
    const response = await apiClient.post<ArticleReviewResponse>(
      '/article-director/article',
      data,
      {
        params: { lang }
      }
    )
    return response.data
  } catch (error: any) {
    console.error('Article review API error:', error)
    
    if (error.response) {
      const status = error.response.status
      const message = error.response.data?.message || '作文批改失败'
      
      switch (status) {
        case 401:
          throw new Error('请先登录后再使用作文批改功能')
        case 500:
          throw new Error('作文批改服务暂时不可用，请稍后重试')
        default:
          throw new Error(`作文批改失败：${message}`)
      }
    } else if (error.request) {
      throw new Error('网络连接失败，请检查网络连接')
    } else {
      throw new Error('作文批改请求失败，请稍后重试')
    }
  }
}

/**
 * 作文追问
 * @param data 追问内容
 * @returns AI回答
 */
export const askArticleQuestion = async (
  data: ArticleQuestionRequest
): Promise<ArticleQuestionResponse> => {
  try {
    const response = await apiClient.post<ArticleQuestionResponse>(
      '/article-director/question',
      data
    )
    return response.data
  } catch (error: any) {
    console.error('Article question API error:', error)
    
    if (error.response) {
      const status = error.response.status
      const message = error.response.data?.message || '追问失败'
      
      switch (status) {
        case 401:
          throw new Error('请先登录后再使用追问功能')
        case 500:
          throw new Error('追问服务暂时不可用，请稍后重试')
        default:
          throw new Error(`追问失败：${message}`)
      }
    } else if (error.request) {
      throw new Error('网络连接失败，请检查网络连接')
    } else {
      throw new Error('追问请求失败，请稍后重试')
    }
  }
}

/**
 * 重置作文会话
 * @returns 重置结果
 */
export const resetArticleSession = async (): Promise<ResetSessionResponse> => {
  try {
    const response = await apiClient.post<ResetSessionResponse>(
      '/article-director/reset'
    )
    return response.data
  } catch (error: any) {
    console.error('Reset article session error:', error)
    
    if (error.response) {
      const message = error.response.data?.message || '重置会话失败'
      throw new Error(message)
    } else {
      throw new Error('重置会话失败，请稍后重试')
    }
  }
}
