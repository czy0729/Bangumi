/*
 * @Author: czy0729
 * @Date: 2025-10-23 21:39:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-06 18:20:00
 *
 * 列表外层与内容组件的 Props
 */
import type { ScrollEvent } from '@types'
import type { Ctx, TabsLabel } from '../../types'
import type { memoStyles } from './styles'

export type Props = {
  /** 标签标题 */
  title: TabsLabel
}

export type ListProps = {
  /** 样式 */
  styles: ReturnType<typeof memoStyles>

  /** 收集 ListView 滚动方法引用 */
  forwardRef: Ctx['$']['forwardRef']

  /** 是否列表模式 */
  list: boolean

  /** 页码 */
  page: number

  /** 列表数据 */
  data: ReturnType<Ctx['$']['userCollections']>

  /** 列数 */
  numColumns: Ctx['$']['numColumns']

  /** 是否分页模式 */
  userPagination: boolean

  /** 滚动回调 */
  onScroll: (e: ScrollEvent) => void

  /** 下拉刷新 */
  onHeaderRefresh: () => void

  /** 上滑加载更多 */
  onFooterRefresh: () => void
}
