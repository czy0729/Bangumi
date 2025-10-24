/*
 * @Author: czy0729
 * @Date: 2025-10-23 21:14:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-23 21:24:08
 */
import type { HandleRefreshOffset } from '../../types'

export type Props = {
  page: number
  pageCurrent: number
  pageTotal: number
  onRefreshOffset?: HandleRefreshOffset
}

export type MoreProps = Pick<Props, 'onRefreshOffset'>

export type PaginationProps = Pick<Props, 'pageCurrent' | 'pageTotal'>

export type TagProps = Pick<Props, 'page'>
