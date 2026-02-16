/*
 * HTML地址
 *  - 地址开头带叹号的代表不携带cookie进行请求
 * @Author: czy0729
 * @Date: 2019-04-12 22:58:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-12 20:07:40
 */
import { urlStringify } from '@utils/utils'
import {
  Area,
  Classification,
  CollectionsOrder,
  CollectionStatus,
  EpId,
  Id,
  MonoId,
  PersonId,
  RakuenScope,
  RakuenType,
  RakuenTypeGroup,
  RakuenTypeMono,
  RankFilter,
  RankFilterSub,
  RatingStatus,
  SearchCat,
  Source,
  SubjectId,
  SubjectType,
  Tag,
  TagOrder,
  Target,
  Theme,
  TimeLineScope,
  TimeLineType,
  TopicId,
  TopicType,
  UserId
} from '@types'
import { HOST, URL_ZHINAN } from '../constants'
import { MODEL_TIMELINE_SCOPE } from '../model'
import { RakuenReplyType } from './types'

/** 条目 */
export const HTML_SUBJECT = (subjectId: SubjectId) => `${HOST}/subject/${subjectId}`

/** 条目吐槽 */
export const HTML_SUBJECT_COMMENTS = (
  subjectId: SubjectId,
  page: number = 1,

  /** 收藏状态 */
  interest_type?: '' | RatingStatus,

  /** 是否当前版本 */
  version?: boolean
) =>
  `${HOST}/subject/${subjectId}/comments?page=${page}${
    interest_type ? `&interest_type=${interest_type}` : ''
  }${version ? `&version=current` : ''}`

/** 所有人评分 */
export const HTML_SUBJECT_RATING = (
  subjectId: SubjectId,
  status: RatingStatus = 'collections',
  isFriend: boolean = false,
  page: number = 1
) => `${HOST}/subject/${subjectId}/${status}?page=${page}${isFriend ? '&filter=friends' : ''}`

/** 用于获取条目管理相关信息 */
export const HTML_SUBJECT_COLLECT_DETAIL = (subjectId: SubjectId) =>
  `${HOST}/update/${subjectId}?keepThis=false`

/** 包含条目的目录列表 */
export const HTML_SUBJECT_CATALOGS = (subjectId: SubjectId, page: number = 1) =>
  `${HOST}/subject/${subjectId}/index?page=${page}`

/** 章节信息 */
export const HTML_EP = (epId: EpId) => `${HOST}/ep/${epId}`

/** 人物 */
export const HTML_MONO = (monoId: MonoId) => {
  if (monoId.includes('character/') || monoId.includes('person/')) {
    return `${HOST}/${monoId}`
  }
  return HOST
}

/**
 * 人物作品
 *
 * 作品列表
 * position: /position/{INT}
 */
export const HTML_MONO_WORKS = (
  monoId: PersonId,
  position: string = '',
  sort: 'date' | 'rank' | 'title' = 'title',
  page: number = 1
) => `${HOST}/${monoId}/works${position}?sort=${sort}&page=${page}`

/**
 * 人物角色
 *
 * 角色列表
 * 类型: /voice/{anime | book | game | music | real}
 * 角色: /voice/position/{INT}
 */
export const HTML_MONO_VOICES = (monoId: PersonId, position: string = '') =>
  `${HOST}/${monoId}/works/voice${position}`

/** 时间胶囊 */
export const HTML_TIMELINE = (
  scope: TimeLineScope,
  type: TimeLineType,
  userId: UserId,
  page: number = 1
) => {
  switch (MODEL_TIMELINE_SCOPE.getLabel(scope)) {
    case '全站':
      return `!${HOST}/timeline?type=${type}&page=${page}`

    case '自己':
      return `${HOST}/user/${userId}/timeline?type=${type}&page=${page}&ajax=1`

    default:
      return `${HOST}/timeline?type=${type}&page=${page}`
  }
}

/** 超展开 */
export const HTML_RAKUEN = (
  scope: RakuenScope,
  type: RakuenType | RakuenTypeMono | RakuenTypeGroup
) => `${HOST}/rakuen/${scope}?type=${type}`

/** @deprecated [已废弃] 超展开搜索 */
export const HTML_RAKUEN_SEARCH = (q: string = '', page: number = 1) =>
  `https://search.gitee.com/?q=${q}&type=code&repo=VFZSSmVrMUVZelJPUkU1b1RucFplbHBuUFQxaE56WXpaZz09YTc2M2Y%3D&pageno=${page}`

/** 超展开热门 (需登录) */
export const HTML_RAKUEN_HOT = () => HOST

/** 帖子 */
export const HTML_TOPIC = (topicId: TopicId, postId?: string) =>
  `${HOST}/rakuen/topic/${topicId}${postId ? `#post_${postId}` : ''}`

