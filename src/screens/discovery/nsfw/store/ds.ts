/*
 * @Author: czy0729
 * @Date: 2024-07-20 10:34:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-06 06:14:57
 */
import { NSFW_YEAR } from '@utils/subject/nsfw'
import { LIST_EMPTY } from '@constants'
import { COMPONENT } from '../ds'

import type { ListEmpty, Loaded } from '@types'

export const NAMESPACE = `Screen${COMPONENT}`

export const STATE = {
  query: {
    type: '动画',
    year: NSFW_YEAR[0],
    sort: '评分人数',
    collected: ''
  },
  data: LIST_EMPTY as ListEmpty<number>,
  layout: 'list',
  expand: false,

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
