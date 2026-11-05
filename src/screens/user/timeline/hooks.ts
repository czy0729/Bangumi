/*
 * @Author: czy0729
 * @Date: 2024-11-18 07:37:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-05 12:00:00
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { collectionStore, useInitStore } from '@stores'
import { usePageLifecycle } from '@utils/hooks'
import { heatmap } from '@utils/kv'
import store from './store'
import { mergeMosaicTile } from './utils'

import type { MosaicTile } from '@stores/collection/types'
import type { HeatmapDataType, HeatmapType } from '@utils/kv/type'
import type { NavigationProps } from '@types'
import type { Ctx } from './types'

/** 各用户的类型数据缓存, 换人后不会命中上一个用户的数据 */
type TileCache = Record<string, Partial<Record<HeatmapDataType, MosaicTile>>>

/** 用户的时间线页面逻辑 */
export function useUserTimelinePage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { id, $ } = context

  usePageLifecycle(
    {
      onEnterComplete() {
        $.init()
      }
    },
    id
  )

  return context
}

/** 空的瓷砖数据, 保持引用稳定 */
const EMPTY_MOSAIC_TILE: MosaicTile = {}

/** 空的类型数据集合, 保持引用稳定 */
const EMPTY_TILES: Partial<Record<HeatmapDataType, MosaicTile>> = {}

/** 缓存保留的用户数上限 */
const CACHE_USER_LIMIT = 5

/**
 * 热力图数据类型切换, 已拉取的类型会被缓存
 *  - 类型是全局唯一的偏好, 本地化在 collectionStore
 *  - 时间胶囊复用 store 首次进入时拉取的数据, 全部 = 时间胶囊 + 社区, 只额外拉社区
 *
 * @param userId 用户 id 或用户名
 * @param timelineTiles 时间胶囊数据, 由 store 首次进入时拉取
 */
export function useMosaicTileType(userId: string, timelineTiles: MosaicTile) {
  /** 全局唯一的数据类型, 已本地化, 选过一次对所有用户生效 */
  const type = collectionStore.mosaicTileType

  /** 按用户缓存除「时间胶囊」外的类型数据 */
  const [cache, setCache] = useState<TileCache>({})

  /** 当前用户已缓存的类型数据 */
  const tiles = cache[userId] || EMPTY_TILES

  /** 缓存镜像: 供 load 读取, 避免把缓存放进依赖导致请求反复触发 */
  const cacheRef = useRef(cache)

  /** 最近访问过的用户, 用于限制缓存数量 */
  const recentUsersRef = useRef<string[]>([])

  /** 是否正在拉取当前类型的数据 */
  const [loading, setLoading] = useState(false)

  /** 请求序号, 快速切换时丢弃先返回的旧响应 */
  const requestIdRef = useRef(0)

  /** 写入缓存, 只保留最近访问的若干用户 */
  const writeCache = useCallback(
    (cacheUserId: string, requestType: HeatmapDataType, data: MosaicTile) => {
      const recentUsers = [
        cacheUserId,
        ...recentUsersRef.current.filter(item => item !== cacheUserId)
      ].slice(0, CACHE_USER_LIMIT)
      recentUsersRef.current = recentUsers

      const prev = cacheRef.current
      const next: TileCache = {}
      recentUsers.forEach(key => {
        next[key] = prev[key] || {}
      })
      next[cacheUserId] = { ...next[cacheUserId], [requestType]: data }

      /** 镜像同步更新, 同一 tick 内连续 load 也能读到最新缓存 */
      cacheRef.current = next
      setCache(next)
    },
    []
  )

  /** 按类型拉取并缓存 */
  const load = useCallback(
    async (requestUserId: string, nextType: HeatmapType) => {
      const requestId = (requestIdRef.current += 1)

      /** 全部 = 时间胶囊 + 社区, 时间胶囊已有数据, 只需补拉社区 */
      const requestType: HeatmapDataType = nextType === 'all' ? 'community' : nextType
      if (requestType === 'timeline' || cacheRef.current[requestUserId]?.[requestType]) {
        setLoading(false)
        return
      }

      setLoading(true)
      const result = await heatmap(requestUserId, requestType)

      if (result) {
        /** 即使期间切换了类型, 这份数据仍然有效, 一并缓存避免重复请求 */
        const data: MosaicTile = {}
        result.forEach(item => {
          data[item.date] = item.count
        })
        writeCache(requestUserId, requestType, data)
      }

      /** 只有最后一次请求才负责结束加载态 */
      if (requestId === requestIdRef.current) setLoading(false)
    },
    [writeCache]
  )

  const handleTypeChange = useCallback(
    (nextType: HeatmapType) => {
      if (nextType === type) return

      collectionStore.setMosaicTileType(nextType)
    },
    [type]
  )

  /** 首次进入、切换类型或换人时拉取对应数据 */
  useEffect(() => {
    load(userId, type)
  }, [load, type, userId])

  const mosaicTile = useMemo(() => {
    if (type === 'timeline') return timelineTiles
    if (type === 'all') return mergeMosaicTile(timelineTiles, tiles.community || EMPTY_MOSAIC_TILE)

    return tiles[type] || EMPTY_MOSAIC_TILE
  }, [tiles, timelineTiles, type])

  return {
    /** 当前数据类型 */
    type,

    /** 当前类型对应的瓷砖数据 */
    mosaicTile,

    /** 是否正在拉取数据 */
    loading,

    /** 切换数据类型 */
    handleTypeChange
  }
}
