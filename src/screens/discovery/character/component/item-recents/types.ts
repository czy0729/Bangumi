/*
 * @Author: czy0729
 * @Date: 2025-09-09 17:52:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-13 12:00:00
 *
 * 人物近况条目类型
 */
import type { RecentsItem } from '@stores/users/types'
import type { WithIndex } from '@types'

export type Props = WithIndex<RecentsItem> & {
  /** 是否显示日期分割线 */
  showDivider?: boolean
}
