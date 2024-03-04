/*
 * @Author: czy0729
 * @Date: 2024-03-05 03:16:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-05 03:18:39
 */
import List from '../list'
import Label from './label'

export function renderLabel({ route, focused }) {
  return <Label route={route} focused={focused} />
}

export function renderItem(item: any) {
  return <List key={item.key} id={item.key} />
}
