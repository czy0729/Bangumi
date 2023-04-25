/*
 * @Author: czy0729
 * @Date: 2023-04-25 16:06:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-25 16:09:19
 */
import { getTimestamp } from '@utils'
import { fetchHTML } from '@utils/fetch'
import { HTML_BROSWER, HTML_RANK, HTML_TAG } from '@constants'
import {
  BrowserSort,
  RankAnimeFilter,
  RankBookFilter,
  RankGameFilter,
  RankRealFilter,
  SubjectType,
  TagOrder
} from '@types'
import Computed from './computed'
import { analysiRank, analysisTags } from './common'
import { DEFAULT_TYPE } from './init'
import { Rank } from './types'

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
    },
    refresh?: boolean
  ) => {
    const { text = '', type = DEFAULT_TYPE, order, airtime = '' } = args || {}
    const _text = text.replace(/ /g, '+')
    const { list, pagination } = this.tag(_text, type, airtime)
    const page = refresh ? 1 : pagination.page + 1

    // -------------------- 请求HTML --------------------
    const raw = await fetchHTML({
      url: HTML_TAG(_text, type, order, page, airtime)
    })
    const { pageTotal, tag } = analysisTags(raw, page, pagination)

    const key = 'tag'
    const stateKey = `${_text}|${type}|${airtime}`
    const data = {
      list: refresh ? tag : [...list, ...tag],
      pagination: {
        page,
        pageTotal: parseInt(pageTotal)
      },
      _loaded: getTimestamp()
    }
    this.setState({
      [key]: {
        [stateKey]: data
      }
    })
    this.save(key)

    return data
  }

  /** 排行榜 (与标签相似, 所以共用逻辑) */
  fetchRank = async (args: {
    /** 类型 */
    type?: SubjectType

    /** 筛选类型 */
    filter?: RankAnimeFilter | RankBookFilter | RankGameFilter | RankRealFilter

    /** 2024-1960 */
    airtime?: string
    page?: number
  }) => {
    const { type = DEFAULT_TYPE, filter = '', airtime = '', page = 1 } = args || {}
    const key = 'rank'
    const raw = await fetchHTML({
      url: HTML_RANK(type, 'rank', page, filter, airtime)
    })
    const list = analysiRank(raw)

    const stateKey = `${type}|${page}|${filter}|${airtime}`
    const data: Rank = {
      list,
      pagination: {
        page: 1,
        pageTotal: 1
      },
      _loaded: getTimestamp()
    }
    this.setState({
      [key]: {
        [stateKey]: data
      }
    })
    this.save(key)

    return data
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
    const { list, pagination } = this.browser(type, airtime, sort)
    const page = refresh ? 1 : pagination.page + 1

    // -------------------- 请求HTML --------------------
    const raw = await fetchHTML({
      url: HTML_BROSWER(type, airtime, page, sort)
    })
    const { pageTotal, tag } = analysisTags(raw, page, pagination)

    const key = 'browser'
    const stateKey = `${type}|${airtime}|${sort}`
    const data = {
      list: refresh ? tag : [...list, ...tag],
      pagination: {
        page,
        pageTotal: parseInt(pageTotal)
      },
      _loaded: getTimestamp()
    }
    this.setState({
      [key]: {
        [stateKey]: data
      }
    })
    this.save(key)

    return data
  }
}
