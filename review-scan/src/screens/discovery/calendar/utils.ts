/*
 * @Author: czy0729
 * @Date: 2023-03-13 15:59:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-04 03:31:03
 */
import { ON_AIR } from '@stores/calendar/onair'
import { SubjectId } from '@types'

export function getTime(item: any, subjectId?: SubjectId) {
  return String(
    item?.timeLocal || item?.timeCN || item?.timeJP || ON_AIR[subjectId]?.timeCN || '2359'
  )
}
