/*
 * @Author: czy0729
 * @Date: 2024-07-25 21:01:31
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-07-25 21:01:31
 */
import { GAME_YEAR } from '@utils/subject/game'
import { LIST_EMPTY } from '@constants'
import { COMPONENT } from '../ds'

import type { ListEmpty, Loaded } from '@types'
import type { ScreenQuery } from '../types'

/** 默认筛选条件 */
const QUERY: ScreenQuery = {
  /** 发行年份 */
  year: GAME_YEAR[0],

  /** 平台 */
  platform: '',

  /** 类型 */
  cate: '',

  /** 开发商 */
  dev: '',

  /** 发行商 */
  pub: '',

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

  /** 搜索结果 (otaStore.game 数据源排序下标) */
  data: LIST_EMPTY as ListEmpty<number>,

  /** 布局: list | grid */
  layout: 'list',

  /** 是否展开全部筛选项 */
  expand: false,

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
