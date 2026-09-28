/*
 * @Author: czy0729
 * @Date: 2025-10-09 05:50:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-28 10:00:00
 */
import type { SubjectTypeCn } from '@types'
import type { Props as ItemProps } from '../types'

export type Props = Pick<ItemProps, 'subjectId' | 'epStatus'> & {
  /** 条目类型 */
  typeCn: SubjectTypeCn

  /** 日文名 */
  name: string

  /** 中文名 */
  name_cn: string

  /** 是否列表第一项 */
  isFirst: boolean
}
