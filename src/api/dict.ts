import apiClient from './client'

export interface WordContent {
  chi_exp: string
  example: string
}

export interface WordDefinition {
  query: string
  pos: string[]
  contents: WordContent[]
}

export interface SearchParams {
  lang_pref: string
  query_word: string
}

export interface SearchSuggestParams {
  query: string
  language: string
}

export interface SearchSuggestResponse {
  list: string[]
}

// 搜索单词
export const searchWord = async (params: SearchParams): Promise<WordDefinition> => {
    const packet = {
        language: params.lang_pref,
        query: params.query_word,
        sort: "relevance",
        order: "asc"
    }
    const response = await apiClient.post('/search', packet)
    console.log(response)
  return response.data
}

// 搜索推荐
export const searchSuggest = async (params: SearchSuggestParams): Promise<SearchSuggestResponse> => {
  const response = await apiClient.post('/search/list', {
    query: params.query,
    language: params.language
  })
  return response.data
}
