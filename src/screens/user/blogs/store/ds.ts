/*
 * @Author: czy0729
 * @Date: 2024-05-07 18:05:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-01 14:43:56
 *
 * 用户日志页状态与常量
 */
import type { Loaded } from '@types'
import { COMPONENT } from '../ds'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const STATE = {
  /** 页面初始化完成 */
  _loaded: false as Loaded
}
