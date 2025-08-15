/*
 * @Author: czy0729
 * @Date: 2024-05-03 07:58:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-03 07:59:11
 */
import { State } from './types'

export function getKatakanaAlign(item: State['matches'][number], rootWidth: number) {
  return (
    item.align || (rootWidth ? (item.left + item.width >= rootWidth ? 'left' : 'center') : 'center')
  )
}
