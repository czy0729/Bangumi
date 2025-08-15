/*
 * @Author: czy0729
 * @Date: 2024-03-10 17:25:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-10 17:26:53
 */
import { TABS } from '../../ds'
import List from '../list'

export function renderItem(item: (typeof TABS)[number]) {
  return <List key={item.key} title={item.title} />
}
