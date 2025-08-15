/*
 * @Author: czy0729
 * @Date: 2024-11-11 10:50:04
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-11-11 10:50:04
 */
import { ListItem } from '../../../types'

export type Props = {
  name: ListItem['name']
  relates: ListItem['relates']
  action: string
}
