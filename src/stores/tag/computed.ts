/*
 * @Author: czy0729
 * @Date: 2023-04-25 16:05:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-20 00:56:53
 */
import { computedFn } from '@utils/computed-fn'
import { LIST_EMPTY } from '@constants'
import { DEFAULT_TYPE } from './init'
import State from './state'

import type {
  BrowserSort,
  RankFilter,
  StoreConstructor,
  SubjectType,
  TagOrder,
  UserId
} from '@types'
import type { STATE } from './init'
import type { Browser, Rank, Tag } from './types'

export default class Computed extends State implements StoreConstructor<typeof STATE> {
  // -------------------- 有副作用 (分离 init + computedFn) --------------------
  /** 标签条目 */
  private _tag = computedFn(
    (
      text: string = '',
      type: SubjectType = DEFAULT_TYPE,
      airtime: string = '',
      order?: TagOrder,
      meta?: boolean
    ) => {
      const q = text.replace(/ /g, '+')
      const ITEM_ARGS = [q, type, airtime, order, meta] as const
      const ITEM_KEY = ITEM_ARGS.filter(Boolean).join('|')
      return (this.state.tag[ITEM_KEY] || LIST_EMPTY) as Tag
    }
  )

  /** 排行榜 */
  private _rank = computedFn(
    (type: SubjectType, filter: RankFilter, order: TagOrder, airtime: string, page: number) => {
      const ITEM_ARGS = [type, filter, order, airtime, page] as const
      const ITEM_KEY = ITEM_ARGS.filter(Boolean).join('|')
      return (this.state.rank[ITEM_KEY] || LIST_EMPTY) as Rank
    }
  )

  /** 排行榜 (不分页) */
  private _rankWithoutPagination = computedFn(
    (type: SubjectType, filter: RankFilter, order: TagOrder, airtime: string) => {
      const ITEM_ARGS = [type, filter, order, airtime] as const
      const ITEM_KEY = ITEM_ARGS.filter(Boolean).join('|')
      return (this.state.rankWithoutPagination[ITEM_KEY] || LIST_EMPTY) as Rank
    }
  )

  /** 索引 */
  private _browser = computedFn(
    (type: SubjectType = DEFAULT_TYPE, airtime: string = '', sort: BrowserSort = '') => {
      const ITEM_ARGS = [type, airtime, sort] as const
      const ITEM_KEY = ITEM_ARGS.filter(Boolean).join('|')
      return (this.state.browser[ITEM_KEY] || LIST_EMPTY) as Browser
    }
  )

  /** 图集收藏索引 */
  private _picFavor = computedFn((userId: UserId) => {
    return this.state.picFavor[userId] || []
  })

  // -------------------- 导出方法 (分离 init) --------------------
  /** 标签条目 */
  tag(
    text: string = '',
    type: SubjectType = DEFAULT_TYPE,
    airtime: string = '',
    order?: TagOrder,
    meta?: boolean
  ) {
    this.init('tag', true)
    return this._tag(text, type, airtime, order, meta)
  }

  /** 排行榜 */
  rank(type: SubjectType, filter: RankFilter, order: TagOrder, airtime: string, page: number) {
    this.init('rank', true)
    return this._rank(type, filter, order, airtime, page)
  }

  /** 排行榜 (不分页) */
  rankWithoutPagination(type: SubjectType, filter: RankFilter, order: TagOrder, airtime: string) {
    this.init('rankWithoutPagination', true)
    return this._rankWithoutPagination(type, filter, order, airtime)
  }

  /** 索引 */
  browser(type: SubjectType = DEFAULT_TYPE, airtime: string = '', sort: BrowserSort = '') {
    this.init('browser', true)
    return this._browser(type, airtime, sort)
  }

  /** 图集收藏索引 */
  picFavor(userId: UserId) {
    this.init('picFavor', true)
    return this._picFavor(userId)
  }
}
