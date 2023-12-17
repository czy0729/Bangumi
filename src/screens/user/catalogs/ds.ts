/*
 * @Author: czy0729
 * @Date: 2022-08-19 05:04:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-17 11:21:28
 */
import { Loaded } from '@types'

export const NAMESPACE = 'ScreenCatelogs'

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
