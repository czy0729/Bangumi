/*
 * @Author: czy0729
 * @Date: 2024-05-15 10:01:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-15 10:01:25
 */
import type { SubjectId, SubjectTypeCn } from '@types'

export type Props = {
  /** 列表索引 */
  index: number

  /** 条目 Id */
  subjectId: SubjectId

  /** 条目类型 */
  typeCn: SubjectTypeCn

  /** 日文名 */
  name: string

  /** 中文名 */
  name_cn: string

  /** 封面图 */
  image: string
}
