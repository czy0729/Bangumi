/*
 * @Author: czy0729
 * @Date: 2019-07-15 10:55:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-10 05:46:05
 */
import { LIST_EMPTY } from '@constants'

import type {
  Blog,
  Catalog,
  CatalogDetail,
  CatalogDetailFromOSS,
  Channel,
  Dollars,
  News,
  Tags,
  Wiki
} from './types'
import type { Id, SubjectType } from '@types'

export const NAMESPACE = 'Discovery'

export const DEFAULT_TYPE = 'anime'

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
  catalogDetailFromOSS: {} as Record<Id, CatalogDetailFromOSS>,

  /** 标签 */
  tags: {} as Record<string, Tags>,

  /** 全站日志 */
  blog: {} as Record<string, Blog>,

  /** 日志查看历史 */
  blogReaded: {} as Record<Id, boolean>,

  /** 频道聚合 */
  channel: {
    anime: INIT_CHANNEL,
    book: INIT_CHANNEL,
    game: INIT_CHANNEL,
    music: INIT_CHANNEL,
    real: INIT_CHANNEL
  } as Record<SubjectType, Channel>,

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

  /** 资讯 */
  gcTimeline: {} as Record<number, News>,

  /** 资讯 */
  ymTimeline: {} as Record<number, News>,

  /** 资讯 */
  gsTimeline: {} as Record<number, News>,

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
  STATE[`catalogDetail${i}`] = {} as Record<Id, CatalogDetail>
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
