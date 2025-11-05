/*
 * @Author: czy0729
 * @Date: 2024-03-05 03:16:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-08 19:18:55
 */
import ListWrap from '../list-wrap'
import Label from './label'

export function renderLabel({ route, focused }) {
  return <Label route={route} focused={focused} />
}

export function renderItem(item: any) {
  return <ListWrap id={item.key} />
}
