/*
 * @Author: czy0729
 * @Date: 2024-03-11 08:35:38
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-03-11 08:35:38
 */
import Item from '@tinygrail/_/item'
import { EVENT } from './ds'

export function renderItem({ item, index }) {
  return <Item index={index} event={EVENT} {...item} />
}
