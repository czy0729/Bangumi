/*
 * @Author: czy0729
 * @Date: 2026-07-08 04:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-08 04:00:00
 */
import type { PmDetailItem } from '@stores/user/types'

export type Props = {
  item: PmDetailItem
  isHighlighted: boolean
  highlightTick: number
  onPress?: () => any
  onLayout?: (e: any) => void
}
