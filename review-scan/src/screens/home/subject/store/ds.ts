/*
 * @Author: czy0729
 * @Date: 2022-05-11 19:30:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-20 07:19:44
 */
import { _ } from '@stores'
import { LIST_EMPTY } from '@constants'
import { CompletionItem, Loaded, RatingStatus, Sites, TranslateResult } from '@types'
import { COMPONENT } from '../ds'
import { AnitabiData, EpsData, SubjectSnapshot } from '../types'

/** 唯一命名空间 */
export const NAMESPACE = `Screen${COMPONENT}` as const

/** 页面每次进入和退出都需要还原的状态 */
export const RESET_STATE = {
  /** 头部是否固定 */
  fixed: false,

  /** 可视范围底部 y */
  visibleBottom: Math.floor(_.window.height * 2),

  /** 当前页面实例是否在路由栈中 (用于退出页面后马上拦截剩余的请求) */
  focused: false,

  /** 当前页面实例是否操作过 (用于进入页面时不显示过多看不见的模块) */
  scrolled: false
}

/** 页面首次初始化后需要还原的状态 */
export const EXCLUDE_STATE = {
  ...RESET_STATE,

  /** 是否显示管理模态框 */
  visible: false,

  /** 是否提交请求中 */
  disabled: false,

  /** 是否显示目录管理模态框 */
  folder: false,

  /** 书籍章 */
  chap: '' as string | number,

  /** 书籍卷 */
  vol: '' as string | number,

  /** 吐槽分数分组 */
  filterScores: [],

  /** 翻译缓存 */
  translateResult: [] as TranslateResult,

  /** 曲目名字翻译缓存 */
  discTranslateResult: [] as TranslateResult,

  /** 云端缓存的条目信息 */
  subject: {} as SubjectSnapshot,

  /** 云端缓存的留言信息 */
  comments: LIST_EMPTY,

  /** Box 中按钮是否允许使用翻页动画 */
  flip: false,
  flipKey: 0,

  /** Eps 中按钮是否允许使用翻页动画 */
  flipEps: false,

  /** 是否显示锐评框 */
  chatModalVisible: false,

  /** 锐评请求中 */
  chatLoading: false
}

/** 页面实例状态 */
export const STATE = {
  ...EXCLUDE_STATE,

  /** 章节是否倒序 */
  epsReverse: false,

  /** 普通条目章节 */
  watchedEps: '' as string | number,

  /** 筛选章节的开头 */
  filterEps: 0,

  /** 吐槽状态筛选 */
  filterStatus: '' as '' | RatingStatus,

  /** bangumi-data 中找到的 item */
  bangumiInfo: {
    /** 动画在线地址 */
    sites: [],

    /** 动画类型 */
    type: ''
  } as {
    sites: {
      site: Sites
      id: string
    }[]
    type: string
  },

  /** 播放源 */
  epsData: {
    _loaded: false
  } as EpsData,

  /** 缩略图 */
  epsThumbs: [],

  /** 缩略图请求 header */
  epsThumbsHeader: {} as {
    Referer?: string
  },

  /** 视频 */
  videos: [],

  /** 圣地巡游信息 */
  anitabi: {
    litePoints: [],
    _loaded: false
  } as AnitabiData,

  /** 评论只看当前版本 */
  filterVersion: false,

  /** 锐评 */
  chat: {
    bangumi: [] as CompletionItem[],
    burakkuSakura: [] as CompletionItem[],
    miku: [] as CompletionItem[],
    index: -1,
    _loaded: false as Loaded
  },

  /** 页面初始化完成 */
  _loaded: false as Loaded
}

/** 分数数据结构 */
export const INIT_RATING = {
  count: {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0
  },
  score: '',
  total: ''
}

/** 关联模块排序优先级 (按描述) */
export const SORT_RELATION_DESC = {
  动画: 110,
  续集: 100,
  前传: 90,
  主线故事: 82,
  剧场版: 81,
  番外篇: 80,
  相同世界观: 79,
  衍生: 78,
  书籍: 70,
  片头曲: 65,
  片尾曲: 64,
  原声集: 63,
  角色歌: 62,
  游戏: 40,
  三次元: 30,
  其他: -10
} as const

/** 完全隐藏一个模块 */
export const NON_SHOW = [false, false] as const

export const TEXT_ACTIONS_MANAGE = '跳转管理'

export const TEXT_ORIGINS_MANAGE = '源头管理'

export const TEXT_ICS_MANAGE = '导出放送日程ICS'

export const TEXT_VIB = 'VIB'

export const TEXT_ANI_DB = 'AniDB'

export const TEXT_MAL = 'MAL'

export const TEXT_NETABA = 'netaba.re'
