/*
 * @Author: czy0729
 * @Date: 2026-10-04 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-04 00:00:00
 *
 * 找漫画状态声明与本地存储
 */
import { LIST_EMPTY } from '@constants'
import { COMPONENT } from '../ds'

import type { ListEmpty, Loaded } from '@types'
import type { ScreenQuery } from '../types'

/** 默认筛选条件 */
const QUERY: ScreenQuery = {
  /** 标签 */
  tag: '',

  /** 出版社 */
  publisher: '',

  /** 卷数 */
  vol: '',

  /** 话数 */
  ch: '',

  /** 开始年份 */
  start: '',

  /** 更新年份 */
  update: '',

  /** 结束年份 */
  end: '',

  /** 分级 */
  x: '',

  /** 排序 */
  sort: '评分人数',

  /** 收藏 */
  collected: ''
}

export const NAMESPACE = `Screen${COMPONENT}` as const

export const STATE = {
  /** 筛选条件 (浅拷贝隔离默认值, 避免原地改写污染 QUERY 并持久化) */
  query: { ...QUERY },

  /** 搜索结果 (otaStore.manga 数据源排序下标) */
  data: LIST_EMPTY as ListEmpty<number>,

  /** 布局: list | grid */
  layout: 'list',

  /** 是否展开全部筛选项 */
  expand: false,

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
