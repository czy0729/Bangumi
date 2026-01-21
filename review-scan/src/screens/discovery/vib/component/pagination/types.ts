/*
 * @Author: czy0729
 * @Date: 2024-05-16 14:20:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-16 14:40:56
 */
import { Data } from '../../types'

export type Props = {
  data: Data
  index: number
  onSelect: (index: number) => void
}
