/*
 * @Author: czy0729
 * @Date: 2021-06-26 05:07:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-25 06:24:30
 */
import { _ } from '@stores'
import { ANIME_YEAR } from '@utils/subject/anime'
import { LIST_EMPTY } from '@constants'
import { Loaded } from '@types'
import { COMPONENT } from '../ds'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const EXCLUDE_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height
}

export const STATE = {
  /** 查询参数 */
  query: {
    area: '日本',
    type: '',
    first: '',
    year: ANIME_YEAR[0],
    begin: '',
    status: '',
    tags: [],
    official: '',
    sort: '评分人数',
    collected: ''
  },

  /** 缓存列表 */
  data: LIST_EMPTY,

  /** 布局 */
  layout: 'list' as 'list' | 'grid',

  /** 是否展开更多过滤选项 */
  expand: false,

  ...EXCLUDE_STATE,
  _loaded: false as Loaded
}
