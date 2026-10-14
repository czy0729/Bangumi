/*
 * @Author: czy0729
 * @Date: 2021-06-26 05:07:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-14 12:00:00
 *
 * 找番剧状态声明与本地存储
 */
import { _ } from '@stores'
import { ANIME_YEAR } from '@utils/subject/anime'
import { LIST_EMPTY } from '@constants'
import { COMPONENT } from '../ds'

import type { ListEmpty, Loaded } from '@types'
import type { ScreenQuery } from '../types'

/** 默认筛选条件 */
const QUERY: ScreenQuery = {
  /** 地区 */
  area: '日本',

  /** 类型 (多选) */
  meta: [],

  /** 年份 */
  year: ANIME_YEAR[0],

  /** 季度 */
  begin: '',

  /** 状态 */
  status: '',

  /** 集数 */
  ep: '',

  /** 标签 (多选) */
  tags: [],

  /** 制作 */
  official: '',

  /** 分级 */
  x: '',

  /** 排序 */
  sort: '评分人数',

  /** 收藏 */
  collected: ''
}

export const NAMESPACE = `Screen${COMPONENT}` as const

export const RESET_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height
}

export const EXCLUDE_STATE = {
  ...RESET_STATE
}

export const STATE = {
  ...EXCLUDE_STATE,

  /** 查询参数 (浅拷贝隔离默认值, 避免原地改写污染 QUERY 并持久化) */
  query: { ...QUERY },

  /** 缓存列表 */
  data: LIST_EMPTY as ListEmpty<number>,

  /** 布局 */
  layout: 'list' as 'list' | 'grid',

  /** 是否展开更多过滤选项 */
  expand: false,

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
