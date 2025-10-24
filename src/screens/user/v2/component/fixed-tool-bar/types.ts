/*
 * @Author: czy0729
 * @Date: 2022-08-05 07:06:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-23 19:31:48
 */
import type { HandleRefreshOffset } from '../../types'

export type Props = {
  fixed?: boolean
  page?: number
  pageCurrent?: number
  pageTotal?: number
  onRefreshOffset?: HandleRefreshOffset
}