/** 帖子编辑 */
export const HTML_TOPIC_EDIT = (postId: Id, type: TopicType | 'blog' = 'group') => {
  if (type === 'group') return `${HOST}/group/reply/${postId}/edit`
  if (type === 'ep') return `${HOST}/subject/ep/edit_reply/${postId}`
  if (type === 'subject') return `${HOST}/subject/reply/${postId}/edit`
  if (type === 'crt') return `${HOST}/character/edit_reply/${postId}`
  if (type === 'blog') return `${HOST}/blog/reply/edit/${postId}`
  return `${HOST}/person/edit_reply/${postId}`
}

/** 小组详情 */
export const HTML_GROUP_INFO = (groupId: Id) => `${HOST}/group/${groupId}`

/** 小组帖子列表 */
export const HTML_GROUP = (groupId: Id, page: number = 1) =>
  `${HOST}/group/${groupId}${groupId === 'my_reply' ? '' : '/forum'}?page=${page}`

/** 我的小组 */
export const HTML_GROUP_MINE = () => `${HOST}/group/mine`

/** 日志 */
export const HTML_BLOG = (blogId: Id, postId?: string) =>
  `${HOST}/blog/${blogId}${postId ? `#post_${postId}` : ''}`

/** 全站日志列表 */
export const HTML_BLOG_LIST = (type: string = '', page: number = 1) =>
  `${HOST}/${type !== 'all' ? `${type}/` : ''}blog/${page}.html`

/**
 * 搜索
 *
 * @param {*} text
 * @param {*} cat
 * @param {*} page
 * @param {*} legacy 是否精准匹配
 */
export const HTML_SEARCH = (text: string, cat: SearchCat, page: number = 1, legacy = '') => {
  const [type, _cat] = String(cat).split('_')
  return `${HOST}/${type}_search/${text}?cat=${_cat}&page=${page}&legacy=${legacy ? 1 : 0}`
}

/** 标签 */
export const HTML_TAG = (
  text: string,
  type: SubjectType = 'anime',
  order: TagOrder | '' = '',
  page: number = 1,
  airtime?: string,
  meta?: boolean
) => {
  return `${HOST}/${type}/tag/${text}${
    airtime ? `/airtime/${airtime}` : ''
  }?sort=${order}&page=${page}&meta=${meta ? 1 : ''}`
}

/** 排行榜 */
export const HTML_RANK = (
  type: SubjectType = 'anime',
  order: TagOrder = 'rank',
  page: number = 1,
  filter?: RankFilter,
  airtime?: string
) => {
  return `${HOST}/${type}/browser${filter ? `/${filter}` : ''}${
    airtime ? `/airtime/${airtime}` : ''
  }?sort=${order}&page=${page}`
}

/**
 * 排行榜 V2
 *  - 动画顺序: 一级分类/来源/标签/地区/受众
 *  - 书籍顺序: 一级分类/二级分类(系列)
 *  - 音乐顺序: N/A
 *  - 游戏顺序: 一级分类/二级分类(平台)/标签/受众/分级
 *  - 三次顺序: 一级分类/题材/地区
 *
 *  - 通用顺序: HOST/类型/browser/一级分类/二级分类/来源/题材/标签/地区/受众/分级/airtime/时间?排序
 * */
export const HTML_RANK_V2 = (query: {
  /** 类型 */
  type: SubjectType

  /** 一级分类 */
  filter: RankFilter

  /** 二级分类 */
  filterSub: RankFilterSub

  /** 来源 */
  source: Source | ''

  /** 题材 */
  theme: Theme | ''

  /** 标签 */
  tag: Tag | ''

  /** 地区 */
  area: Area | ''

  /** 受众 */
  target: Target | ''

  /** 分级 */
  classification: Classification | ''

  /** 时间 */
  airtime: string

  /** 排序 */
  order: TagOrder

  /** 页码 */
  page: number
}) => {
  const {
    type = 'anime',
    filter,
    filterSub,
    source,
    theme,
    tag,
    area,
    target,
    classification,
    airtime,
    order = 'rank',
    page = 1
  } = query
  let url = [
    `${HOST}/${type}/browser`,
    filter,
    filterSub,
    source,
    theme,
    tag,
    area,
    target,
    classification,
    airtime ? `airtime/${airtime}` : ''
  ]
    .filter(item => !!item)
    .join('/')
  url += `?${urlStringify({
    sort: order,
    page
  })}`
  return url
}

/** 索引 */
export const HTML_BROSWER = (
  type: SubjectType = 'anime',
  airtime: string | number = '2022-6',
  page: number = 1,
  sort: '' | 'date' | 'rank'
) => `${HOST}/${type}/browser/airtime/${airtime}?page=${page}&sort=${sort}`

