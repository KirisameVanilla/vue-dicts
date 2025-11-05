import apiClient from './client'

/**
 * 词条评论请求参数
 */
export interface WordCommentRequest {
  comment_word: string
  comment_content: string
}

/**
 * 添加词条评论
 * @param lang 语言类型 (fr 或 jp)
 * @param data 评论内容
 * @returns 创建成功
 */
export const addWordComment = async (lang: 'fr' | 'jp', data: WordCommentRequest): Promise<void> => {
  try {
    await apiClient.post(`/comment/word/${lang}`, data)
  } catch (error: any) {
    console.error('Add word comment error:', error)
    
    if (error.response) {
      const status = error.response.status
      const message = error.response.data?.message || '添加评论失败'
      
      switch (status) {
        case 401:
          throw new Error('请先登录后再添加评论')
        case 422:
          throw new Error('评论内容格式不正确')
        default:
          throw new Error(`添加评论失败：${message}`)
      }
    } else if (error.request) {
      throw new Error('网络连接失败，请检查网络连接')
    } else {
      throw new Error('添加评论失败，请稍后重试')
    }
  }
}
