/*
 * @Author: czy0729
 * @Date: 2019-07-15 11:02:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-16 06:28:44
 */
import { LIST_EMPTY, MODEL_SEARCH_CAT } from '@constants'
import { SearchCat } from '@types'

export const NAMESPACE = 'Search'

export const DEFAULT_CAT = MODEL_SEARCH_CAT.getValue<SearchCat>('条目')

export const INIT_SEARCH_ITEM = {
  id: '',
  cover: '',
  name: '',
  nameCn: '',
  tip: '',
  score: '',
  total: '',
  rank: '',
  type: '',
  collected: false,
  comments: ''
}

export const STATE = {
  /** 搜索 */
  search: {
    0: LIST_EMPTY
  },

  /** @deprecated 超展开搜索 */
  searchRakuen: {
    0: LIST_EMPTY
  },

  /** 帖子搜索 */
  rakuenSearch: {
    0: LIST_EMPTY
  }
}

export const LOADED = {
  search: false
}
