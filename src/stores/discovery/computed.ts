/*
 * @Author: czy0729
 * @Date: 2023-04-23 15:45:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-10 17:57:19
 */
import { computed } from 'mobx'
import { LIST_EMPTY } from '@constants'
import { Id, StoreConstructor, SubjectId, SubjectType } from '@types'
import {
  INIT_ANITAMA_TIMELINE_ITEM,
  INIT_CATALOG_ITEM,
  INIT_CATELOG_DETAIL_ITEM,
  INIT_CHANNEL,
  INIT_NINGMOE_DETAIL_ITEM,
  STATE
} from './init'
import { getInt } from './utils'
import State from './state'
import {
  Blog,
  Catalog,
  CatalogDetail,
  CatalogDetailFromOSS,
  Channel,
  News,
  Tags,
  Wiki
} from './types'

export default class Computed extends State implements StoreConstructor<typeof STATE> {
  /** 目录 */
  catalog(type: '' | 'collect' | 'me' = '', page: number = 1) {
    const STATE_KEY = 'catalog'
    this.init(STATE_KEY, true)
    return computed(() => {
      const ITEM_KEY = `${type}|${page}`
      return (this.state[STATE_KEY][ITEM_KEY] || INIT_CATALOG_ITEM) as Catalog
    }).get()
  }

  /** 目录详情 */
  catalogDetail(id: Id) {
    const last = getInt(id)
    const STATE_KEY = `catalogDetail${last}` as const
    const ITEM_KEY = id
    this.init(STATE_KEY, true)
    return computed(() => {
      return (this.state?.[STATE_KEY]?.[ITEM_KEY] || INIT_CATELOG_DETAIL_ITEM) as CatalogDetail
    }).get()
  }

  /** 目录详情 (云缓存) */
  catalogDetailFromOSS(id: Id) {
    this.init('catalogDetailFromOSS', true)
    return computed<CatalogDetailFromOSS>(() => {
      return this.state.catalogDetailFromOSS[id] || INIT_CATELOG_DETAIL_ITEM
    }).get()
  }

  /** 标签 */
  tags(type: SubjectType, filter?: string) {
    return computed<Tags>(() => {
      const key = `${type}|${filter}`
      return this.state.tags[key] || LIST_EMPTY
    }).get()
  }

  /** 全站日志 */
  blog(type: SubjectType | 'all' | '' = '', page: number = 1) {
    const STATE_KEY = 'blog'
    this.init(STATE_KEY, true)

    return computed(() => {
      const ITEM_ARGS = [type, page]
      const ITEM_KEY = ITEM_ARGS.join('|')
      return (this.state[STATE_KEY][ITEM_KEY] || LIST_EMPTY) as Blog
    }).get()
  }

  /** 日志查看历史 */
  blogReaded(blogId: Id) {
    const STATE_KEY = 'blogReaded'
    this.init(STATE_KEY, true)

    return computed<boolean>(() => {
      const ITEM_KEY = blogId
      return this.state[STATE_KEY][ITEM_KEY] || false
    }).get()
  }

  /** 频道聚合 */
  channel(type: SubjectType = 'anime') {
    this.init('channel', true)
    return computed<Channel>(() => {
      return this.state.channel[type] || INIT_CHANNEL
    }).get()
  }

  /** 在线人数 */
  @computed get online() {
    this.init('online', true)
    return this.state.online
  }

  /** 维基人 */
  @computed get wiki(): Wiki {
    this.init('wiki', true)
    return this.state.wiki
  }

  /** 动漫之家资讯 */
  dmzjTimeline(page: number = 1) {
    return computed<News>(() => {
      return this.state.dmzjTimeline[page] || INIT_ANITAMA_TIMELINE_ITEM
    }).get()
  }

  /** 机核资讯 */
  gcoresTimeline(page: number = 1) {
    return computed<News>(() => {
      return this.state.gcoresTimeline[page] || INIT_ANITAMA_TIMELINE_ITEM
    }).get()
  }

  /** 机核资讯 */
  hexiesheTimeline(page: number = 1) {
    return computed<News>(() => {
      return this.state.hexiesheTimeline[page] || INIT_ANITAMA_TIMELINE_ITEM
    }).get()
  }

  /** @deprecated 随机看看 */
  @computed get random() {
    return this.state.random
  }

  /** @deprecated 柠萌条目信息 */
  ningMoeDetail(subjectId: SubjectId) {
    return computed<typeof INIT_NINGMOE_DETAIL_ITEM>(() => {
      return this.state.ningMoeDetail[subjectId] || INIT_NINGMOE_DETAIL_ITEM
    }).get()
  }

  /** @deprecated Anitama 文章列表 */
  anitamaTimeline(page: number = 1) {
    return computed<News>(() => {
      return this.state.anitamaTimeline[page] || INIT_ANITAMA_TIMELINE_ITEM
    }).get()
  }

  /** DOLLARS */
  @computed get dollars() {
    this.init('dollars', true)
    return this.state.dollars
  }
}
