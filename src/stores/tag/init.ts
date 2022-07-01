/*
 * @Author: czy0729
 * @Date: 2019-07-15 11:05:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-01 22:14:08
 */
import { MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectType } from '@types'

export const NAMESPACE = 'Tag'

export const DEFAULT_TYPE = MODEL_SUBJECT_TYPE.getLabel<SubjectType>('动画')

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
