/*
 * HTML地址 (地址开头带叹号的代表不携带cookie进行请求)
 * @Author: czy0729
 * @Date: 2019-04-12 22:58:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-23 17:32:32
 */
import { MODEL_TIMELINE_SCOPE } from '@constants/model'

export const HOST = 'https://bangumi.tv'

/**
 * 获取条目HTML
 * @param {*} *subjectId
 */
export const HTML_SUBJECT = subjectId => `${HOST}/subject/${subjectId}`

/**
 * 获取条目吐槽HTML
 * @param {*} subjectId
 * @param {*} page
 */
export const HTML_SUBJECT_COMMENTS = (subjectId, page = 1) =>
  `${HOST}/subject/${subjectId}/comments?page=${page}`

/**
 * 获取时间胶囊HTML (需登录)
 * @param {*} type
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