/** 目录 */
export const HTML_CATALOG = (type: string = '', page: number = 1) =>
  `${HOST}/index/browser?page=${page}&orderby=${type}`

/** 目录详情 */
export const HTML_CATALOG_DETAIL = (id: Id) => `${HOST}/index/${id}`

/** 用户的目录 */
export const HTML_USERS_CATALOGS = (
  userId: UserId = '',
  page: number = 1,
  isCollect: boolean = false
) => `${HOST}/user/${userId}/index${isCollect ? '/collect' : ''}?page=${page}`

/** 用户的维基 */
export const HTML_USERS_WIKI = (userId: UserId = '') => `${HOST}/user/${userId}/wiki`

/** 添加新讨论 */
export const HTML_NEW_TOPIC = (group?: string) =>
  group ? `${HOST}/group/${group}/new_topic` : `${HOST}/rakuen/new_topic`

/** 添加新时间线 */
export const HTML_NEW_TIMELINE = (userId: UserId) => `${HOST}/user/${userId}/timeline?type=say`

/** 电波提醒 */
export const HTML_NOTIFY = () => `${HOST}/notify/all`

/** 收件箱 */
export const HTML_PM = (page: number = 1) => `${HOST}/pm/inbox.chii?page=${page}`

/** 发件箱 */
export const HTML_PM_OUT = (page: number = 1) => `${HOST}/pm/outbox.chii?page=${page}`

/** 短信详情 */
export const HTML_PM_DETAIL = (id: Id) => `${HOST}/pm/view/${id}.chii`

/**
 * [POST] 发短信
 *
 * query
 * [related]
 * [msg_receivers]
 * [current_msg_id]
 * [formhash]
 * [msg_title]
 * [msg_body]
 * [chat] 'on'
 * [submit] '回复'
 */
export const HTML_PM_CREATE = () => `${HOST}/pm/create.chii`

/** 新短信参数 */
export const HTML_PM_PARAMS = (userId: UserId) => `${HOST}/pm/compose/${userId}.chii`

/** 每日放送 */
export const HTML_CALENDAR = () => `${HOST}/calendar`

/** 时光机 */
export const HTML_USER_COLLECTIONS = (
  userId: UserId,
  scope: SubjectType = 'anime',
  type?: CollectionStatus,
  order?: CollectionsOrder,
  tag: string = '',
  page: number = 1
) =>
  `${HOST}/${scope}/list/${userId}/${type}?${urlStringify({
    orderby: order,
    tag,
    page
  })}`

/** 个人设置 */
export const HTML_USER_SETTING = () => `${HOST}/settings`

/** 用户时光机页面 */
export const HTML_USERS = (userId: UserId) => `${HOST}/user/${userId}`

/** 用户好友 */
export const HTML_FRIENDS = (userId: UserId) => `${HOST}/user/${userId}/friends`

/** 用户收藏的虚拟角色 */
export const HTML_USERS_CHARCTER = (userId: UserId = '', page: number = 1) =>
  `${HOST}/user/${userId}/mono/character?page=${page}`

/** 用户收藏的现实人物 */
export const HTML_USERS_PERSON = (userId: UserId = '', page: number = 1) =>
  `${HOST}/user/${userId}/mono/person?page=${page}`

/** 我收藏人物的最近作品 */
export const HTML_USERS_MONO_RECENTS = (page: number = 1) => `${HOST}/mono/update?page=${page}`

/** 用户日志列表 */
export const HTML_USERS_BLOGS = (userId: UserId = '', page: number = 1) =>
  `${HOST}/user/${userId}/blog?page=${page}`

/** 标签 */
export const HTML_TAGS = (type: SubjectType, page: number = 1, filter?: string) => {
  if (filter && filter.length) {
    return `${HOST}/search/tag/${type}/${filter}?page=${page}`
  }
  return `${HOST}/${type}/tag?page=${page}`
}

/** 吐槽 */
export const HTML_SAY = (userId: UserId, id: Id) => `${HOST}/user/${userId}/timeline/status/${id}`

/** 频道聚合 */
export const HTML_CHANNEL = (channel: SubjectType) => `${HOST}/${channel}`

/** 条目更多角色 */
export const HTML_SUBJECT_CHARACTERS = (subjectId: SubjectId) =>
  `${HOST}/subject/${subjectId}/characters`

/** 条目更多制作人员 */
export const HTML_SUBJECT_PERSONS = (subjectId: SubjectId) => `${HOST}/subject/${subjectId}/persons`

/** 维基人 */
export const HTML_WIKI = () => `${HOST}/wiki`

