/*
 * @Author: czy0729
 * @Date: 2019-05-15 02:20:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-29 00:00:00
 *
 * 页面派生数据
 */
import { computed } from 'mobx'
import { searchStore, systemStore } from '@stores'
import State from './state'

import type { RakuenSearch } from './types'

export default class Computed extends State {
  /** 搜索结果, 非会员只保留一页 */
  @computed get search(): RakuenSearch {
    const { advance } = systemStore
    const { keyword, sort } = this.state

    // computedFn 深层类型解析为 error type, 显式收口
    const search = searchStore.rakuenSearch(keyword, sort) as RakuenSearch
    if (advance) return search

    return {
      ...search,
      pagination: {
        page: 1,
        pageTotal: 1
      },
      // 服务端还有后续页但不能翻页
      _filter: (search.pagination?.pageTotal || 1) > 1 ? 1 : 0
    }
  }
}
