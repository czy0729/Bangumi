/*
 * @Author: czy0729
 * @Date: 2025-10-09 05:27:12
 * @Last Modified by:   czy0729
 * @Last Modified time: 2025-10-09 05:27:12
 */
import type { PropsWithChildren } from 'react'
import type { SubjectId, SubjectTypeCn } from '@types'

export type Props = PropsWithChildren<{
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
}>
