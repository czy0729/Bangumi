/*
 * @Author: czy0729
 * @Date: 2023-12-17 10:59:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-30 00:00:00
 *
 * 吐槽页状态与常量
 */
import { _ } from '@stores'

import type { Loaded } from '@types'

export const RESET_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height
}

export const EXCLUDE_STATE = {
  ...RESET_STATE,

  /** 外部插入文本后, 光标移到末尾的触发器 */
  cursorEnd: 0
}

export const STATE = {
  ...EXCLUDE_STATE,

  /** 输入框内容 */
  value: '',

  /** 页面初始化完成 */
  _loaded: false as Loaded
}

/** 滚动与内容恢复的交互延时 */
export const DELAY_SCROLL = 160

/** 新吐槽成功后拉取时间线的延时 */
export const DELAY_FETCH_TIMELINE = 4000
