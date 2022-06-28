/*
 * @Author: czy0729
 * @Date: 2019-07-15 09:27:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-10 14:18:01
 */
import { LIST_EMPTY } from '@constants'
import { MODEL_RATING_STATUS } from '@constants/model'
import { RatingStatus, SubjectType } from '@types'

/** 命名空间 */
export const NAMESPACE = 'Subject'

/** 看过 */
export const DEFAULT_RATING_STATUS = MODEL_RATING_STATUS.getValue(
  '看过'
) as RatingStatus

/** 条目 */
export const INIT_SUBJECT = {
  air_date: '',
  air_weekday: '',
  blog: null,
  collection: {},
  crt: [],
  eps: [],
  eps_count: '',
  id: '',
  images: {},
  name: '',
  name_cn: '',
  rank: '',
  rating: {
    count: {},
    score: '',
    total: ''
  },
  staff: [],
  summary: '',
  topic: [],
  catalog: [],
  type: '',
  url: '',
  lock: '',
  formhash: ''
}

/** 条目 (HTML) */
export const INIT_SUBJECT_FROM_HTML_ITEM = {
  /** 标签 */
  tags: [],

  /** 关联条目 */
  relations: [],

  /** 好友评分 */
  friend: {
    /** 好友评分 */
    score: 0,

    /** 总共多少人评分 */
    total: 0
  },

  /** 曲目列表 */
  disc: [],

  /** 书籍章节信息 */
  book: {
    chap: 0,
    vol: 0,
    totalChap: '',
    totalVol: ''
  },

  /** 单行本 */
  comic: [],

  /** 猜你喜欢 */
  like: [],

  /** 谁在看 */
  who: [],

  /** 详情 */
  info: ''
}

/** 条目 (CDN) */
export const INIT_SUBJECT_FROM_CDN_ITEM = {
  id: '',
  type: '',
  name: '',
  image: '',
  rating: {},
  summary: '',
  info: '',
  collection: {},
  tags: [],
  eps: [],
  disc: [],
  crt: [],
  staff: [],
  relations: [],
  comic: [],
  like: [],
  lock: ''
}

/** 回复项 */
export const INIT_SUBJECT_COMMENTS_ITEM = {
  id: '',
  time: '',
  floor: '',
  avatar: '',
  userId: '',
  userName: '',
  userSign: '',
  replySub: '',
  message: '',
  sub: []
}

/** 角色 */
export const INIT_MONO = {
  /** 日文名 */
  name: '',

  /** 中文名 */
  nameCn: '',

  /** 封面 */
  cover: '',

  /** 简介 */
  info: '',

  /** 内容详情 */
  detail: '',

  /** 最近演出角色 */
  voice: [],

  /** 最近参与 */
  works: [],

  /** 最近参与 */
  workes: [],

  /** 出演 */
  jobs: [],

  /** 加入收藏 */
  collectUrl: '',

  /** 取消收藏 */
  eraseCollectUrl: ''
}

/** 制作人员职位项 */
export const INIT_MONO_WORKS_ITEM = {
  id: '',
  cover: '',
  name: '',
  nameCn: '',
  tip: '',
  position: [] as string[],
  score: '',
  total: '',
  rank: '',
  collected: false,
  type: '' as SubjectType
}

/** 制作人员职位 */
export const INIT_MONO_WORKS = {
  ...LIST_EMPTY,
  filters: []
}

/** wiki */
export const INIT_SUBJECT_WIKI = {
  edits: [],
  covers: []
}
