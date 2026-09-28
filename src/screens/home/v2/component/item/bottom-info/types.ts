/*
 * @Author: czy0729
 * @Date: 2026-07-18 05:26:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-28 10:00:00
 */
import type { SubjectTypeCn } from '@types'
import type { Props as ItemProps } from '../types'

export type Props = Pick<ItemProps, 'subjectId'> & {
  /** 条目类型 */
  typeCn: SubjectTypeCn
}
