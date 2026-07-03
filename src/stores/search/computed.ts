/*
 * @Author: czy0729
 * @Date: 2023-04-25 14:58:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-20 00:56:12
 */
import { computedFn } from '@utils/computed-fn'
import { LIST_EMPTY } from '@constants'
import { DEFAULT_CAT } from './init'
import State from './state'

import type { SearchCat, StoreConstructor } from '@types'
import type { STATE } from './init'
import type { Search } from './types'

export default class Computed extends State implements StoreConstructor<typeof STATE> {
  // -------------------- 纯计算 (直接 computedFn) --------------------
  /** @deprecated 超展开搜索 */
  searchRakuen = computedFn((q: string) => {
    return this.state.searchRakuen[q] || LIST_EMPTY
  })

  /** 搜索帖子 */
  rakuenSearch = computedFn((q: string, withMessage: boolean = false) => {
    return this.state.rakuenSearch[`${q}|${withMessage}`] || LIST_EMPTY
  })

  // -------------------- 有副作用 (分离 init + computedFn) --------------------
  /** 搜索结果 */
  private _search = computedFn((text: string, cat: SearchCat = DEFAULT_CAT) => {
    const _text = text.replace(/ /g, '+')
    const key = `${_text}|${cat}`
    return (this.state.search[key] || LIST_EMPTY) as Search
  })

  /** 搜索结果 */
  search(text: string, cat: SearchCat = DEFAULT_CAT) {
    this.init('search', true)
    return this._search(text, cat)
  }
}
