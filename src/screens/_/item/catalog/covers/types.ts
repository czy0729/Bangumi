/*
 * @Author: czy0729
 * @Date: 2024-07-29 19:13:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-26 21:42:02
 */
import type { CatalogDetailItem } from '@stores/discovery/types'

export type Props = {
  /** 目录标题 */
  title: string

  /** 展示的封面列表 */
  list: Pick<CatalogDetailItem, 'id' | 'image'>[]

  /** 目录条目总数 */
  total: number

  /** 占比最高的条目类型 */
  typeCn?: string
}
