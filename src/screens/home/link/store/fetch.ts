/*
 * @Author: czy0729
 * @Date: 2025-12-10 22:49:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-20 12:00:00
 *
 * 请求关联图数据 (按 nodeId 分段下载与本地缓存) + 条目信息 / 收藏状态补齐
 */
import { collectionStore, subjectStore, systemStore } from '@stores'
import { getTimestamp, queue } from '@utils'
import { ensureCacheLimit } from '@utils/cache'
import { xhrCustom } from '@utils/fetch'
import { get, update } from '@utils/kv'
import { DEV, HOST_DOGE } from '@constants'
import Computed from './computed'
import { normalizeRelateMap, sortByDate } from './utils'

import type { RelateMap } from '../types'

/** 已下载的关系图缓存上限 (按 nodeId 分段, 不加界会随浏览条目增长) */
const CACHE_LIMIT = 30

const cacheMap = new Map<string, RelateMap>()

export default class Fetch extends Computed {
  private _hasFetchedOnce = false

  fetchNode = async () => {
    if (this._hasFetchedOnce && this.state.map?._loaded && this.state.map?.node?.length) return true
    this._hasFetchedOnce = true

    try {
      const { extra } = this.params
      const path = this.params.extra ? 'bangumi-link-extra' : 'bangumi-link'

      let nodeId = this.nodeId
      if (!nodeId) {
        const nodeRes = await xhrCustom({
          url: `${HOST_DOGE}/${path}/node/${Math.floor(Number(this.subjectId) / 1000)}/${
            this.subjectId
          }`
        })
        nodeId = Number(nodeRes._response)
      }

      if (nodeId) {
        const cacheId = `${nodeId}|${String(extra)}`
        let map = cacheMap.get(cacheId)
        if (!map) {
          const mapRes = await xhrCustom({
            url: `${HOST_DOGE}/${path}/map/${Math.floor(nodeId / 1000)}/${nodeId}.json`
          })

          map = normalizeRelateMap(JSON.parse(mapRes._response) as RelateMap)
          cacheMap.set(cacheId, map)
          ensureCacheLimit(cacheMap, CACHE_LIMIT)
        }

        this.setState({
          map: {
            ...map,
            node: sortByDate(map.node),
            _loaded: getTimestamp()
          }
        })
      }
    } catch (error) {
      this.error('fetchNode', error)
      this.setState({
        error: true
      })
    }
    this.save()

    return true
  }

  fetchSubjects = async () => {
    const { subjectLinkCover, subjectLinkRating } = systemStore.setting
    if (!subjectLinkCover && !subjectLinkRating) return true

    const { node } = this.state.map
    if (!node?.length) return true

    await subjectStore.initSubjectV2(node.map(item => item.id))
    await queue(
      node.map(item => {
        if (subjectStore.cover(item.id)) return () => true

        return () => {
          if (!this.state.focused) return true

          this.log('fetchSubjects', item.id)
          return subjectStore.fetchSubjectV2(item.id)
        }
      })
    )

    this.setState({
      map: {
        node: sortByDate(
          node.map(item => ({
            ...item,
            date: item.date || subjectStore.subjectV2(item.id)?.date || ''
          }))
        ),
        _loaded: getTimestamp()
      }
    })

    return true
  }

  fetchCollection = async () => {
    if (!systemStore.setting.subjectLinkCollected) return true

    const { map } = this.state
    if (!map.node?.length || !this.state.focused) return true

    return collectionStore.fetchCollectionStatusQueue(
      map.node.map(item => item.id),
      () => this.state.focused
    )
  }

  /** 获取趋势 */
  fetchTrend = async () => {
    if (!this.nodeId) return false

    try {
      const trend = await get<{ value?: number }>(this.trendId)
      if (typeof trend?.value === 'number') {
        this.setState({
          trend: Number(trend.value + 1) || 1
        })
      } else {
        this.setState({
          trend: 1
        })
      }

      if (DEV) return

      update(
        this.trendId,
        {
          value: Number(this.state.trend || 1)
        },
        true,
        true
      )
    } catch {}

    return false
  }
}
