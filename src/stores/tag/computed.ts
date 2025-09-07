/*
 * @Author: czy0729
 * @Date: 2023-04-25 16:05:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-20 00:56:53
 */
import { computed } from 'mobx'
import { LIST_EMPTY } from '@constants'
import { BrowserSort, RankFilter, StoreConstructor, SubjectType, TagOrder } from '@types'
import { DEFAULT_TYPE, STATE } from './init'
import State from './state'
import { Browser, Rank, Tag } from './types'

export default class Computed extends State implements StoreConstructor<typeof STATE> {
  /** 标签条目 */
  tag(
    text: string = '',
    type: SubjectType = DEFAULT_TYPE,
    airtime: string = '',
    order?: TagOrder,
    meta?: boolean
  ) {
    this.init('tag', true)
    return computed(() => {
      const q = text.replace(/ /g, '+')
      const ITEM_ARGS = [q, type, airtime, order, meta] as const
      const ITEM_KEY = ITEM_ARGS.filter(Boolean).join('|')
      return (this.state.tag[ITEM_KEY] || LIST_EMPTY) as Tag
    }).get()
  }

  /** 排行榜 */
  rank(type: SubjectType, filter: RankFilter, order: TagOrder, airtime: string, page: number) {
    this.init('rank', true)
    return computed(() => {
      const ITEM_ARGS = [type, filter, order, airtime, page] as const
      const ITEM_KEY = ITEM_ARGS.filter(Boolean).join('|')
      return (this.state.rank[ITEM_KEY] || LIST_EMPTY) as Rank
    }).get()
  }

  /** 索引 */
  browser(type: SubjectType = DEFAULT_TYPE, airtime: string = '', sort: BrowserSort = '') {
    this.init('browser', true)
    return computed(() => {
      const ITEM_ARGS = [type, airtime, sort] as const
      const ITEM_KEY = ITEM_ARGS.filter(Boolean).join('|')
      return (this.state.browser[ITEM_KEY] || LIST_EMPTY) as Browser
    }).get()
  }
}
