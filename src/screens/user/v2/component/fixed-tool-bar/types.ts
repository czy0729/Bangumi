/*
 * @Author: czy0729
 * @Date: 2022-08-05 07:06:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-13 05:03:03
 */
import { Fn } from '@types'

export type Props = {
  fixed?: boolean
  page?: number
  pageCurrent?: number
  pageTotal?: number
  onRefreshOffset?: Fn
}
