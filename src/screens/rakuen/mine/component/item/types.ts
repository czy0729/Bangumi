/*
 * @Author: czy0729
 * @Date: 2026-10-26 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-27 00:00:00
 */
import type { Id } from '@types'

export type Props = {
  /** 小组 id */
  id?: Id

  /** 封面 */
  cover?: string

  /** 小组名称 */
  name?: string

  /** 成员数 */
  num?: number | string

  /** 是否已加入, 仅在全部列表传入 */
  joined?: boolean
}
