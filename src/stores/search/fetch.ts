/*
 * @Author: czy0729
 * @Date: 2023-04-25 15:29:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-29 00:00:00
 */
import { runInAction } from 'mobx'
import { getTimestamp, removeHTMLTag } from '@utils'
import { ensureRecordLimit } from '@utils/cache'
import { fetchHTML } from '@utils/fetch'
import { searchEncoreGroupTopics } from '@utils/kv'
import { HTML_SEARCH } from '@constants'
import { cheerioSearch, cheerioSearchMono } from './common'
import Computed from './computed'
import { DEFAULT_CAT } from './init'

import type { SearchSort } from '@utils/kv'
import type { SearchCat } from '@types'
import type { RakuenSearch, RakuenSearchItem } from './types'

/** 帖子搜索每页条数 */
const RAKUEN_SEARCH_LIMIT = 20

/** 搜索缓存保留的关键字数量 */
const RAKUEN_SEARCH_CACHE_MAX = 20

/** 去掉服务端命中词标记 U+E000 / U+E001 */
function stripHighlight(text: string) {
  return String(text || '').replace(/[\uE000\uE001]/g, '')
}

/** 时间戳 (秒, 兼容毫秒) 转 YYYY-MM-DD */
function formatDate(ts: number) {
  if (!ts) return ''

  const date = new Date(ts > 1e11 ? ts : ts * 1000)
  return [date.getFullYear(), date.getMonth() + 1, date.getDate()]
    .map(n => String(n).padStart(2, '0'))
    .join('-')
}

export default class Fetch extends Computed {
  /** 搜索 */
  fetchSearch = async (
    text: string = '',
    cat: SearchCat = DEFAULT_CAT,
    legacy: '' | '1' = '',
    refresh?: boolean
  ) => {
    const textValue = text.replace(/ /g, '+')

    // 用户、人物搜索不支持 legacy, 强制关闭精准匹配
    const legacyValue = cat === 'mono_all' || cat === 'user' ? '' : legacy

    const STATE_KEY = 'search'
    const ITEM_ARGS = [textValue, cat] as const
    const ITEM_KEY = ITEM_ARGS.join('|')

    try {
      const { list, pagination } = this[STATE_KEY](...ITEM_ARGS)
      const page = refresh ? 1 : pagination.page + 1
      const html = await fetchHTML({
        url: HTML_SEARCH(encodeURIComponent(textValue), cat, page, legacyValue),

        // 搜索不加这个会无条件返回错误
        cookie: `; chii_searchDateLine=${legacyValue === '1' ? 0 : getTimestamp() - 100};`
      })

      // 搜索频率限制, 不走 catch 以免误报, 由调用方提示稍候再试
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

  /** 帖子搜索 (v1/search/group-topics) */
  fetchRakuenSearch = async (q: string, page: number = 1, sort: SearchSort = 'match') => {
    const result = await searchEncoreGroupTopics({
      q,
      sort,
      limit: RAKUEN_SEARCH_LIMIT,
      offset: (page - 1) * RAKUEN_SEARCH_LIMIT
    })

    // 请求失败不写缓存, 与 "无结果" 区分
    if (!result) return null

    const list: RakuenSearchItem[] = result.data.map(item => ({
      id: item.id,
      title: stripHighlight(item.title),
      message: stripHighlight(removeHTMLTag(item.content || '')),
      userName: item.creatorName || '',
      // updatedAt 是最后回复时间, 没有时退回创建时间
      time: formatDate(item.updatedAt || item.createdAt),
      group: item.parentName || '',
      replies: item.replyCount
    }))

    const key = `${q}|${sort}`
    const prev = (this.state.rakuenSearch as Record<string, RakuenSearch | undefined>)[key]
    const total = result.pagination?.total || 0

    this.setState({
      rakuenSearch: {
        [key]: {
          list: page === 1 ? list : [...(prev?.list || []), ...list],
          pagination: {
            page,
            pageTotal: Math.max(1, Math.ceil(total / RAKUEN_SEARCH_LIMIT))
          },
          _loaded: getTimestamp()
        }
      }
    })

    // 每个关键字都常驻一份结果, 按 FIFO 限制数量
    runInAction(() => {
      ensureRecordLimit(this.state.rakuenSearch, RAKUEN_SEARCH_CACHE_MAX)
    })

    return list
  }
}
