/*
 * HTML地址 (地址开头带叹号的代表不携带cookie进行请求)
 * @Author: czy0729
 * @Date: 2019-04-12 22:58:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-20 21:51:59
 */
import { MODEL_TIMELINE_SCOPE } from '@constants/model'
import { HOST } from './index'

/**
 * 个人设置
 */
export const HTML_SETTING = () => `${HOST}/settings`

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
 * 电波提醒
 */
export const HTML_NOTIFY = () => `${HOST}/notify/all`
