/*
 * @Author: czy0729
 * @Date: 2023-04-16 13:26:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-16 13:26:54
 */
import { SubjectId } from '@types'

export function getInt(subjectId: SubjectId) {
  const str = String(subjectId)
  return Number(str.slice(str.length - 3, str.length))
}
