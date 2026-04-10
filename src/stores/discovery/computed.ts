/*
 * @Author: czy0729
 * @Date: 2023-04-23 15:45:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-10 05:45:37
 */
import { computed } from 'mobx'
import { LIST_EMPTY } from '@constants'
import { INIT_CATALOG_ITEM, INIT_CATELOG_DETAIL_ITEM, INIT_CHANNEL } from './init'
import { getInt } from './utils'
import State from './state'

import type { Id, StoreConstructor, SubjectType } from '@types'
import type { STATE } from './init'
import type {
  Blog,
  Catalog,
  CatalogDetail,
  CatalogDetailFromOSS,
  Channel,
  News,
  Tags
} from './types'

export default class Computed extends State implements StoreConstructor<typeof STATE> {
  /** 目录 */
  catalog(type: '' | 'collect' | 'me' = '', page: number = 1) {
    const STATE_KEY = 'catalog'
    this.init(STATE_KEY, true)

    return computed(() => {
      const ITEM_KEY = `${type}|${page}` as const
      return (this.state[STATE_KEY][ITEM_KEY] || INIT_CATALOG_ITEM) as Catalog
    }).get()
  }

  /** 目录详情 */
  catalogDetail(id: Id) {
    const last = getInt(id)
    const STATE_KEY = `catalogDetail${last}` as const
    this.init(STATE_KEY, true)

    return computed(() => {
      const ITEM_KEY = id
      return (this.state?.[STATE_KEY]?.[ITEM_KEY] || INIT_CATELOG_DETAIL_ITEM) as CatalogDetail
    }).get()
  }

  /** 目录详情 (云缓存) */
  catalogDetailFromOSS(id: Id) {
    const STATE_KEY = 'catalogDetailFromOSS'
    this.init(STATE_KEY, true)

    return computed(() => {
      const ITEM_KEY = id
      return (this.state[STATE_KEY][ITEM_KEY] || INIT_CATELOG_DETAIL_ITEM) as CatalogDetailFromOSS
    }).get()
  }

  /** 标签 */
  tags(type: SubjectType, filter?: string) {
    const STATE_KEY = 'tags'

    return computed(() => {
      const ITEM_KEY = `${type}|${filter}` as const
      return (this.state[STATE_KEY][ITEM_KEY] || LIST_EMPTY) as Tags
    }).get()
  }

  /** 全站日志 */
  blog(type: SubjectType | 'all' | '' = '', page: number = 1) {
    const STATE_KEY = 'blog'
    this.init(STATE_KEY, true)

    return computed(() => {
      const ITEM_ARGS = [type, page] as const
      const ITEM_KEY = ITEM_ARGS.join('|')
      return (this.state[STATE_KEY][ITEM_KEY] || LIST_EMPTY) as Blog
    }).get()
  }

  /** 日志查看历史 */
  blogReaded(blogId: Id) {
    const STATE_KEY = 'blogReaded'
    this.init(STATE_KEY, true)

    return computed(() => {
      const ITEM_KEY = blogId
      return (this.state[STATE_KEY][ITEM_KEY] || false) as boolean
    }).get()
  }

  /** 频道聚合 */
  channel(type: SubjectType = 'anime') {
    const STATE_KEY = 'channel'
    this.init(STATE_KEY, true)

    return computed(() => {
      const ITEM_KEY = type
      return (this.state[STATE_KEY][ITEM_KEY] || INIT_CHANNEL) as Channel
    }).get()
  }

  /** 在线人数 */
  @computed get online() {
    const STATE_KEY = 'online'
    this.init(STATE_KEY, true)

    return this.state[STATE_KEY]
  }

  /** 维基人 */
  @computed get wiki() {
    const STATE_KEY = 'wiki'
    this.init(STATE_KEY, true)

    return this.state[STATE_KEY]
  }

  /** 资讯 */
  gcTimeline(page: number = 1) {
    const STATE_KEY = 'gcTimeline'

    return computed(() => {
      const ITEM_KEY = page
      return (this.state[STATE_KEY][ITEM_KEY] || LIST_EMPTY) as News
    }).get()
  }

  /** 资讯 */
  ymTimeline(page: number = 1) {
    const STATE_KEY = 'ymTimeline'

    return computed(() => {
      const ITEM_KEY = page
      return (this.state[STATE_KEY][ITEM_KEY] || LIST_EMPTY) as News
    }).get()
  }

  /** 资讯 */
  gsTimeline(page: number = 1) {
    const STATE_KEY = 'gsTimeline'

    return computed(() => {
      const ITEM_KEY = page
      return (this.state[STATE_KEY][ITEM_KEY] || LIST_EMPTY) as News
    }).get()
  }

  /** DOLLARS */
  @computed get dollars() {
    const STATE_KEY = 'dollars'
    this.init(STATE_KEY, true)

    return this.state[STATE_KEY]
  }
}
