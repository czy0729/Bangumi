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
    return computed<Tag>(() => {
      let key = `${text.replace(/ /g, '+')}|${type}|${airtime}|${order}`
      if (meta) key += `|${meta}`

      return this.state.tag[key] || LIST_EMPTY
    }).get()
  }

  /** 排行榜 */
  rank(type: SubjectType, filter: RankFilter, order: TagOrder, airtime: string, page: number) {
    this.init('rank', true)
    return computed<Rank>(() => {
      const key = [type, filter, order, airtime, page].filter(item => !!item).join('|')
      return this.state.rank[key] || LIST_EMPTY
    }).get()
  }

  /** 索引 */
  browser(type: SubjectType = DEFAULT_TYPE, airtime: string = '', sort: BrowserSort = '') {
    this.init('browser', true)
    return computed<Browser>(() => {
      const key = `${type}|${airtime}|${sort}`
      return this.state.browser[key] || LIST_EMPTY
    }).get()
  }
}
