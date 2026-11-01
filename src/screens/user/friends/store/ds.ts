/*
 * @Author: czy0729
 * @Date: 2022-08-07 03:57:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-02 06:09:48
 *
 * 好友页面 Store 状态与常量
 */
import { _ } from '@stores'
import { COMPONENT } from '../ds'

import type { Loaded, UserId } from '@types'

export const NAMESPACE = `Screen${COMPONENT}` as const

/** 活跃度分组名 (按从近到远排序; 「未知」不在接口分组内, 由 computed 单独归堆) */
export const GROUP_TITLES = [
  '一小时内',
  '一天内',
  '三天内',
  '一周内',
  '一月内',
  '半年内',
  '一年内',
  '超过一年'
] as const

export const RESET_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height
}

export const EXCLUDE_STATE = {
  ...RESET_STATE,

  /** 用户名筛选 */
  filter: '',

  /** 是否批量请求中 */
  fetching: false,

  /** 批量请求完成度 */
  percent: ''
}

export const STATE = {
  ...EXCLUDE_STATE,

  /** 活跃度分组 */
  friendGroup: {} as Record<string, UserId[]>,

  /** 活跃度显示 */
  friendGroupShows: {
    一小时内: true,
    一天内: true,
    三天内: true,
    一周内: true,
    一月内: true,
    半年内: false,
    一年内: false,
    超过一年: false,
    未知: false
  } as Record<string, boolean>,

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
