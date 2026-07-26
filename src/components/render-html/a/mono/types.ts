/*
 * @Author: czy0729
 * @Date: 2025-01-19 08:37:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-26 05:57:52
 */
import type { Fn } from '@types'

export type Props = {
  /** 解析后的文本内容 */
  text?: string

  /** 封面图地址 */
  cover?: string

  /** 日文名称 */
  name?: string

  /** 中文名称 */
  nameCn?: string

  /** 链接点击回调 */
  onLinkPress?: Fn
}
