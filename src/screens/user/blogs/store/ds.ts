/*
 * @Author: czy0729
 * @Date: 2024-05-07 18:05:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-03 06:55:13
 */
import type { Loaded } from '@types'
import { COMPONENT } from '../ds'

export const NAMESPACE = `Screen${COMPONENT}`

export const STATE = {
  /** 页面初始化完成 */
  _loaded: false as Loaded
}
