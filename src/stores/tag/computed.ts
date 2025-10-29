/*
 * @Author: czy0729
 * @Date: 2023-04-25 16:05:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-20 00:56:53
 */
import { computed } from 'mobx'
import { LIST_EMPTY } from '@constants'
import { DEFAULT_TYPE } from './init'
import State from './state'

import type { BrowserSort, RankFilter, StoreConstructor, SubjectType, TagOrder } from '@types'
import type { STATE } from './init'
import type { Browser, Rank, Tag } from './types'

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
    const STATE_KEY = 'rank'
    this.init(STATE_KEY, true)

    return computed(() => {
      const ITEM_ARGS = [type, filter, order, airtime, page] as const
      const ITEM_KEY = ITEM_ARGS.filter(Boolean).join('|')
      return (this.state[STATE_KEY][ITEM_KEY] || LIST_EMPTY) as Rank
    }).get()
  }

  /** 排行榜 (不分页) */
  rankWithoutPagination(type: SubjectType, filter: RankFilter, order: TagOrder, airtime: string) {
    const STATE_KEY = 'rankWithoutPagination'
    this.init(STATE_KEY, true)

    return computed(() => {
      const ITEM_ARGS = [type, filter, order, airtime] as const
      const ITEM_KEY = ITEM_ARGS.filter(Boolean).join('|')
      return (this.state[STATE_KEY][ITEM_KEY] || LIST_EMPTY) as Rank
    }).get()
  }

  /** 索引 */
  browser(type: SubjectType = DEFAULT_TYPE, airtime: string = '', sort: BrowserSort = '') {
    const STATE_KEY = 'browser'
    this.init('browser', true)

    return computed(() => {
      const ITEM_ARGS = [type, airtime, sort] as const
      const ITEM_KEY = ITEM_ARGS.filter(Boolean).join('|')
      return (this.state[STATE_KEY][ITEM_KEY] || LIST_EMPTY) as Browser
    }).get()
  }
}
