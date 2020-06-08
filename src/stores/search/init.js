/*
 * @Author: czy0729
 * @Date: 2019-07-15 11:02:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-15 11:04:09
 */
import { MODEL_SEARCH_CAT } from '@constants/model'

export const NAMESPACE = 'Search'

// -------------------- default --------------------
export const DEFAULT_CAT = MODEL_SEARCH_CAT.getValue('条目')

// -------------------- init --------------------
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
