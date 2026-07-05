/*
 * @Author: czy0729
 * @Date: 2022-08-19 17:05:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-05 22:11:28
 */
export const COMPONENT = 'Notify'

export const TABS = [
  {
    key: 'notify',
    title: '提醒'
  },
  {
    key: 'pmIn',
    title: '收件箱'
  }
  // {
  //   key: 'pmOut',
  //   title: '已发送'
  // }
] as const

export const TYPE_PAGE = {
  pm: 1
  // out: 2
} as const
