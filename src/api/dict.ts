import apiClient from './client'

export interface WordDefinition {
  word: string
  part_of_speech: string
  meaning: string
  example: string
}

export interface SearchParams {
  lang_pref: string
  query_word: string
}

// 搜索单词
export const searchWord = async (params: SearchParams): Promise<WordDefinition[]> => {
  const response = await apiClient.get('/search', {
    params: {
      lang_pref: params.lang_pref,
      query_word: params.query_word
    }
  })
  return response.data
}
