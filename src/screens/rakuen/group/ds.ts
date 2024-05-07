/*
 * @Author: czy0729
 * @Date: 2023-12-17 10:40:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-08 04:32:03
 */
import { Loaded } from '@types'

export const COMPONENT = 'Group'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const STATE = {
  page: 1,
  show: true,
  ipt: '1',
  history: [],

  /** 云快照 */
  ota: {},
  _loaded: false as Loaded
}

export const HEAT_MAPS = {
  prev: '小组.上一页',
  next: '小组.下一页',
  search: '小组.页码跳转'
} as const
