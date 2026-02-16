/*
 * @Author: czy0729
 * @Date: 2023-04-25 14:58:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-20 00:56:12
 */
import { computed } from 'mobx'
import { LIST_EMPTY } from '@constants'
import { SearchCat, StoreConstructor } from '@types'
import { DEFAULT_CAT, STATE } from './init'
import State from './state'
import { Search } from './types'

export default class Computed extends State implements StoreConstructor<typeof STATE> {
  /** 搜索结果 */
  search(text: string, cat: SearchCat = DEFAULT_CAT) {
    this.init('search', true)
    return computed<Search>(() => {
      const _text = text.replace(/ /g, '+')
      const key = `${_text}|${cat}`
      return this.state.search[key] || LIST_EMPTY
    }).get()
  }

  /** @deprecated 超展开搜索 */
  searchRakuen(q: string) {
    return computed(() => {
      return this.state.searchRakuen[q] || LIST_EMPTY
    }).get()
  }

  /** 搜索帖子 */
  rakuenSearch(q: string, withMessage: boolean = false) {
    return computed(() => {
      return this.state.rakuenSearch[`${q}|${withMessage}`] || LIST_EMPTY
    }).get()
  }
}
