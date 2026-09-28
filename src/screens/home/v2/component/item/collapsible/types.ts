/*
 * @Author: czy0729
 * @Date: 2025-10-09 05:22:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-28 10:00:00
 */
import type { Props as ItemProps } from '../types'

export type Props = Pick<ItemProps, 'subjectId'> & {
  /** 是否列表第一项 */
  isFirst: boolean
}
