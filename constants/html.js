/*
 * HTML地址 (地址开头带叹号的代表不携带cookie进行请求)
 * @Author: czy0729
 * @Date: 2019-04-12 22:58:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-26 22:53:40
 */
import { MODEL_TIMELINE_SCOPE } from '@constants/model'
import { urlStringify } from '@utils'
import { HOST } from './index'

/**
 * 条目
 * @param {*} *subjectId
 */
export const HTML_SUBJECT = subjectId => `${HOST}/subject/${subjectId}`

/**
 * 条目吐槽
 * @param {*} subjectId
 * @param {*} page
 */
export const HTML_SUBJECT_COMMENTS = (subjectId, page = 1) =>
  `${HOST}/subject/${subjectId}/comments?page=${page}`

/**
 * 人物
 * @param {*} monoId character/1234, person/1234
 */
export const HTML_MONO = monoId => {
  if (monoId.includes('character/') || monoId.includes('person/')) {
    return `${HOST}/${monoId}`
  }
  return HOST
}

/**
 * 时间胶囊 (需登录)
 * @param {*} scope
 * @param {*} type
 * @param {*} userId
 * @param {*} page
 */
export const HTML_TIMELINE = (scope, type, userId, page = 1) => {
  switch (MODEL_TIMELINE_SCOPE.getLabel(scope)) {
    case '全站':
      return `!${HOST}/timeline?type=${type}&page=${page}`
    case '自己':
      return `${HOST}/user/${userId}/timeline?type=${type}&page=${page}`
    default:
      return `${HOST}/timeline?type=${type}&page=${page}`
  }
}

/**
 * 超展开
 * @param {*} scope
 * @param {*} type
 */
export const HTML_RAKUEN = (scope, type) =>
  `${HOST}/rakuen/${scope}?type=${type}`

/**
 * 帖子
 * @param {*} topicId eg. group/12345, subject/12345, ep/12345, prsn/123456
 */
export const HTML_TOPIC = topicId => `${HOST}/rakuen/topic/${topicId}`

/**
 * 搜索
 * @param {*} text
 * @param {*} cat
 */
export const HTML_SEARCH = (text, cat = '', page = 1) => {
  const [type, _cat] = cat.split('_')
  return `${HOST}/${type}_search/${text}?cat=${_cat}&page=${page}`
}

/**
 * 添加新讨论 (需登录)
 */
export const HTML_NEW_TOPIC = () => `${HOST}/rakuen/new_topic`

/**
 * 添加新时间线 (需登录)
 */
export const HTML_NEW_TIMELINE = userId =>
  `${HOST}/user/${userId}/timeline?type=say`

/**
 * 电波提醒 (需登录)
 */
export const HTML_NOTIFY = () => `${HOST}/notify/all`

/**
 * 每日放送
 */
export const HTML_CALENDAR = () => `${HOST}/calendar`

/**
 * 时光机
 * @param {*} userId
 * @param {*} type
 * @param {*} order
 */
export const HTML_USER_COLLECTIONS = (
  userId,
  scope = 'anime',
  type,
  order,
  tag,
  page
) =>
  `${HOST}/${scope}/list/${userId}/${type}?${urlStringify({
    orderby: order,
    tag,
    page
  })}`
