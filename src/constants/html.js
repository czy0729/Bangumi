/*
 * HTML地址
 *  - 地址开头带叹号的代表不携带cookie进行请求
 *
 * @Author: czy0729
 * @Date: 2019-04-12 22:58:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-29 15:52:36
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
 * 所有人评分
 * @param {*} subjectId
 * @param {*} status    wishes | collections | doings | on_hold | dropped
 * @param {*} isFriend
 * @param {*} page
 */
export const HTML_SUBJECT_RATING = (
  subjectId,
  status = 'collections',
  isFriend = false,
  page = 1
) =>
  `${HOST}/subject/${subjectId}/${status}?page=${page}${
    isFriend ? '&filter=friends' : ''
  }`

/**
 * 包含条目的目录列表
 * @param {*} subjectId
 * @param {*} page
 */
export const HTML_SUBJECT_CATALOGS = (subjectId, page = 1) =>
  `${HOST}/subject/${subjectId}/index?page=${page}`

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
 * 人物作品
 * @param {*} monoId person/{INT}
 * @param {*} sort   date 按日期 | rank 按排名 | title 按名称
 * @param {*} page
 *
 * 作品列表
 * 类型: anime | book | game | music | real
 * 职位: /position/{INT}
 */
export const HTML_MONO_WORKS = (
  monoId,
  position = '',
  sort = 'title',
  page = 1
) => `${HOST}/${monoId}/works${position}?sort=${sort}&page=${page}`

/**
 * 人物角色
 * @param {*} monoId person/{INT}
 *
 * 角色列表
 * 类型: /voice/{anime | book | game | music | real}
 * 角色: /voice/position/{INT}
 */
export const HTML_MONO_VOICES = (monoId, position = '') =>
  `${HOST}/${monoId}/works/voice${position}`

/**
 * 时间胶囊
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
 * 超展开搜索
 * @param {*} q
 * @param {*} page
 */
export const HTML_RAKUEN_SEARCH = (q = '', page = 1) =>
  `https://search.gitee.com/?q=${q}&type=code&repo=VFZSSmVrMUVZelJPUkU1b1RucFplbHBuUFQxaE56WXpaZz09YTc2M2Y%3D&pageno=${page}`

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
 * 我的小组
 */
export const HTML_GROUP_MINE = () => `${HOST}/group/mine`

/**
 * 日志
 * @param {*} blogId
 */
export const HTML_BLOG = blogId => `${HOST}/blog/${blogId}`

/**
 * 全站日志列表
 * @param {*} type all => ''
 * @param {*} page
 */
export const HTML_BLOG_LIST = (type = '', page = 1) =>
  `${HOST}/${type !== 'all' ? `${type}/` : ''}blog/${page}.html`

/**
 * 搜索
 * @param {*} text
 * @param {*} cat
 * @param {*} page
 * @param {*} legacy 是否精准匹配
 */
export const HTML_SEARCH = (text, cat = '', page = 1, legacy = '') => {
  const [type, _cat] = cat.split('_')
  return `${HOST}/${type}_search/${text}?cat=${_cat}&page=${page}&legacy=${
    legacy ? 1 : 0
  }`
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
 * 目录
 * @param {*} type
 * @param {*} page
 */
export const HTML_CATALOG = (type = '', page = 1) =>
  `${HOST}/index/browser?page=${page}&orderby=${type}`

/**
 * 目录详情
 * @param {*} id
 */
export const HTML_CATALOG_DETAIL = id => `${HOST}/index/${id}`

/**
 * 用户的目录
 * @param {*} userId
 * @param {*} page
 * @param {*} isCollect
 */
export const HTML_USERS_CATALOGS = (userId = '', page = 1, isCollect = false) =>
  `${HOST}/user/${userId}/index${isCollect ? '/collect' : ''}?page=${page}`

/**
 * 添加新讨论
 */
export const HTML_NEW_TOPIC = () => `${HOST}/rakuen/new_topic`

/**
 * 添加新时间线
 */
export const HTML_NEW_TIMELINE = userId =>
  `${HOST}/user/${userId}/timeline?type=say`

/**
 * 电波提醒
 */
export const HTML_NOTIFY = () => `${HOST}/notify/all`

/**
 * 短信
 * @param {*} page
 */
export const HTML_PM = (page = 1) => `${HOST}/pm/inbox.chii?page=${page}`
export const HTML_PM_OUT = (page = 1) => `${HOST}/pm/outbox.chii?page=${page}`

/**
 * 短信详情
 * @param {*} id
 */
export const HTML_PM_DETAIL = id => `${HOST}/pm/view/${id}.chii`

/**
 * [POST] 发短信
 * @param {*} related
 * @param {*} msg_receivers
 * @param {*} current_msg_id
 * @param {*} formhash
 * @param {*} msg_title
 * @param {*} msg_body
 * @param {*} chat on
 * @param {*} submit 回复
 */
export const HTML_PM_CREATE = () => `${HOST}/pm/create.chii`

/**
 * 新短信参数
 * @param {*} userId
 */
export const HTML_PM_PARAMS = userId => `${HOST}/pm/compose/${userId}.chii`

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
 * 个人设置
 */
export const HTML_USER_SETTING = () => `${HOST}/settings`

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
 * 用户日志列表
 * @param {*} userId
 * @param {*} page
 */
export const HTML_USERS_BLOGS = (userId = '', page = 1) =>
  `${HOST}/user/${userId}/blog?page=${page}`

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

/**
 * 频道聚合
 * @param {*} channel
 */
export const HTML_CHANNEL = channel => `${HOST}/${channel}`

/**
 * 条目更多角色
 * @param {*} subjectId
 */
export const HTML_SUBJECT_CHARACTERS = subjectId =>
  `${HOST}/subject/${subjectId}/characters`

/**
 * 条目更多制作人员
 * @param {*} subjectId
 */
export const HTML_SUBJECT_PERSONS = subjectId =>
  `${HOST}/subject/${subjectId}/persons`

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
 * 回复日志, 参数同上
 * @param {*} topicId
 */
export const HTML_ACTION_BLOG_REPLY = topicId =>
  `${HOST}/blog/entry/${topicId}/new_reply?ajax=1`

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

/**
 * 输入框更新章节进度
 * @param {*} subjectId
 *
 * referer: subject
 * submit: 更新
 * watchedeps: 3
 */
export const HTML_ACTION_SUBJECT_SET_WATCHED = subjectId =>
  `${HOST}/subject/set/watched/${subjectId}`
