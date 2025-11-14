/*
 * @Author: czy0729
 * @Date: 2019-07-15 10:55:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-14 20:09:45
 */
import { LIST_EMPTY } from '@constants'

import type { Blog, Catalog, Dollars, News, Wiki } from './types'

export const NAMESPACE = 'Discovery'

export const DEFAULT_TYPE = 'anime'

export const INIT_NINGMOE_DETAIL_ITEM = {
  id: '',
  bgmId: '',
  eps: []
}

export const INIT_CATALOG_ITEM = {
  list: []
}

export const INIT_CATELOG_DETAIL_ITEM = {
  list: [],
  avatar: '',
  progress: '', // 1/10
  nickname: '',
  userId: '',
  time: '',
  content: '',
  replyCount: ''
}

export const INIT_BLOG_ITEM = {
  list: []
}

export const INIT_CHANNEL = {
  rankTop: [],
  rank: [],
  friends: [],
  tags: [],
  blog: [],
  discuss: []
}

const STATE = {
  /** 目录 */
  catalog: {} as Record<string, Catalog>,

  /** 目录详情 (云缓存) */
  catalogDetailFromOSS: {
    0: INIT_CATELOG_DETAIL_ITEM
  },

  /** 标签 */
  tags: {
    0: LIST_EMPTY
  },

  /** 全站日志 */
  blog: {} as Record<string, Blog>,

  /** 日志查看历史 */
  blogReaded: {
    0: false
  },

  /** 频道聚合 */
  channel: {
    0: INIT_CHANNEL,
    anime: INIT_CHANNEL,
    book: INIT_CHANNEL,
    game: INIT_CHANNEL,
    music: INIT_CHANNEL,
    real: INIT_CHANNEL
  },

  /** 在线人数 */
  online: 0,

  /** 维基人 */
  wiki: {
    counts: [],
    timeline: {
      all: [],
      lock: [],
      merge: [],
      crt: [],
      prsn: [],
      ep: [],
      relation: [],
      subjectPerson: [],
      subjectCrt: []
    },
    last: {
      all: [],
      anime: [],
      book: [],
      music: [],
      game: [],
      real: []
    }
  } as Wiki,

  gcTimeline: {} as Record<number, News>,
  ymTimeline: {} as Record<number, News>,
  gsTimeline: {} as Record<number, News>,

  /** @deprecated 随机看看 */
  random: LIST_EMPTY,

  /** @deprecated 柠萌条目信息 */
  ningMoeDetail: {
    0: INIT_NINGMOE_DETAIL_ITEM
  },

  /** DOLLARS (聊天室) */
  dollars: LIST_EMPTY as Dollars
}

/**
 * catalogDetail 根据 id 最后 2 位拆开 100 个 key 存放
 * 避免 JSON.stringify 后长度太长, 无法本地化
 * 也能减少每次写入本地储存的量
 * @date 2023-03-29
 */
for (let i = 0; i < 100; i += 1) {
  /** 目录详情 */
  STATE[`catalogDetail${i}`] = {
    0: INIT_CATELOG_DETAIL_ITEM
  }
}

export { STATE }

export const LOADED = {
  blog: false,
  blogReaded: false,
  catalog: false,
  // catalogDetail: false,
  catalogDetailFromOSS: false,
  channel: false,
  online: false,
  wiki: false,
  dollars: false
}
