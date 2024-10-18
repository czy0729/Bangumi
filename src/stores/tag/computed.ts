/*
 * @Author: czy0729
 * @Date: 2023-04-25 16:05:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-25 16:06:43
 */
import { computed } from 'mobx'
import { LIST_EMPTY } from '@constants'
import {
  BrowserSort,
  RankAnimeFilter,
  RankBookFilter,
  RankGameFilter,
  RankRealFilter,
  StoreConstructor,
  SubjectType
} from '@types'
import { DEFAULT_TYPE, STATE } from './init'
import State from './state'
import { Browser, Rank, Tag } from './types'

export default class Computed extends State implements StoreConstructor<typeof STATE> {
  /** 标签条目 */
  tag(text: string = '', type: SubjectType = DEFAULT_TYPE, airtime: string = '', meta?: boolean) {
    this.init('tag')
    return computed<Tag>(() => {
      let key = `${text.replace(/ /g, '+')}|${type}|${airtime}`
      if (meta) key += `|${meta}`

      return this.state.tag[key] || LIST_EMPTY
    }).get()
  }

  /** 排行榜 */
  rank(
    type: SubjectType = DEFAULT_TYPE,
    page: number = 1,
    filter: RankAnimeFilter | RankBookFilter | RankGameFilter | RankRealFilter = '',
    airtime: string = ''
  ) {
    this.init('rank')
    return computed<Rank>(() => {
      const key = `${type}|${page}|${filter}|${airtime}`
      return this.state.rank[key] || LIST_EMPTY
    }).get()
  }

  /** 索引 */
  browser(type: SubjectType = DEFAULT_TYPE, airtime: string = '', sort: BrowserSort = '') {
    this.init('browser')
    return computed<Browser>(() => {
      const key = `${type}|${airtime}|${sort}`
      return this.state.browser[key] || LIST_EMPTY
    }).get()
  }
}
