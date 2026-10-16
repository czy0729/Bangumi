/*
 * @Author: czy0729
 * @Date: 2023-12-17 10:05:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-23 01:32:45
 *
 * 新番档期状态常量: 目录编纂者 / 可视范围与上传延时
 */
import { _ } from '@stores'
import { COMPONENT, DEFAULT_USER_ID } from '../ds'

import type { Loaded } from '@types'

export const NAMESPACE = `Screen${COMPONENT}` as const

/** 目录详情上传延迟 */
export const CATALOG_UPLOAD_DELAY = 2000

export const RESET_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height
}

export const EXCLUDE_STATE = {
  ...RESET_STATE
}

export const STATE = {
  ...EXCLUDE_STATE,

  /** 当前目录编纂者 Id */
  userId: DEFAULT_USER_ID,

  _loaded: false as Loaded
}
