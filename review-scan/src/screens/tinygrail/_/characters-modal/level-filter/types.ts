/*
 * @Author: czy0729
 * @Date: 2025-05-02 16:38:33
 * @Last Modified by:   czy0729
 * @Last Modified time: 2025-05-02 16:38:33
 */
import { ListEmpty } from '@types'

export type Props = {
  source: ListEmpty
  value: string
  onSelect: (title: string) => void
}
