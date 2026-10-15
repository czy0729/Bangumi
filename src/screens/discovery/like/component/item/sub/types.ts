/*
 * @Author: czy0729
 * @Date: 2024-11-11 10:50:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-15 12:00:00
 *
 * 同类推荐条目类型
 */
import type { ListItem } from '../../../types'

export type Props = Pick<ListItem, 'name' | 'relates'> & {
  /** 收藏状态动作表述 (看 / 玩 / 听) */
  action: string
}
