/*
 * @Author: czy0729
 * @Date: 2025-10-07 16:52:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-24 20:18:58
 */
import type { Props as ListProps } from '../list/types'

export type Props = Pick<ListProps, 'title'> & {
  /** 当前列表条目数 */
  length: number
}
