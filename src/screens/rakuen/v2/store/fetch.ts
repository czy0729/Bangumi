/*
 * @Author: czy0729
 * @Date: 2024-05-16 19:56:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-10 04:05:45
 *
 * 超展开页请求
 */
import { rakuenStore, userStore } from '@stores'
import { getTimestamp } from '@utils'
import { searchEncoreReplies, searchGroupTopics } from '@utils/kv'
import Computed from './computed'
import {
  getDataSourceKey,
  getWataamePagination,
  hasMoreWataame,
  isValidReplySource,
  mapGroupTopics,
  mapReplies,
  mergeWataame
} from './utils'
import { WATAAME_LIMIT } from './ds'

import type { RakuenItem } from '@stores/rakuen/types'
import type { RakuenType, RakuenTypeGroup, RakuenTypeMono } from '@types'
import type { Wataame } from './ds'

type WataameResult = {
  list: RakuenItem[]
  total: number
  count: number
}

export default class Fetch extends Computed {
  private wataameRequest: Promise<Wataame> | null = null
  private wataameKey = ''
  private wataameSeq = 0
  private wataameMoreRequest: Promise<Wataame> | null = null
  private wataameMoreKey = ''

  /** 拉取当前板块的列表 */
  fetchRakuen = async () => {
    const type = this.type(this.state.page)
    const key = getDataSourceKey(type)
    if (key) return this.fetchWataame(key)

    return rakuenStore.fetchRakuen(
      this.state.scope,
      type as RakuenType | RakuenTypeMono | RakuenTypeGroup
    )
  }

  /** 拉取 wataame 数据源 */
  fetchWataame = (key: string) => {
    if (this.wataameRequest && this.wataameKey === key) return this.wataameRequest

    this.wataameKey = key
    const seq = ++this.wataameSeq
    this.wataameRequest = this.requestWataame(key, seq, 0, true).finally(() => {
      if (seq === this.wataameSeq) this.wataameRequest = null
    })
    return this.wataameRequest
  }

  /** 加载更多 */
  fetchWataameMore = (key: string) => {
    if (this.wataameMoreRequest && this.wataameMoreKey === key) return this.wataameMoreRequest

    const { wataame } = this.state
    if (wataame._source !== key || wataame._error || !hasMoreWataame(wataame)) {
      return Promise.resolve(wataame)
    }

    const seq = this.wataameSeq
    const offset = wataame._offset || 0
    const request = this.requestWataame(key, seq, offset, false).finally(() => {
      if (this.wataameMoreRequest === request) this.wataameMoreRequest = null
    })
    this.wataameMoreRequest = request
    this.wataameMoreKey = key
    return request
  }

  /** 按数据源调用对应接口 */
  private searchWataame = async (key: string, offset: number): Promise<WataameResult | null> => {
    const options = { limit: WATAAME_LIMIT, offset }

    try {
      if (key === 'hot') {
        // v1/search 无时间过滤, 旧端点支持 after=YYYY-MM-DD + sort=replies
        const date = new Date(Date.now() - 86400000)
        const after = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
          2,
          '0'
        )}-${String(date.getDate()).padStart(2, '0')}`
        const result = await searchGroupTopics('', {
          target: 'all',
          sort: 'replies',
          after,
          ...options
        })
        if (!result) return null

        const data = result.data || []
        return {
          list: mapGroupTopics(data),
          // total 已按 after 过滤, 直接用服务端总数分页
          total: result.pagination?.total || 0,
          count: data.length
        }
      }

      if (isValidReplySource(key)) {
        const userId = userStore.myId
        if (!userId) return null

        const result = await searchEncoreReplies({
          q: `user:${userId} exclude:nsfw`,
          source: key,
          sort: 'newest',
          ...options
        })
        if (!result) return null

        const data = result.data || []
        return {
          list: mapReplies(data),
          total: result.pagination?.total || 0,
          count: data.length
        }
      }
    } catch {
      return null
    }

    return null
  }

  private requestWataame = async (key: string, seq: number, offset: number, first: boolean) => {
    const result = await this.searchWataame(key, offset)
    if (seq !== this.wataameSeq) return this.state.wataame

    const previous = this.state.wataame
    const userId = userStore.myId || ''
    if (!result) {
      if (first) {
        // 失败时保留同来源的旧数据, 避免清空列表
        const kept = previous._source === key
        this.setState({
          wataame: {
            list: kept ? previous.list : [],
            pagination: kept ? previous.pagination : { page: 1, pageTotal: 1 },
            _loaded: getTimestamp(),
            _userId: userId,
            _source: key,
            _offset: kept ? previous._offset : 0,
            _total: kept ? previous._total : 0,
            _error: true,
            _moreError: false
          }
        })
      } else {
        // 加载更多失败保留已加载的页, 只标记供 footer 提示重试
        this.setState({
          wataame: {
            ...previous,
            _moreError: true
          }
        })
      }
      return this.state.wataame
    }

    // 空页说明估算的总数偏大, 以已拉取条数收口
    const total = result.count ? result.total : offset
    const nextOffset = offset + result.count
    this.setState({
      wataame: {
        list: first ? result.list : mergeWataame(previous.list, result.list),
        pagination: getWataamePagination(total, nextOffset),
        _loaded: getTimestamp(),
        _userId: userId,
        _source: key,
        _offset: nextOffset,
        _total: total,
        _error: false,
        _moreError: false
      }
    })
    this.save()
    return this.state.wataame
  }

  /** 下拉刷新 */
  onHeaderRefresh = () => {
    return this.fetchRakuen()
  }
}
