/*
 * @Author: czy0729
 * @Date: 2023-04-25 16:06:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-25 16:09:19
 */
import { getTimestamp } from '@utils'
import { fetchHTML } from '@utils/fetch'
import { HTML_BROSWER, HTML_RANK_V2, HTML_TAG } from '@constants'
import { BrowserSort, SubjectType, TagOrder } from '@types'
import { cheerioRank, cheerioTags } from './common'
import Computed from './computed'
import { DEFAULT_TYPE } from './init'
import { Tag } from './types'

export default class Fetch extends Computed {
  /** 标签条目 */
  fetchTag = async (
    args: {
      /** 关键字 */
      text: string

      /** 类型 */
      type?: SubjectType

      /** 排序 */
      order?: TagOrder

      /** 时间 */
      airtime?: string

      /** 公共标签 */
      meta?: boolean
    },
    refresh?: boolean
  ) => {
    const { text = '', type = DEFAULT_TYPE, order, airtime = '', meta } = args || {}
    const q = text.replace(/ /g, '+')
    const { list, pagination } = this.tag(q, type, airtime, order, meta)
    const page = refresh ? 1 : pagination.page + 1
    const html = await fetchHTML({
      url: HTML_TAG(q, type, order, page, airtime, meta)
    })

    const tags = cheerioTags(html)
    const data: Tag = {
      list: refresh ? tags.list : [...list, ...tags.list],
      meta: tags.meta,
      pagination: {
        page,
        /**
         * 在拥有更多筛选条件下, 页数不准确, 一页有 24 项,
         * 需要后续根据一页是否有这个数量数据去修正总页数
         */
        pageTotal: tags.list.length >= 24 ? tags.pageTotal || 100 : page
      },
      _loaded: getTimestamp()
    }

    const key = 'tag'
    let stateKey = `${q}|${type}|${airtime}|${order}`
    if (meta) stateKey += `|${meta}`

    this.setState({
      [key]: {
        [stateKey]: data
      }
    })
    this.save(key)

    return data
  }

  /** 排行榜 (与标签相似, 所以共用逻辑) */
  fetchRank = async (args: Parameters<typeof HTML_RANK_V2>[0]) => {
    const { type = DEFAULT_TYPE, filter, airtime, order = 'rank', page = 1 } = args || {}
    const STATE_KEY = 'rank'
    const ITEM_KEY = [type, filter, order, airtime, page].filter(item => !!item).join('|')

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

    return this[STATE_KEY](type, filter, order, airtime, page)
  }

  /**
   * 请求索引
   * @param {*} args
   * @param {*} refresh
   */
  fetchBrowser = async (
    args: {
      type?: SubjectType
      airtime?: string
      sort?: BrowserSort
    },
    refresh?: boolean
  ) => {
    const { type = DEFAULT_TYPE, airtime, sort } = args || {}
    const STATE_KEY = 'browser'
    const ITEM_KEY = [type, airtime, sort].filter(item => !!item).join('|')
    const LIMIT = 24

    try {
      const { list, pagination } = this[STATE_KEY](type, airtime, sort)
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

    return this[STATE_KEY](type, airtime, sort)
  }
}
