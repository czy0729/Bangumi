/*
 * @Author: czy0729
 * @Date: 2023-04-23 15:45:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-10 05:45:37
 */
import { computed } from 'mobx'
import { computedFn } from 'mobx-utils'
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
  // -------------------- 纯计算 (直接 computedFn) --------------------
  /** 标签 */
  tags = computedFn((type: SubjectType, filter?: string) => {
    const ITEM_KEY = `${type}|${filter}` as const
    return (this.state.tags[ITEM_KEY] || LIST_EMPTY) as Tags
  })

  /** 资讯 */
  gcTimeline = computedFn((page: number = 1) => {
    return (this.state.gcTimeline[page] || LIST_EMPTY) as News
  })

  /** 资讯 */
  ymTimeline = computedFn((page: number = 1) => {
    return (this.state.ymTimeline[page] || LIST_EMPTY) as News
  })

  /** 资讯 */
  gsTimeline = computedFn((page: number = 1) => {
    return (this.state.gsTimeline[page] || LIST_EMPTY) as News
  })

  // -------------------- 有副作用 (分离 init + computedFn) --------------------
  /** 目录 */
  private _catalog = computedFn((type: '' | 'collect' | 'me' = '', page: number = 1) => {
    const ITEM_KEY = `${type}|${page}` as const
    return (this.state.catalog[ITEM_KEY] || INIT_CATALOG_ITEM) as Catalog
  })

  /** 目录详情 */
  private _catalogDetail = computedFn((id: Id) => {
    const last = getInt(id)
    const STATE_KEY = `catalogDetail${last}` as const
    return (this.state?.[STATE_KEY]?.[id] || INIT_CATELOG_DETAIL_ITEM) as CatalogDetail
  })

  /** 目录详情 (云缓存) */
  private _catalogDetailFromOSS = computedFn((id: Id) => {
    return (this.state.catalogDetailFromOSS[id] || INIT_CATELOG_DETAIL_ITEM) as CatalogDetailFromOSS
  })

  /** 全站日志 */
  private _blog = computedFn((type: SubjectType | 'all' | '' = '', page: number = 1) => {
    const ITEM_KEY = [type, page].join('|')
    return (this.state.blog[ITEM_KEY] || LIST_EMPTY) as Blog
  })

  /** 日志查看历史 */
  private _blogReaded = computedFn((blogId: Id) => {
    return (this.state.blogReaded[blogId] || false) as boolean
  })

  /** 频道聚合 */
  private _channel = computedFn((type: SubjectType = 'anime') => {
    return (this.state.channel[type] || INIT_CHANNEL) as Channel
  })

  /** @deprecated 所有收藏条目状态 */
  @computed get online() {
    this.init('online', true)
    return this.state.online
  }

  /** 维基人 */
  @computed get wiki() {
    this.init('wiki', true)
    return this.state.wiki
  }

  /** DOLLARS */
  @computed get dollars() {
    this.init('dollars', true)
    return this.state.dollars
  }

  // -------------------- 导出方法 (分离 init) --------------------
  /** 目录 */
  catalog(type: '' | 'collect' | 'me' = '', page: number = 1) {
    this.init('catalog', true)
    return this._catalog(type, page)
  }

  /** 目录详情 */
  catalogDetail(id: Id) {
    const last = getInt(id)
    this.init(`catalogDetail${last}`, true)
    return this._catalogDetail(id)
  }

  /** 目录详情 (云缓存) */
  catalogDetailFromOSS(id: Id) {
    this.init('catalogDetailFromOSS', true)
    return this._catalogDetailFromOSS(id)
  }

  /** 全站日志 */
  blog(type: SubjectType | 'all' | '' = '', page: number = 1) {
    this.init('blog', true)
    return this._blog(type, page)
  }

  /** 日志查看历史 */
  blogReaded(blogId: Id) {
    this.init('blogReaded', true)
    return this._blogReaded(blogId)
  }

  /** 频道聚合 */
  channel(type: SubjectType = 'anime') {
    this.init('channel', true)
    return this._channel(type)
  }
}
