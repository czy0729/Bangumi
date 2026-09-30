/*
 * @Author: czy0729
 * @Date: 2021-06-26 06:43:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-14 17:30:03
 *
 * 找 Gal 状态声明与本地存储
 */
import { _ } from '@stores'
import { LIST_EMPTY } from '@constants'
import { COMPONENT } from '../ds'

import type { Query } from '@utils/subject/adv/types'
import type { ListEmpty, Loaded } from '@types'

type ScreenQuery = Query & {
  /** 收藏筛选 (页面本地维度, 不参与 search) */
  collected: string

  /** 分级筛选 (页面本地维度, 不参与 search) */
  x: string
}

/** 默认筛选条件 */
const QUERY: ScreenQuery = {
  /** 首字 */
  first: '',

  /** 发行年份 */
  year: '2024',

  /** 开发商 */
  dev: '',

  /** 时长 */
  playtime: '',

  /** 汉化 */
  cn: '',

  /** 排序 */
  sort: '评分人数',

  /** 收藏 */
  collected: '',

  /** 分级 */
  x: ''
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

  /** 筛选条件 (浅拷贝隔离默认值, 避免原地改写污染 QUERY 并持久化) */
  query: { ...QUERY },

  /** 搜索结果 (otaStore.adv 数据源排序下标) */
  data: LIST_EMPTY as ListEmpty<number>,

  /** 布局: list | grid */
  layout: 'list',

  /** 是否展开全部筛选项 */
  expand: false,

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
