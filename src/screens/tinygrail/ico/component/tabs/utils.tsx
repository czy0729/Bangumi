/*
 * @Author: czy0729
 * @Date: 2024-03-11 08:38:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-11 08:39:54
 */
import List from '../list'

export function renderItem(item: any) {
  return <List key={item.key} id={item.key} />
}
