/*
 * @Author: czy0729
 * @Date: 2025-12-31 19:45:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-31 19:46:26
 */
import type { SubjectId } from '@types'

export type SubjectTitle = string

type SubItem = {
  id: SubjectId
  norm: string
}

export type SubStrings = Record<SubjectTitle, SubItem>
