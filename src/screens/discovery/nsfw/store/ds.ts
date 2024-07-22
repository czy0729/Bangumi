/*
 * @Author: czy0729
 * @Date: 2024-07-20 10:34:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-22 05:11:01
 */
import { LIST_EMPTY, MODEL_SUBJECT_TYPE } from '@constants'
import { Loaded } from '@types'
import { COMPONENT } from '../ds'

export const NAMESPACE = `Screen${COMPONENT}`

export const STATE = {
  query: {
    type: MODEL_SUBJECT_TYPE.getValue('动画'),
    year: 2024,
    sort: '评分人数',
    collected: ''
  },
  data: LIST_EMPTY,
  layout: 'list',
  expand: false,
  _loaded: false as Loaded
}
