/*
 * @Author: czy0729
 * @Date: 2025-10-09 05:27:12
 * @Last Modified by:   czy0729
 * @Last Modified time: 2025-10-09 05:27:12
 */
import type { PropsWithChildren } from 'react'
import type { SubjectId, SubjectTypeCn } from '@types'

export type Props = PropsWithChildren<{
  subjectId: SubjectId
  typeCn: SubjectTypeCn
  name: string
  name_cn: string
  image: string
}>
