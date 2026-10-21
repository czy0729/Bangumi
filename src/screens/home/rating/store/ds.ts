/*
 * @Author: czy0729
 * @Date: 2024-08-26 08:12:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-26 08:21:45
 *
 * 用户评分页面状态声明
 */
import { COMPONENT, DEFAULT_PAGE } from '../ds'

import type { Loaded } from '@types'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const STATE = {
  /** 当前标签页下标 (对应 ds.ts 的 TABS) */
  page: DEFAULT_PAGE,

  /** 是否只看好友 (默认所有) */
  isFriend: false,

  /** 是否正在请求 */
  _fetching: false,

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
