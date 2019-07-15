/*
 * @Author: czy0729
 * @Date: 2019-07-15 11:05:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-15 11:06:16
 */
import { MODEL_SUBJECT_TYPE } from '@constants/model'

export const NAMESPACE = 'Tag'

// -------------------- default --------------------
export const DEFAULT_TYPE = MODEL_SUBJECT_TYPE.getLabel('动画')

// -------------------- init --------------------
export const INIT_TAG_ITEM = {
  id: '',
  cover: '',
  name: '',
  nameCn: '',
  tip: '',
  score: '',
  total: '',
  rank: '',
  collected: false
}
