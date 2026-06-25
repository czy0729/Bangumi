/*
 * @Author: czy0729
 * @Date: 2026-04-23 19:42:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-23 19:42:42
 */
import type { TextStyle } from '@types'

export type Props = {
  /** 自定义文本样式 */
  style?: TextStyle

  /** 限制显示行数，超出时测量后收起，点击可展开 */
  numberOfLines?: number

  /** 评论原始文本（支持 HTML 实体自动解码） */
  value: string

  /**
   * 视觉长度截断阈值，大于 0 时生效。
   * 当 value 的视觉长度超过此值时，截断文本并用 Expand 包裹。
   * 视觉长度：中文算 1，英文/数字/半角符号算 0.5。
   */
  maxLength?: number
}
