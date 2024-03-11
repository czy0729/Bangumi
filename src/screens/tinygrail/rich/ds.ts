/*
 * @Author: czy0729
 * @Date: 2021-03-05 14:50:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-11 17:26:40
 */
import { Loaded } from '@types'

export const COMPONENT = 'TinygrailRich'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const TABS = [
  {
    title: '1-100',
    key: '1/100'
  },
  {
    title: '周股息',
    key: '1/100/0'
  },
  {
    title: '流动资金',
    key: '1/100/1'
  },
  {
    title: '初始资金',
    key: '1/100/3'
  }
] as const

export const STATE = {
  page: 0,
  _loaded: false as Loaded
}
