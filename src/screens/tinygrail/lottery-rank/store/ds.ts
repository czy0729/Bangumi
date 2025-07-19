/*
 * @Author: czy0729
 * @Date: 2025-07-17 13:11:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-17 18:03:30
 */
import { Loaded, UserId } from '@types'
import { COMPONENT } from '../ds'
import { Detail, Sort } from '../types'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const EXCLUDE_STATE = {
  prev: 0
}

export const STATE = {
  ...EXCLUDE_STATE,

  /** 列表项 ID */
  list: {} as Record<string, string[]>,

  /** 列表项详情 */
  detail: {} as Record<string, Detail>,

  /** 公开用户 */
  userStatus: {} as Record<UserId, boolean>,

  /** 列表排序 */
  sort: '' as Sort,

  /** 是否倒序 */
  reverse: false,

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
