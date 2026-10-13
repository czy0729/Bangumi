/*
 * @Author: czy0729
 * @Date: 2023-12-17 08:19:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-13 12:00:00
 *
 * 页面状态初始值
 */
import { _ } from '@stores'

import type { SubjectType } from '@types'
import type { OtaChannel } from '../types'

/** 瞬态初始值 (不持久化) */
export const EXCLUDE_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height
}

export const STATE = {
  ...EXCLUDE_STATE,

  /** 当前条目类型 */
  type: '' as SubjectType,

  /** 云快照 */
  ota: {} as Record<string, OtaChannel>
}
