/*
 * @Author: czy0729
 * @Date: 2024-05-15 10:01:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-28 10:00:00
 */
import type { SubjectTypeCn } from '@types'
import type { Props as ItemProps } from '../types'

export type Props = Pick<ItemProps, 'index' | 'subjectId'> & {
  /** 条目类型 */
  typeCn: SubjectTypeCn

  /** 日文名 */
  name: string

  /** 中文名 */
  name_cn: string

  /** 封面图 */
  image: string
}
