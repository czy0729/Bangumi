/*
 * @Author: czy0729
 * @Date: 2025-10-23 21:14:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-06 18:20:00
 *
 * 工具条各组件的 Props
 */
import type { HandleRefreshOffset } from '../../types'

export type Props = {
  /** 页码 */
  page: number

  /** 当前分页 */
  pageCurrent: number

  /** 总页数 */
  pageTotal: number

  /** 刷新时重置列表偏移 */
  onRefreshOffset?: HandleRefreshOffset
}

export type MoreProps = Pick<Props, 'onRefreshOffset'>

export type PaginationProps = Pick<Props, 'pageCurrent' | 'pageTotal'>

export type TagProps = Pick<Props, 'page'>
