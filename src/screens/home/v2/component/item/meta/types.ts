/*
 * @Author: czy0729
 * @Date: 2025-10-09 05:48:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-28 10:00:00
 */
import type { SubjectTypeCn } from '@types'
import type { Props as ItemProps } from '../types'

export type Props = Pick<ItemProps, 'subjectId'> & {
  /** 条目类型 */
  typeCn: SubjectTypeCn

  /** 在看人数 */
  doing: number
}
