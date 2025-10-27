/*
 * @Author: czy0729
 * @Date: 2025-03-04 19:20:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-08 21:18:03
 */
import Item from '../item'

export function keyExtractor(item: any) {
  return String(JSON.stringify(item))
}

export function renderItem({ item, index }) {
  return <Item {...item} index={index} />
}
