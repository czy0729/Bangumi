/*
 * @Author: czy0729
 * @Date: 2019-07-15 11:05:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-04 11:23:57
 */
import { MODEL_SUBJECT_TYPE } from '@constants/model'
import { SubjectType } from '@constants/model/types'

export const NAMESPACE = 'Tag'

// -------------------- default --------------------
export const DEFAULT_TYPE = MODEL_SUBJECT_TYPE.getLabel('动画') as SubjectType

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
