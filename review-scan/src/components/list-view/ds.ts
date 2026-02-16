/*
 * @Author: czy0729
 * @Date: 2021-11-30 03:41:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-17 13:43:38
 */
import { rc } from '@utils/dev'
import { DEV } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'ListView')

export const REFRESH_STATE = {
  Idle: 0,
  HeaderRefreshing: 1,
  FooterRefreshing: 2,
  NoMoreData: 3,
  Failure: 4,
  EmptyData: 5
} as const

export const SCROLL_CALLBACK = () => {
  if (DEV) console.info('LIST_VIEW: no scroll event bind')
}
