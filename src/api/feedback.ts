import apiClient from './client'

/**
 * 用户反馈类型
 */
export type FeedbackType = 
  | 'ui_design' 
  | 'dict_fr' 
  | 'dict_jp' 
  | 'user' 
  | 'translate' 
  | 'writting' 
  | 'ai_assist' 
  | 'pronounce'

/**
 * 用户反馈请求参数
 */
export interface FeedbackRequest {
  report_part: FeedbackType
  text: string
}

/**
 * 用户反馈响应
 */
export interface FeedbackResponse {
  massages: string
}

/**
 * 提交用户反馈
 * @param data 反馈内容
 * @returns 提交结果
 */
export const submitFeedback = async (data: FeedbackRequest): Promise<FeedbackResponse> => {
  try {
    const response = await apiClient.post<FeedbackResponse>('/improvements', data)
    return response.data
  } catch (error: any) {
    console.error('Submit feedback error:', error)
    
    if (error.response) {
      const status = error.response.status
      const message = error.response.data?.message || '提交反馈失败'
      
      switch (status) {
        case 401:
          throw new Error('请先登录后再提交反馈')
        case 422:
          throw new Error('反馈内容格式不正确，请检查后重试')
        default:
          throw new Error(`提交反馈失败：${message}`)
      }
    } else if (error.request) {
      throw new Error('网络连接失败，请检查网络连接')
    } else {
      throw new Error('提交反馈失败，请稍后重试')
    }
  }
}
