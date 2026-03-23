/*
 * @Author: czy0729
 * @Date: 2024-10-09 01:32:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-09 01:39:23
 */
import type { PmItem } from '@stores/user/types'
import type { PMKeys } from '../../types'

export type Props = {
  id: PMKeys
  item: PmItem
  index: number
}
