/*
 * @Author: czy0729
 * @Date: 2024-03-02 16:57:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-03 06:26:55
 */
import Item from '@tinygrail/_/item'
import ItemRefine from '@tinygrail/_/item-refine'
import { EVENT } from './ds'

export function renderItem({ item, index }) {
  return <Item index={index} event={EVENT} {...item} />
}

export function renderItemRefine({ item, index }) {
  return <ItemRefine index={index} event={EVENT} {...item} />
}
