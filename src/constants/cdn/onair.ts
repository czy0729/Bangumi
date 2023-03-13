/*
 * @Author: czy0729
 * @Date: 2022-05-23 05:43:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-13 14:08:53
 */
import dayjs from 'dayjs'
import { SubjectId } from '@types'
import { getFolder } from './utils'
import { HOST_DOGE, HOST_CDN_STATIC } from './ds'

/**
 * 每日放送
 * ${HOST_DOGE}/bangumi-onair/calendar.json
 * */
export const CDN_ONAIR = () => {
  /** @deprecated https://github.com/ekibot/bangumi-onair */
  // return `${HOST_CDN}/gh/ekibot/bangumi-link@master/calendar.json?t=${getTimestamp()}` as const
  return `${HOST_DOGE}/bangumi-onair/calendar.json?ts=${getTimestamp()}` as const
}

/** 单集数据源, https://github.com/ekibot/bangumi-onair */
export const CDN_EPS = (subjectId: SubjectId) => {
  // return `${HOST_CDN}/gh/ekibot/bangumi-onair@master/onair/${getFolder(
  //   subjectId,
  //   1000
  // )}/${subjectId}.json?t=${getTimestamp()}` as const
  return `${HOST_DOGE}/bangumi-onair/onair/${getFolder(
    subjectId,
    1000
  )}/${subjectId}.json` as const
}

/** @deprecated */
const HOST_ONAIR = `${HOST_CDN_STATIC}/bangumi-onair` as const

/** @deprecated 每日放送, https://github.com/ekibot/bangumi-onair */
export const _CDN_ONAIR = () =>
  `https://raw.githubusercontent.com/ekibot/bangumi-onair/master/calendar.json?t=${getTimestamp()}` as const

/** @deprecated 单集数据源, https://github.com/ekibot/bangumi-onair */
export const _CDN_EPS = (subjectId: SubjectId) =>
  `${HOST_ONAIR}/onair/${getFolder(
    subjectId,
    1000
  )}/${subjectId}.json?t=${getTimestamp()}` as const

function trim(str = '') {
  return str.replace(/^\s+|\s+$/gm, '')
}

function getTimestamp(date = '') {
  const _date = trim(date)
  if (_date) return dayjs(_date).unix()
  return dayjs().unix()
}
