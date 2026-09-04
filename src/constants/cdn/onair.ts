/*
 * @Author: czy0729
 * @Date: 2022-05-23 05:43:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-04 19:15:02
 */
import dayjs from '@utils/thirdParty/dayjs'
import { getFolder } from './utils'
import { HOST_DOGE } from './ds'

import type { SubjectId } from '@types'

/** 每日放送 */
export const CDN_ONAIR = () => {
  /** @deprecated https://github.com/ekibot/bangumi-onair */
  return `${HOST_DOGE}/bangumi-onair/calendar.json?ts=${getTimestamp()}` as const
}

/** 单集数据源 */
export const CDN_EPS = (subjectId: SubjectId) => {
  return `${HOST_DOGE}/bangumi-onair/onair/${getFolder(subjectId, 1000)}/${subjectId}.json` as const
}

/** 推荐源 */
export const CDN_REC = (subjectId: SubjectId) => {
  return `${HOST_DOGE}/bangumi-rec/${getFolder(subjectId, 100)}/${subjectId}.json` as const
}

function trim(str: string = '') {
  return str.replace(/^\s+|\s+$/gm, '')
}

/** 缓存穿透时间戳 (秒) */
function getTimestamp(date: string = '') {
  const _date = trim(date)
  if (_date) return dayjs(_date).unix()
  return dayjs().unix()
}
