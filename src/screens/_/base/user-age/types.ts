/*
 * @Author: czy0729
 * @Date: 2025-01-25 11:02:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-25 14:25:06
 */
import type { TextStyle, UserId } from '@types'

export type Props = {
  /** 自定义样式 */
  style?: TextStyle

  /** 用户 ID */
  value: UserId

  /** 头像地址 */
  avatar: string
}
