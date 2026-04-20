/*
 * [待废弃] HD 漫画试验源头
 *
 * @Author: czy0729
 * @Date: 2022-05-23 06:53:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-27 08:20:01
 */
import { SubjectId } from '@types'
import { HOST_CDN } from '../constants'
import { getOTA } from './utils'

export const CDN_HD = (subjectId: SubjectId) => {
  const ota = getOTA()
  return `${HOST_CDN}/${ota.SITE_HD}/${subjectId}/index.json`
}

export const CDN_HD_OBJECT = (subjectId: SubjectId, vol: string) => {
  const ota = getOTA()
  return `${HOST_CDN}/${ota.SITE_HD}/${subjectId}/${vol}/cover.jpg`
}
