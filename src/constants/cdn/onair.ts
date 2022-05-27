/*
 * @Author: czy0729
 * @Date: 2022-05-23 05:43:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-27 08:20:03
 */
import dayjs from 'dayjs'
import { SubjectId } from '@types'
import { HOST_CDN } from '../constants'
import { getFolder } from './utils'

const HOST_ONAIR = `${HOST_CDN}/gh/ekibot/bangumi-onair`

/** 每日放送, https://github.com/ekibun/bangumi_onair */
export const CDN_ONAIR = () => `${HOST_ONAIR}@master/calendar.json?t=${getTimestamp()}`

/** 单集数据源, https://github.com/ekibun/bangumi_onair */
export const CDN_EPS = (subjectId: SubjectId) =>
  `${HOST_ONAIR}@master/onair/${getFolder(
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