/** DOLLARS */
export const HTML_DOLLARS = () => `${HOST}/dollars`

/**
 * 回复帖子
 *
 * query
 * ---------- config ----------
 * [content]       '(bgm38) 来一个38'
 * [related_photo] 0
 * [lastview]      1560439402
 * [formhash]      'e43af534'
 * [submit]        'submit'
 *
 * ---------- sub reply ----------
 * [related]       1453695
 * [sub_reply_uid] 456208
 * [post_uid]      456208
 */
export const HTML_ACTION_RAKUEN_REPLY = (
  topicId: string | number,
  type: RakuenReplyType = 'group/topic'
) => `${HOST}/${type}/${topicId}/new_reply?ajax=1`

/** 回复日志, 参数同上 */
export const HTML_ACTION_BLOG_REPLY = (topicId: TopicId) =>
  `${HOST}/blog/entry/${topicId}/new_reply?ajax=1`

/** 回复吐槽 */
export const HTML_ACTION_TIMELINE_REPLY = (id: Id) => `${HOST}/timeline/${id}/new_reply?ajax=1`

/** 发新吐槽 */
export const HTML_ACTION_TIMELINE_SAY = () => `${HOST}/update/user/say?ajax=1`

/** 删除收藏 */
export const HTML_ACTION_ERASE_COLLECTION = (subjectId: SubjectId, formhash: string) =>
  `${HOST}/subject/${subjectId}/remove?gh=${formhash}`

/**
 * 输入框更新章节进度
 *
 * query
 * [referer] 'subject'
 * [submit] '更新'
 * [watchedeps] 3
 * [watched_vols] 1 | ''
 */
export const HTML_ACTION_SUBJECT_SET_WATCHED = (subjectId: SubjectId) =>
  `${HOST}/subject/set/watched/${subjectId}`

/**
 * 条目管理
 *
 * query
 * [referer] 'subject'
 * [interest] 3
 * [rating]
 * [tags]
 * [comment]
 * [privacy]
 * [update] '保存'
 */
export const HTML_ACTION_SUBJECT_INTEREST_UPDATE = (subjectId: SubjectId, formhash: string) =>
  `${HOST}/subject/${subjectId}/interest/update?gh=${formhash}`

/**
 * [POST] 创建目录
 *
 * query
 * [formhash]
 * [title] ''
 * [desc] ''
 * [submit] '创建目录'
 */
export const HTML_ACTION_CATALOG_CREATE = () => `${HOST}/index/create`

/**
 * [POST] 删除目录
 *
 * query
 * [formhash]
 * [submit] '我要删除这个目录'
 */
export const HTML_ACTION_CATALOG_DELETE = (catalogId: Id) => `${HOST}/index/${catalogId}/erase`

/**
 * [POST] 修改目录
 *
 * query
 * [formhash]
 * [title] '',
 * [desc] '',
 * [submit] '保存修改'
 */
export const HTML_ACTION_CATALOG_EDIT = (catalogId: Id) => `${HOST}/index/${catalogId}/edit`

/**
 * [POST] 目录添加条目
 *
 * query
 * [formhash]
 * [cat] '0'
 * [add_related] subjectId
 * [submit] '添加条目关联'
 */
export const HTML_ACTION_CATALOG_ADD_RELATED = (catalogId: Id) =>
  `${HOST}/index/${catalogId}/add_related`

/**
 * [POST] 目录修改条目
 *
 * query
 * [formhash]
 * [content] ''
 * [order] '0'
 * [submit] '提交'
 */
export const HTML_ACTION_CATALOG_MODIFY_SUBJECT = (itemId: Id) =>
  `${HOST}/index/related/${itemId}/modify`

/** 条目讨论版 */
export const HTML_BOARD = (subjectId: SubjectId) => `${HOST}/subject/${subjectId}/board`

/** 条目影评 */
export const HTML_REVIEWS = (subjectId: SubjectId, page: number = 1) =>
  `${HOST}/subject/${subjectId}/reviews/${page}.html`

/** 条目修订历史 */
export const HTML_SUBJECT_WIKI_EDIT = (subjectId: SubjectId) => `${HOST}/subject/${subjectId}/edit`

/** 条目封面修订历史 */
export const HTML_SUBJECT_WIKI_COVER = (subjectId: SubjectId) =>
  `${HOST}/subject/${subjectId}/upload_img`

/** 隐私 */
export const HTML_PRIVACY = () => `${HOST}/settings/privacy`

/** 语雀文档单页 */
export const HTML_SINGLE_DOC = (page: string) => `${URL_ZHINAN}/${page}?singleDoc`

/** VIB */
export const HTML_SUBJECT_STATS = (subjectId: SubjectId) => `${HOST}/subject/${subjectId}/stats`
