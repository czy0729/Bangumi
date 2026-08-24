/*
 * @Author: czy0729
 * @Date: 2025-03-17 08:58:28
 * @Last Modified by:   czy0729
 * @Last Modified time: 2025-03-17 08:58:28
 */
import type { Props as ListProps } from '../list/types'

export type Props = Pick<ListProps, 'title'> & {
  /** 当前列表条目数 */
  length: number
}
