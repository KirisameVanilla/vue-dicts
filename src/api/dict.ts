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
  language: string
  query: string
  sort?: string
  order?: string
}

export interface SearchSuggestParams {
  query: string
  language: string
  sort?: string
  order?: string
}

export interface SearchSuggestResponse {
  list: string[]
}

// 搜索单词
export const searchWord = async (params: SearchParams): Promise<WordDefinition> => {
    const packet = {
        language: params.language,
        query: params.query,
        sort: params.sort || "relevance",
        order: params.order || "des"
    }
    const response = await apiClient.post('/search/word', packet)
    console.log(response)
  return response.data
}

// 搜索推荐
export const searchSuggest = async (params: SearchSuggestParams): Promise<SearchSuggestResponse> => {
  const response = await apiClient.post('/search/list/word', {
    query: params.query,
    language: params.language,
    sort: params.sort || "relevance",
    order: params.order || "des"
  })
  return response.data
}

/**
 * 谚语相关接口
 */

export interface ProverbDetail {
  text: string
  chi_exp: string
  freq: number
}

export interface ProverbListItem {
  id: number
  proverb: string
  chi_exp: string
}

// 获取法语谚语详情
export const getProverbDetail = async (proverbId: number): Promise<{ result: ProverbDetail }> => {
  const formData = new FormData()
  formData.append('proverb_id', proverbId.toString())
  
  const response = await apiClient.post('/search/proverb', formData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  return response.data
}

// 获取谚语联想建议
export const searchProverbSuggest = async (query: string, dictLanguage: string): Promise<{ list: ProverbListItem[] }> => {
  const response = await apiClient.post('/search/list/proverb', {
    query,
    dict_language: dictLanguage
  })
  return response.data
}

/**
 * 日语惯用语相关接口
 */

export interface IdiomDetail {
  id: number
  text: string
  search_text: string
  chi_exp: string
  example: string
  freq: number
}

export interface IdiomListItem {
  id: number
  proverb: string
  chi_exp: string
}

// 获取日语惯用语详情
export const getIdiomDetail = async (queryId: number): Promise<{ result: IdiomDetail }> => {
  const response = await apiClient.post('/search/idiom', null, {
    params: { query_id: queryId }
  })
  return response.data
}

// 获取日语惯用语联想建议
export const searchIdiomSuggest = async (query: string, dictLanguage: string = 'jp'): Promise<{ list: IdiomListItem[] }> => {
  const response = await apiClient.post('/search/list/idiom', {
    query,
    dict_language: dictLanguage
  })
  return response.data
}
