/*
 * @Author: czy0729
 * @Date: 2026-09-26 21:42:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-26 21:42:02
 */
import type { EventType, UserId } from '@types'

export type Props = {
  /** 列表序号 (用于头像区虚拟化偏移计算) */
  index?: number

  /** 编纂者 Id */
  userId?: UserId

  /** 编纂者头像 */
  avatar?: string

  /** 编纂者昵称 */
  name?: string

  /** 最后更新时间 */
  date?: string

  /** 埋点 */
  event?: EventType
}
