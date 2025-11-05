/*
 * @Author: czy0729
 * @Date: 2024-03-10 16:49:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-22 05:32:40
 */
import { ListEmpty } from '@types'
import { TabsTitle } from '../../types'
import Item from '../item'
import { BalanceItem } from './types'

export function renderItem({ item }) {
  return <Item {...item} />
}

const FILTERS = {
  刮刮乐: (item: BalanceItem) => item.desc.includes('刮刮乐'),
  道具: (item: BalanceItem) => item.desc.includes('使用') || item.desc.includes('受到'),
  卖出: (item: BalanceItem) => item.desc.includes('卖出') && item.change > 0,
  买入: (item: BalanceItem) => item.desc.includes('买入') && item.change < 0,
  圣殿: (item: BalanceItem) => item.desc.includes('融资') || item.desc.includes('固定资产'),
  竞拍: (item: BalanceItem) => item.desc.includes('竞拍'),
  ICO: (item: BalanceItem) => item.desc.includes('ICO'),
  分红: (item: BalanceItem) => item.desc.includes('分红') || item.desc.includes('奖励'),
  全部: () => true
} as Record<
  TabsTitle,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (item: BalanceItem) => boolean
>

export const createFilteredData = (data: ListEmpty, title: TabsTitle): ListEmpty => {
  const filterFn = FILTERS[title] || FILTERS['全部']
  return {
    ...data,
    list: data.list.filter(filterFn)
  }
}
