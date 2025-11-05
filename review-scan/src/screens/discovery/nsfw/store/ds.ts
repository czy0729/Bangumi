/*
 * @Author: czy0729
 * @Date: 2024-07-20 10:34:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-26 13:11:54
 */
import { NSFW_YEAR } from '@utils/subject/nsfw'
import { LIST_EMPTY, MODEL_SUBJECT_TYPE } from '@constants'
import { Loaded } from '@types'
import { COMPONENT } from '../ds'

export const NAMESPACE = `Screen${COMPONENT}`

export const STATE = {
  query: {
    type: MODEL_SUBJECT_TYPE.getValue('动画'),
    year: NSFW_YEAR[0],
    sort: '评分人数',
    collected: ''
  },
  data: LIST_EMPTY,
  layout: 'list',
  expand: false,

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
