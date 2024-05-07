/*
 * @Author: czy0729
 * @Date: 2022-08-19 05:04:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-07 18:17:59
 */
import { Loaded } from '@types'

export const COMPONENT = 'Catelogs'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const STATE = {
  page: 0,
  _loaded: false as Loaded
}

export const TABS = [
  {
    title: '创建的',
    key: 'create'
  },
  {
    title: '收藏的',
    key: 'collect'
  }
] as const
