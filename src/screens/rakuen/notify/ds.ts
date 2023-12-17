/*
 * @Author: czy0729
 * @Date: 2022-08-19 17:05:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-17 10:55:30
 */
import { _ } from '@stores'
import { Loaded } from '@types'

export const STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height,
  page: 0,
  _loaded: false as Loaded
}

export const TABS = [
  {
    key: 'notify',
    title: '提醒'
  },
  {
    key: 'pmIn',
    title: '收件箱'
  },
  {
    key: 'pmOut',
    title: '已发送'
  }
] as const

export const TYPE_PAGE = {
  pm: 1,
  out: 2
} as const
