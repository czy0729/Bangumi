/*
 * @Author: czy0729
 * @Date: 2021-03-06 05:50:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-22 04:48:56
 */
export const COMPONENT = 'TinygrailLogs'

export const HM = ['tinygrail/logs', 'TinygrailLogs'] as const

export const TABS = [
  {
    title: '全部',
    key: 'all'
  },
  {
    title: '道具',
    key: 'items'
  },
  {
    title: '刮刮乐',
    key: 'lottery'
  },
  {
    title: 'ICO',
    key: 'ico'
  },
  {
    title: '卖出',
    key: 'asks'
  },
  {
    title: '买入',
    key: 'bid'
  },
  {
    title: '竞拍',
    key: 'auction'
  },
  {
    title: '圣殿',
    key: 'temple'
  },
  {
    title: '分红',
    key: 'award'
  }
] as const

export const ITEMS_DS = [
  '全部',
  '混沌魔方',
  '虚空道标',
  '星光碎片',
  '闪光结晶',
  '鲤鱼之眼'
] as const
