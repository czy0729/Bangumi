/*
 * HTML地址 (地址开头带叹号的代表不携带cookie进行请求)
 * @Author: czy0729
 * @Date: 2019-04-12 22:58:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-31 11:53:24
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
 * 章节信息
 * @param {*} epId
 */
export const HTML_EP = epId => `${HOST}/ep/${epId}`

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
 * 时间胶囊 (需登陆)
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
 * 小组详情
 * @param {*} groupId eg. fillgrids 补旧番
 */
export const HTML_GROUP_INFO = groupId => `${HOST}/group/${groupId}`

/**
 * 小组帖子列表
 * @param {*} groupId
 * @param {*} page
 */
export const HTML_GROUP = (groupId, page = 1) =>
  `${HOST}/group/${groupId}/forum?page=${page}`

/**
 * 搜索
 * @param {*} text
 * @param {*} cat
 * @param {*} page
 * @param {*} legacy 是否精准匹配
 */
export const HTML_SEARCH = (text, cat = '', page = 1, legacy = '') => {
  const [type, _cat] = cat.split('_')
  let _text = text
  if (legacy) {
    _text = `"${_text}"`
  }
  return `${HOST}/${type}_search/${_text}?cat=${_cat}&page=${page}`
}

/**
 * 标签
 * @param {*} text
 * @param {*} type
 * @param {*} order
 * @param {*} page
 * @param {*} airtime
 */
export const HTML_TAG = (text, type = 'anime', order, page = 1, airtime) => {
  if (airtime) {
    return `${HOST}/${type}/tag/${text}/airtime/${airtime}?sort=${order}&page=${page}`
  }
  return `${HOST}/${type}/tag/${text}?sort=${order}&page=${page}`
}

/**
 * 排行榜
 * @param {*} type
 * @param {*} order
 * @param {*} page
 * @param {*} filter 右侧类型 '/ova'
 * @param {*} airtime '/airtime/2019'
 */
export const HTML_RANK = (
  type = 'anime',
  order = 'rank',
  page = 1,
  filter,
  airtime
) =>
  `${HOST}/${type}/browser${filter ? `/${filter}` : ''}${
    airtime ? `/airtime/${airtime}` : ''
  }?sort=${order}&page=${page}`

/**
 * 索引
 * @param {*} type
 * @param {*} airtime
 * @param {*} page
 */
export const HTML_BROSWER = (type = 'anime', airtime = '2020-1', page = 1) =>
  `${HOST}/${type}/browser/airtime/${airtime}?page=${page}`

/**
 * 添加新讨论 (需登陆)
 */
export const HTML_NEW_TOPIC = () => `${HOST}/rakuen/new_topic`

/**
 * 添加新时间线 (需登陆)
 */
export const HTML_NEW_TIMELINE = userId =>
  `${HOST}/user/${userId}/timeline?type=say`

/**
 * 电波提醒 (需登陆)
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

/**
 * 用户时光机页面
 * @param {*} userId
 */
export const HTML_USERS = userId => `${HOST}/user/${userId}`

/**
 * 用户好友
 * @param {*} userId
 */
export const HTML_FRIENDS = userId => `${HOST}/user/${userId}/friends`

/**
 * 用户收藏的虚拟角色
 * @param {*} userId
 * @param {*} page
 */
export const HTML_USERS_CHARCTER = (userId = '', page = 1) =>
  `${HOST}/user/${userId}/mono/character?page=${page}`

/**
 * 用户收藏的现实人物
 * @param {*} userId
 * @param {*} page
 */
export const HTML_USERS_PERSON = (userId = '', page = 1) =>
  `${HOST}/user/${userId}/mono/person?page=${page}`

/**
 * 我收藏人物的最近作品
 * @param {*} page
 */
export const HTML_USERS_MONO_RECENTS = (page = 1) =>
  `${HOST}/mono/update?page=${page}`

/**
 * 标签
 */
export const HTML_TAGS = (type, page = 1) => `${HOST}/${type}/tag?page=${page}`

/**
 * 吐槽
 * @param {*} userId
 * @param {*} id
 */
export const HTML_SAY = (userId, id) =>
  `${HOST}/user/${userId}/timeline/status/${id}`

// -------------------- action --------------------
/**
 * 回复帖子
 * @param {*} topicId       351116
 * @param {*} type          group/topic | subject/topic | subject/ep | person | character
 * ---------- config ----------
 * @param {*} content       (bgm38) 来一个38
 * @param {*} related_photo 0
 * @param {*} lastview      1560439402
 * @param {*} formhash      e43af534
 * @param {*} submit        submit
 * ---------- sub reply ----------
 * @param {*} related       1453695
 * @param {*} sub_reply_uid 456208
 * @param {*} post_uid      456208
 */
export const HTML_ACTION_RAKUEN_REPLY = (topicId, type = 'group/topic') =>
  `${HOST}/${type}/${topicId}/new_reply?ajax=1`

/**
 * 回复吐槽
 * @param {*} id
 */
export const HTML_ACTION_TIMELINE_REPLY = id =>
  `${HOST}/timeline/${id}/new_reply?ajax=1`

/**
 * 发新吐槽
 */
export const HTML_ACTION_TIMELINE_SAY = () => `${HOST}/update/user/say?ajax=1`

/**
 * 删除收藏
 * @param {*} subjectId
 * @param {*} formhash
 */
export const HTML_ACTION_ERASE_COLLECTION = (subjectId, formhash) =>
  `${HOST}/subject/${subjectId}/remove?gh=${formhash}`
