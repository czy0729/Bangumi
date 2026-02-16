/*
 * @Author: czy0729
 * @Date: 2023-04-25 15:29:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-12 05:21:53
 */
import { getTimestamp } from '@utils'
import { fetchHTML } from '@utils/fetch'
import { search } from '@utils/kv'
import { HTML_SEARCH } from '@constants'
import { SearchCat } from '@types'
import { cheerioSearch, cheerioSearchMono } from './common'
import Computed from './computed'
import { DEFAULT_CAT } from './init'
import { SearchItem } from './types'

export default class Fetch extends Computed {
  /** 搜索 */
  fetchSearch = async (
    args: {
      text: string
      cat?: SearchCat

      /** legacy = 1 为精准匹配 */
      legacy?: any
    },
    refresh?: boolean
  ) => {
    const { text = '', cat = DEFAULT_CAT } = args || {}
    let { legacy = '' } = args || {}
    if (cat === 'mono_all' || cat === 'user') legacy = ''

    const _text = text.replace(/ /g, '+')
    const { list, pagination } = this.search(_text, cat)
    const page = refresh ? 1 : pagination.page + 1

    const html = await fetchHTML({
      url: HTML_SEARCH(encodeURIComponent(_text), cat, page, legacy),

      // 搜索不加这个会无条件返回错误
      cookie: `; chii_searchDateLine=${legacy == 1 ? 0 : getTimestamp()};`
    })
    if (html.includes('秒内只能进行一次搜索')) return Promise.reject()

    let search: SearchItem[] = []
    let pageTotal: number = 1
    if (cat.includes('subject')) {
      // 条目
      const result = cheerioSearch(html)
      pageTotal = result.pageTotal
      search = result.list
    } else if (cat.includes('mono')) {
      // 人物
      const result = cheerioSearchMono(html)
      pageTotal = result.pageTotal
      search = result.list
    }

    const key = 'search'
    const stateKey = `${_text}|${cat}`
    const data = {
      list: refresh ? search : [...list, ...search],
      pagination: {
        page,
        pageTotal: Number(pageTotal)
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
