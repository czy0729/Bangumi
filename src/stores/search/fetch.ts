/*
 * @Author: czy0729
 * @Date: 2023-04-25 15:29:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-10 11:49:50
 */
import { getTimestamp } from '@utils'
import { fetchHTML } from '@utils/fetch'
import { search } from '@utils/kv'
import { HTML_SEARCH } from '@constants'
import { cheerioSearch, cheerioSearchMono } from './common'
import Computed from './computed'
import { DEFAULT_CAT } from './init'
import { FetchSearchArgs } from './types'

export default class Fetch extends Computed {
  /** 搜索 */
  fetchSearch = async (args: FetchSearchArgs, refresh?: boolean) => {
    const { text = '', cat = DEFAULT_CAT } = args || {}
    const _text = text.replace(/ /g, '+')

    const STATE_KEY = 'search'
    const ITEM_ARGS = [_text, cat] as const
    const ITEM_KEY = ITEM_ARGS.join('|')

    try {
      let { legacy = '' } = args || {}
      if (cat === 'mono_all' || cat === 'user') legacy = ''

      const { list, pagination } = this[STATE_KEY](...ITEM_ARGS)
      const page = refresh ? 1 : pagination.page + 1
      const html = await fetchHTML({
        url: HTML_SEARCH(encodeURIComponent(_text), cat, page, legacy),

        // 搜索不加这个会无条件返回错误
        cookie: `; chii_searchDateLine=${legacy == 1 ? 0 : getTimestamp() - 100};`
      })
      if (html.includes('秒内只能进行一次搜索')) return Promise.reject()

      const next = cat.includes('mono') ? cheerioSearchMono(html) : cheerioSearch(html)
      this.setState({
        [STATE_KEY]: {
          [ITEM_KEY]: {
            list: refresh ? next.list : [...list, ...next.list],
            pagination: {
              page,
              pageTotal: next.list.length ? next.pagination.pageTotal : page
            },
            _loaded: getTimestamp()
          }
        }
      })
      this.save(STATE_KEY)
    } catch (error) {
      this.error('fetchSearch', error)
    }

    return this[STATE_KEY](...ITEM_ARGS)
  }

  /** 搜索帖子 */
  fetchRakuenSearch = async (q: string, withMessage: boolean = false) => {
    const data = await search(q, withMessage)
    if (data?.code === 200) {
      const list = data?.data || []
      this.setState({
        rakuenSearch: {
          [`${q}|${withMessage}`]: {
            list: list.sort((a: any, b: any) => b.id - a.id),
            pagination: {
              page: 1,
              pageTotal: 1
            },
            _loaded: getTimestamp()
          }
        }
      })

      return list
    }

    return null
  }
}
