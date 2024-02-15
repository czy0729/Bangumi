/*
 * @Author: czy0729
 * @Date: 2019-07-15 09:27:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-15 02:05:15
 */
import { LIST_EMPTY } from '@constants'
import { MODEL_RATING_STATUS } from '@constants/model'
import { Actions, Loaded, Origin, RatingStatus, SubjectType } from '@types'

/** 命名空间 */
export const NAMESPACE = 'Subject'

/** 看过 */
export const DEFAULT_RATING_STATUS = MODEL_RATING_STATUS.getValue('看过') as RatingStatus

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
  formhash: '',
  _responseGroup: '',
  _loaded: 0
}

export const INIT_SUBJECT_V2 = {
  id: '',
  date: '',
  image: '',
  jp: '',
  cn: '',
  tags: [],
  rank: '',
  rating: {},
  collection: {},
  eps: '',
  vol: '',
  locked: false,
  nsfw: false,
  type: '',
  _loaded: true
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
  info: '',
  formhash: '',
  _loaded: 0
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

  /** 谁收藏了 */
  collected: [],

  /** 合作 */
  collabs: [],

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

const STATE = {
  /** 条目 (云缓存) */
  subjectFromOSS: {
    0: INIT_SUBJECT
  },

  /** @deprecated 条目 (CDN) */
  subjectFormCDN: {
    0: INIT_SUBJECT_FROM_CDN_ITEM
  },

  /** @deprecated 条目章节 */
  subjectEp: {
    0: {}
  },

  /** 包含条目的目录 */
  subjectCatalogs: {
    0: LIST_EMPTY
  },

  /** 章节内容 */
  epFormHTML: {
    0: ''
  },

  /** 集数大于 1000 的条目的章节信息 */
  epV2: {
    0: {
      list: [],
      _loaded: 0
    }
  },

  /** 人物 */
  mono: {
    0: INIT_MONO
  },

  /** 人物吐槽箱 */
  monoComments: {
    0: LIST_EMPTY
  },

  /** 人物 (CDN) */
  monoFormCDN: {
    0: INIT_MONO
  },

  /** 人物作品 */
  monoWorks: {
    0: INIT_MONO_WORKS
  },

  /** 人物饰演的角色 */
  monoVoices: {
    0: INIT_MONO_WORKS
  },

  /** 好友评分列表 */
  rating: {
    0: {
      ...LIST_EMPTY,
      counts: {
        wishes: 0,
        collections: 0,
        doings: 0,
        on_hold: 0,
        dropped: 0
      }
    }
  },

  /** 条目分数 (用于收藏按网站评分排序) */
  rank: {
    0: {
      r: 0,
      s: 0,
      _loaded: 0
    }
  },

  /** VIB 相关数据 */
  vib: {
    0: {
      total: 0,
      avg: 0,
      mal: 0,
      malTotal: 0,
      anidb: 0,
      anidbTotal: 0,
      _loaded: 0 as Loaded
    }
  },

  /** r18 */
  nsfw: {
    0: false
  },

  /** wiki 修订历史 */
  wiki: {
    0: INIT_SUBJECT_WIKI
  },

  /** 自定义源头数据 */
  origin: {
    base: {},
    custom: {
      anime: [],
      hanime: [],
      manga: [],
      wenku: [],
      music: [],
      game: [],
      real: []
    }
  } as Origin,

  /** 自定义跳转 */
  actions: {} as Actions
}

/**
 * subject 和 subjectFormHTML 根据 id 最后 2 位拆开 100 个 key 存放
 * 避免 JSON.stringify 后长度太长, 无法本地化
 * 也能减少每次写入本地储存的量
 * @date 2022/04/06
 */
for (let i = 0; i < 1000; i += 1) {
  /** 条目 */
  STATE[`subject${i}`] = {}

  /** 条目 (HTML) */
  STATE[`subjectFormHTML${i}`] = {}

  /** 条目 (new api) */
  STATE[`subjectV2${i}`] = {}

  /** 条目吐槽箱 */
  STATE[`subjectComments${i}`] = {}
}

export { STATE }

export const LOADED = {
  actions: false,
  epV2: false,
  mono: false,
  nsfw: false,
  origin: false,
  rank: false,
  vib: false,
  subjectFromOSS: false
}
