/*
 * @Author: czy0729
 * @Date: 2024-07-26 05:13:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-23 21:55:17
 */
import { MANGA_YEAR } from '@utils/subject/manga'
import { LIST_EMPTY } from '@constants'
import { Loaded } from '@types'
import { COMPONENT } from '../ds'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const STATE = {
  /** 查询参数 */
  query: {
    year: MANGA_YEAR[0],
    end: '',
    update: '',
    status: '',
    tags: [],
    author: '',
    sort: '评分人数',
    collected: ''
  },

  /** 缓存列表 */
  data: LIST_EMPTY,

  /** 布局 */
  layout: 'list' as 'list' | 'grid',

  /** 是否展开更多过滤选项 */
  expand: false,

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
