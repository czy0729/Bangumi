/*
 * @Author: czy0729
 * @Date: 2023-04-25 16:06:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-25 16:09:19
 */
import { getTimestamp } from '@utils'
import { fetchHTML } from '@utils/fetch'
import { HTML_BROSWER, HTML_RANK_V2, HTML_TAG } from '@constants'
import { cheerioRank, cheerioTags } from './common'
import Computed from './computed'
import { DEFAULT_TYPE } from './init'

import type { FetchBrowserArgs, FetchRankArgs, FetchTagArgs } from './types'

export default class Fetch extends Computed {
  /** 标签条目 */
  fetchTag = async (args: FetchTagArgs, refresh?: boolean) => {
    const { text = '', type = DEFAULT_TYPE, order, airtime = '', meta } = args || {}
    const q = text.replace(/ /g, '+')

    const STATE_KEY = 'tag'
    const ITEM_ARGS = [q, type, airtime, order, meta] as const
    const ITEM_KEY = ITEM_ARGS.filter(Boolean).join('|')
    const LIMIT = 24

    try {
      const { list, pagination } = this[STATE_KEY](...ITEM_ARGS)
      const page = refresh ? 1 : pagination.page + 1
      const html = await fetchHTML({
        url: HTML_TAG(q, type, order, page, airtime, meta)
      })

      const next = cheerioTags(html)
      this.setState({
        [STATE_KEY]: {
          [ITEM_KEY]: {
            list: refresh ? next.list : [...list, ...next.list],
            meta: next.meta,
            pagination: {
              page,
              pageTotal: next.list.length >= LIMIT ? next.pageTotal || 100 : page
            },
            _loaded: getTimestamp()
          }
        }
      })
      this.save(STATE_KEY)
    } catch (error) {
      this.error('fetchTag', error)
    }

    return this[STATE_KEY](...ITEM_ARGS)
  }

  /** 排行榜 */
  fetchRank = async (args: FetchRankArgs) => {
    const { type = DEFAULT_TYPE, filter, airtime, order = 'rank', page = 1 } = args || {}

    const STATE_KEY = 'rank'
    const ITEM_ARGS = [type, filter, order, airtime, page] as const
    const ITEM_KEY = ITEM_ARGS.filter(Boolean).join('|')

    try {
      const html = await fetchHTML({
        url: HTML_RANK_V2(args)
      })

      this.setState({
        [STATE_KEY]: {
          [ITEM_KEY]: {
            list: cheerioRank(html),
            pagination: {
              page: 1,
              pageTotal: 1
            },
            _loaded: getTimestamp()
          }
        }
      })
      this.save(STATE_KEY)
    } catch (error) {
      this.error('fetchRank', error)
    }

    return this[STATE_KEY](...ITEM_ARGS)
  }

  /** 排行榜 (不分页) */
  fetchRankWithoutPagination = async (args: FetchRankArgs, refresh?: boolean) => {
    const { type = DEFAULT_TYPE, filter, airtime, order = 'rank' } = args || {}

    const STATE_KEY = 'rankWithoutPagination'
    const ITEM_ARGS = [type, filter, order, airtime] as const
    const ITEM_KEY = ITEM_ARGS.filter(Boolean).join('|')
    const LIMIT = 24

    try {
      const { list, pagination } = this[STATE_KEY](...ITEM_ARGS)
      const page = refresh ? 1 : pagination.page + 1
      const html = await fetchHTML({
        url: HTML_RANK_V2({
          ...args,
          page
        })
      })

      const next = cheerioRank(html)
      this.setState({
        [STATE_KEY]: {
          [ITEM_KEY]: {
            list: refresh ? next : [...list, ...next],
            pagination: {
              page,
              pageTotal: next.length >= LIMIT ? 100 : page
            },
            _loaded: getTimestamp()
          }
        }
      })
      this.save(STATE_KEY)
    } catch (error) {
      this.error('fetchRankWithoutPagination', error)
    }

    return this[STATE_KEY](...ITEM_ARGS)
  }

  /** 索引 */
  fetchBrowser = async (args: FetchBrowserArgs, refresh?: boolean) => {
    const { type = DEFAULT_TYPE, airtime, sort } = args || {}

    const STATE_KEY = 'browser'
    const ITEM_ARGS = [type, airtime, sort] as const
    const ITEM_KEY = ITEM_ARGS.filter(Boolean).join('|')
    const LIMIT = 24

    try {
      const { list, pagination } = this[STATE_KEY](...ITEM_ARGS)
      const page = refresh ? 1 : pagination.page + 1
      const html = await fetchHTML({
        url: HTML_BROSWER(type, airtime, page, sort)
      })

      const next = cheerioRank(html)
      this.setState({
        [STATE_KEY]: {
          [ITEM_KEY]: {
            list: refresh ? next : [...list, ...next],
            pagination: {
              page,
              pageTotal: next.length >= LIMIT ? 100 : page
            },
            _loaded: getTimestamp()
          }
        }
      })
      this.save(STATE_KEY)
    } catch (error) {
      this.error('fetchBrowser', error)
    }

    return this[STATE_KEY](...ITEM_ARGS)
  }
}
