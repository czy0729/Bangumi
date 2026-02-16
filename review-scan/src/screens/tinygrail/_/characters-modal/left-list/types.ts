/*
 * @Author: czy0729
 * @Date: 2025-05-02 16:41:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-02 18:18:27
 */
import { ListEmpty } from '@types'
import { PickItem } from '../types'

export type Props = {
  source: ListEmpty
  filter: string
  text: string
  selected: PickItem
  isTemple: boolean
  isStarDust: boolean
  onFilter: (filter: string) => void
  onChangeText: (text: string) => void
  onSelect: (item: PickItem) => void
}
