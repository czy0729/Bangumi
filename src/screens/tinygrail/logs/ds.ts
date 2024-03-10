/*
 * @Author: czy0729
 * @Date: 2021-03-06 05:50:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-10 15:55:24
 */
import { Loaded } from '@types'

export const COMPONENT = 'TinygrailLogs'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const STATE = {
  page: 0,
  go: '卖出',
  _loaded: false as Loaded
}

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
