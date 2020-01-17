/*
 * @Author: czy0729
 * @Date: 2020-01-17 11:59:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-01-17 17:58:42
 */
export const HOST_CDN = 'https://cdn.jsdelivr.net'

/**
 * 每日放送
 */
export const CDN_ONAIR = `${HOST_CDN}/gh/ekibun/bangumi_onair@latest/calendar.json`

/**
 * 单集数据源
 * @param {*} subjectId
 */
export const CDN_EPS = subjectId =>
  `${HOST_CDN}/gh/ekibun/bangumi_onair@latest/onair/${parseInt(
    parseInt(subjectId) / 1000
  )}/${subjectId}.json`

/**
 * 条目CDN自维护数据
 * @param {*} subjectId
 */
export const CDN_SUBJECT = subjectId =>
  `${HOST_CDN}/gh/czy0729/Bangumi-Subject@latest/data/${parseInt(
    parseInt(subjectId) / 100
  )}/${subjectId}.json`

/**
 * 超展开小组CDN自维护数据
 * @param {*} topicId
 * @param {*} type topic | comment
 */
export const CDN_RAKUEN = (topicId, type = 'topic') =>
  `${HOST_CDN}/gh/czy0729/Bangumi-Rakuen@latest/data/${type}/${parseInt(
    parseInt(topicId) / 100
  )}/${topicId}.json`
