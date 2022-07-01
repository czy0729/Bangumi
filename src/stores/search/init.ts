/*
 * @Author: czy0729
 * @Date: 2019-07-15 11:02:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-01 18:47:11
 */
import { MODEL_SEARCH_CAT } from '@constants'
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
