/*
 * @Author: czy0729
 * @Date: 2026-09-29 17:10:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-29 17:10:00
 */
import type { ItemView } from '../../types'

export type Props = Pick<ItemView, 'name'> & {
  /** 收藏状态（如「看过」） */
  collection: string
}
