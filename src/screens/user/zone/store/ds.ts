/*
 * @Author: czy0729
 * @Date: 2021-11-30 02:04:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-11 07:46:34
 */
import { INIT_USERS } from '@stores/users/init'
import { USER_STATS_TYPES } from '@stores/users/ds'
import { TIMELINE_TYPE } from '@constants'
import { COLLECTION_TYPES, COMPONENT } from '../ds'

import type { UserStatsKey } from '@stores/users/ds'
import type { CollectionStatusCn, CompletionItem, Loaded, SubjectType, TimeLineType } from '@types'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const DEFAULT_STATS_TYPE = USER_STATS_TYPES[0].value as UserStatsKey

export const DEFAULT_COLLECTION_TYPE = COLLECTION_TYPES[0].value

export const DEFAULT_COLLECTION_EXPAND: Record<CollectionStatusCn, boolean> = {
  在看: true,
  看过: false,
  想看: false,
  搁置: false,
  抛弃: false
}

export const COLLECTION_STATUS_TEXT: Record<
  SubjectType,
  Partial<Record<CollectionStatusCn, string>>
> = {
  anime: {
    在看: '在看',
    看过: '看过',
    想看: '想看'
  },
  book: {
    在看: '在读',
    看过: '读过',
    想看: '想读'
  },
  music: {
    在看: '在听',
    看过: '听过',
    想看: '想听'
  },
  game: {
    在看: '在玩',
    看过: '玩过',
    想看: '想玩'
  },
  real: {
    在看: '在看',
    看过: '看过',
    想看: '想看'
  }
}

export const COLLECTION_STATUS_MAP: Record<string, CollectionStatusCn> = {
  想看: '想看',
  想读: '想看',
  想听: '想看',
  想玩: '想看',
  看过: '看过',
  读过: '看过',
  听过: '看过',
  玩过: '看过',
  在看: '在看',
  在读: '在看',
  在听: '在看',
  在玩: '在看',
  搁置: '搁置',
  抛弃: '抛弃'
}

export const EXCLUDE_STATE = {
  /** 收藏状态折叠 */
  expand: DEFAULT_COLLECTION_EXPAND,

  /** 收藏类型 */
  collectionType: DEFAULT_COLLECTION_TYPE,

  /** 是否显示历史头像模态框 */
  visible: false,

  /** 是否显示用户原始 Id */
  originUid: false,

  /** 是否置顶头部 */
  fixed: false,

  /** 云端快照 */
  users: {
    ...INIT_USERS,
    _loaded: false
  },

  /** 时间线类型 */
  timelineType: TIMELINE_TYPE[0].value as TimeLineType,

  /** 统计类型 */
  statsType: DEFAULT_STATS_TYPE,

  /** 是否显示备注弹窗 */
  remarkModalVisible: false,

  /** 备注弹窗输入框 */
  remarkModalInput: '',

  /** 是否显示锐评框 */
  chatModalVisible: false,

  /** 锐评请求中 */
  chatLoading: false,

  /** 当前页面实例是否在路由栈中 */
  focused: true
}

export const STATE = {
  ...EXCLUDE_STATE,

  /** 选项卡索引位置 */
  page: 0,

  /** 是否最近活跃，用于判断是否显示该用户自定义头像和背景 */
  recent: {},

  /** 锐评 */
  chat: {
    bangumi: [] as CompletionItem[],
    burakkuSakura: [] as CompletionItem[],
    miku: [] as CompletionItem[],
    index: -1,
    _loaded: false as Loaded
  },

  /** 成为好友的时间 */
  friendStatus: '',

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
