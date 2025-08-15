/*
 * @Author: czy0729
 * @Date: 2024-05-16 14:17:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-16 14:40:11
 */
import { Navigation } from '@types'

export type Props = {
  navigation: Navigation
  data: string[]
  onSelect: (index: number) => void
}
