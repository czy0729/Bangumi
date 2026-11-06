/*
 * @Author: czy0729
 * @Date: 2025-10-23 10:27:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-06 18:20:00
 *
 * Filter 外层与内容组件的 Props
 */
import type { Ctx } from '../../types'
import type { memoStyles } from './styles'

export type Props = {
  /** 页码 */
  page: number
}

export type FilterProps = {
  /** 样式 */
  styles: ReturnType<typeof memoStyles>

  /** 是否显示搜索 */
  showFilter: boolean

  /** 搜索关键词 */
  fliterInputText: string

  /** 是否搜索中 */
  isFiltering: ReturnType<Ctx['$']['isFiltering']>

  /** 关键词变更回调 */
  onFilterChange: Ctx['$']['onFilterChange']
}
