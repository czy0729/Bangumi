/*
 * @Author: czy0729
 * @Date: 2022-05-23 05:43:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-29 11:42:30
 */
import dayjs from 'dayjs'
import { SubjectId } from '@types'
import { getFolder } from './utils'
import { HOST_CDN_STATIC } from './ds'

const HOST_ONAIR = `${HOST_CDN_STATIC}/bangumi-onair`

/** 每日放送, https://github.com/ekibot/bangumi-onair */
export const CDN_ONAIR = () =>
  `https://raw.githubusercontent.com/ekibot/bangumi-onair/master/calendar.json?t=${getTimestamp()}`

/** 单集数据源, https://github.com/ekibot/bangumi-onair */
export const CDN_EPS = (subjectId: SubjectId) =>
  `${HOST_ONAIR}/onair/${getFolder(
    subjectId,
    1000
  )}/${subjectId}.json?t=${getTimestamp()}`

function trim(str = '') {
  return str.replace(/^\s+|\s+$/gm, '')
}

function getTimestamp(date = '') {
  const _date = trim(date)
  if (_date) return dayjs(_date).unix()
  return dayjs().unix()
}
