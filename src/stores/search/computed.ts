/*
 * @Author: czy0729
 * @Date: 2023-04-25 14:58:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-25 15:26:15
 */
import { computed } from 'mobx'
import { LIST_EMPTY } from '@constants'
import { SearchCat, StoreConstructor } from '@types'
import State from './state'
import { DEFAULT_CAT, STATE } from './init'
import { Search } from './types'

export default class Computed extends State implements StoreConstructor<typeof STATE> {
  /** 搜索结果 */
  search(text: string, cat: SearchCat = DEFAULT_CAT, legacy?: any) {
    this.init('search')
    return computed<Search>(() => {
      const _text = text.replace(/ /g, '+')
      let key = `${_text}|${cat}`
      if (legacy) key += '|legacy'
      return this.state.search[key] || LIST_EMPTY
    }).get()
  }

  /** @deprecated 超展开搜索 */
  searchRakuen(q: string) {
    return computed(() => {
      return this.state.searchRakuen[q] || LIST_EMPTY
    }).get()
  }
}
