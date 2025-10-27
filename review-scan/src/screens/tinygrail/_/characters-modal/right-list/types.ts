/*
 * @Author: czy0729
 * @Date: 2025-05-02 17:29:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-02 22:45:10
 */
import { ListEmpty } from '@types'
import { PickItem } from '../types'

export type Props = {
  source: ListEmpty
  filter: string
  text: string
  selected: PickItem
  isStarBreak: boolean
  onFilter: (filter: string) => void
  onChangeText: (text: string) => void
  onSelect: (item: PickItem) => void
  onSubmitEditing?: () => void
}
