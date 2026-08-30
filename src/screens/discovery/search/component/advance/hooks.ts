/*
 * @Author: czy0729
 * @Date: 2024-01-09 04:22:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-30 21:43:27
 */
import { useEffect, useRef, useState } from 'react'
import { SEARCH_SUBSTRINGS } from '@stores/calendar/onair'
import { asc, desc, ensureCacheLimit, t2s } from '@utils'
import { logger } from '@utils/dev'
import { decode, get } from '@utils/protobuf'
import { loadJSON } from '@assets/json'
import { COMPONENT } from './ds'

import type { JSONMono } from '@assets/json/types'
import type { SearchCat, SubjectId } from '@types'
import type { RawSubStrings, SubjectTitle, SubStrings } from './types'

const MEMO = new Map<string, SubjectTitle[]>()
const MEMO_MONO = new Map<string, JSONMono>()

const MAX_LEN = 10
const CHUNK_SIZE = 1000

const rawStores: Partial<Record<SearchCat, RawSubStrings>> = {
  subject_1: {}, // 书籍
  subject_4: {}, // 游戏
  subject_6: {}, // 三次元
  subject_2: {} // 动画及其他通用分类
}

const indexedStores: Partial<Record<SearchCat, SubStrings>> = {
  subject_1: {},
  subject_4: {},
  subject_6: {},
  subject_2: {}
}

const indexingStatus: Partial<Record<SearchCat, 'none' | 'indexing' | 'done'>> = {
  subject_1: 'none',
  subject_4: 'none',
  subject_6: 'none',
  subject_2: 'none'
}

/** 各分类原始数据的 key 缓存, 避免降级匹配时每次按键全量 Object.keys */
const rawKeys: Partial<Record<SearchCat, string[]>> = {}

type IndexMeta = {
  sortedKeys: SubjectTitle[]
  idMap: Record<SubjectTitle, SubjectId>
}

/** 索引构建完成后一次性预计算的排序 key 与标题→id 映射 */
const indexMeta: Partial<Record<SearchCat, IndexMeta>> = {}

let buildGeneration = 0
let mono: (JSONMono[number] & { norm: string })[] = []

/**
 * 条目联想搜索 Hook
 * @param cat 搜索分类
 * @param value 搜索关键字
 * @param enabled 是否启用匹配（联想区不可见时跳过搜索匹配，索引构建不受影响）
 */
export function useResult(cat: SearchCat, value: string, enabled: boolean) {
  const [result, setResult] = useState<SubjectTitle[]>([])
  const [isReady, setIsReady] = useState(false)
  const substrings = useRef<Record<SubjectTitle, SubjectId>>({})

  // 初始化与分类切换：负责静态资源加载与异步索引构建
  // 注意: 只依赖 cat, 不依赖 enabled。索引构建是模块级单例的一次性后台工作,
  // 若随联想区显示状态 (showAdvance) 反复启停, 会误杀进行中的分片构建导致永久降级
  useEffect(() => {
    if (cat === 'mono_all') return

    let active = true
    const gen = ++buildGeneration

    // 切换分类时立即重置映射表，防止旧分类的数据污染新分类
    substrings.current = {}

    async function init() {
      await ensureRawLoaded(cat)
      if (!active) return

      // 若上次构建被新代际误杀 (状态卡 indexing 但索引未落地), 重置后重建, 避免永久降级
      if (indexingStatus[cat] === 'indexing' && !indexMeta[cat]) {
        logger.warn(COMPONENT, 'useResult', cat, '索引卡住，重置并重建')
        indexingStatus[cat] = 'none'
      }

      if (indexingStatus[cat] === 'none') {
        indexingStatus[cat] = 'indexing'

        // 接收构建结果，若中途被新代际覆盖则返回 false
        const success = await buildIndexAsync(cat, gen)

        // 严格拦截：只有当前副作用未被废弃且构建成功，才修改状态
        if (active && success) {
          indexingStatus[cat] = 'done'
          setIsReady(true)
        }
      }
    }

    // 同步就绪判断: 索引落地即就绪 (indexingStatus 与 indexMeta 总是同步写入)
    setIsReady(!!indexMeta[cat])
    init()

    return () => {
      active = false
    }
  }, [cat])

  // 执行搜索逻辑：根据索引就绪状态，选择高效率匹配或临时降级匹配
  useEffect(() => {
    if (!enabled) return

    if (cat === 'mono_all') {
      setResult([])
      return
    }

    if (value.length < 2) {
      setResult([])
      return
    }

    const q = normalizeSearch(value)
    if (!q) {
      setResult([])
      return
    }

    const memoKey = `${cat}:${q}`
    if (MEMO.has(memoKey)) {
      setResult(MEMO.get(memoKey))
      return
    }

    const indexed = indexedStores[cat] || {}
    const meta = indexMeta[cat]
    const hasIndex = !!meta

    if (hasIndex) {
      // 索引就绪：遍历预排序 key, 命中 MAX_LEN 即停, 避免每次按键全量排序
      const keys = meta.sortedKeys
      const list: SubjectTitle[] = []

      for (const k of keys) {
        if (list.length >= MAX_LEN) break
        if (indexed[k].norm.includes(q)) list.push(k)
      }
      list.sort((a, b) => desc(indexed[a].id, indexed[b].id))

      // 直接引用预构建的标题→id 映射, 避免每次按键全量重建
      substrings.current = meta.idMap

      ensureCacheLimit(MEMO, 50)
      MEMO.set(memoKey, list)
      setResult(list)
    } else {
      // 降级模式：索引未就绪时执行低成本的基础文本包含检查
      const raw = rawStores[cat] || {}
      const keys = rawKeys[cat] || Object.keys(raw)
      const list: SubjectTitle[] = []

      for (const k of keys) {
        if (list.length >= MAX_LEN) break
        if (k.toLocaleUpperCase().includes(q)) list.push(k)
      }

      // 降级时直接引用当前分类的原始映射表 (title→id), 防止点击时 ID 丢失
      substrings.current = raw

      setResult(list)
    }
    // isReady 的变更标志着后台高效索引已就绪，需触发搜索逻辑切换至高性能路径
  }, [cat, value, isReady, enabled])

  return {
    result,
    substrings
  }
}

/**
 * 人物/单行本联想搜索 Hook
 * @param value 搜索关键字
 * @param enabled 是否启用匹配（非人物分类时跳过匹配）
 */
export function useMonoResult(value: string, enabled: boolean) {
  const [result, setResult] = useState<JSONMono>([])

  useEffect(() => {
    if (!enabled) return

    if (value.length < 1) {
      setResult([])
      return
    }

    const q = normalizeSearch(value)
    if (!q) {
      setResult([])
      return
    }

    if (MEMO_MONO.has(q)) {
      setResult(MEMO_MONO.get(q))
      return
    }

    ;(async () => {
      try {
        if (!mono.length) {
          const raw = await decode('mono')
          mono = raw.map(item => ({
            ...item,
            norm: normalizeSearch(item.n)
          }))
        }

        const list: JSONMono = []

        for (const item of mono) {
          if (list.length >= MAX_LEN) break
          if (item.norm.includes(q)) list.push(item)
        }

        ensureCacheLimit(MEMO_MONO, 50)
        MEMO_MONO.set(q, list)
        setResult(list)
      } catch {}
    })()
  }, [value, enabled])

  return result
}

/**
 * 搜索关键词规范化（繁转简、统一大写、移除空格）
 */
function normalizeSearch(value: string) {
  return t2s(value).toLocaleUpperCase().replace(/\s+/g, '')
}

/**
 * 分片构建分类词条的搜索索引
 * @param cat 目标分类
 * @param gen 当前构建代际标识
 * @returns Promise<boolean> 表示当前代际是否顺利构建完成
 */
function buildIndexAsync(cat: SearchCat, gen: number): Promise<boolean> {
  const raw = rawStores[cat] || {}
  const entries = Object.entries(raw)
  if (!entries.length) {
    logger.warn(COMPONENT, 'buildIndexAsync', cat, '跳过，无原始数据')
    return Promise.resolve(false)
  }

  logger.log(COMPONENT, 'buildIndexAsync', cat, `开始构建，共 ${entries.length} 条`)

  const index: SubStrings = {}
  let offset = 0
  let lastProgress = 0
  const startTime = Date.now()

  return new Promise(resolve => {
    function processChunk() {
      // 防重入：若代际已落后（用户切换了分类），回传 false 废弃当前链路
      if (gen !== buildGeneration) {
        logger.warn(COMPONENT, 'buildIndexAsync', cat, '被新代际覆盖，已终止')
        resolve(false)
        return
      }

      const end = Math.min(offset + CHUNK_SIZE, entries.length)
      for (let i = offset; i < end; i++) {
        const [title, id] = entries[i]
        index[title] = { id, norm: normalizeSearch(title) }
      }
      offset = end

      if (offset < entries.length) {
        setTimeout(processChunk, 16)

        const progress = Math.floor((offset / entries.length) * 100)
        if (progress >= lastProgress + 25) {
          lastProgress = progress
          logger.log(COMPONENT, 'buildIndexAsync', cat, `${progress}%`)
        }
      } else {
        if (gen === buildGeneration) {
          indexedStores[cat] = index

          // 一次性预计算: 按键长升序的 key 与标题→id 映射, 供搜索热路径直接使用
          const sortedKeys = Object.keys(index)
          sortedKeys.sort((a, b) => asc(a.length, b.length))
          const idMap: Record<SubjectTitle, SubjectId> = {}
          for (const title of sortedKeys) idMap[title] = index[title].id
          indexMeta[cat] = { sortedKeys, idMap }

          logger.success(
            COMPONENT,
            'buildIndexAsync',
            cat,
            `构建完成，耗时 ${Date.now() - startTime}ms`
          )
          resolve(true)
        } else {
          logger.warn(COMPONENT, 'buildIndexAsync', cat, '被新代际覆盖，已终止')
          resolve(false)
        }
      }
    }
    processChunk()
  })
}

/**
 * 确保指定分类的静态原始数据已加载到内存中
 */
async function ensureRawLoaded(cat: SearchCat) {
  const key: SearchCat =
    cat === 'subject_1' || cat === 'subject_4' || cat === 'subject_6' ? cat : 'subject_2'

  // 按实际落库分类判断, 防止 subject_all/subject_3/user/catalog 等共用 subject_2 的分类重复加载
  if (Object.keys(rawStores[key] || {}).length) return

  if (key === 'subject_1') {
    rawStores.subject_1 = await loadJSON('substrings/book')
    rawKeys.subject_1 = Object.keys(rawStores.subject_1)
    logger.success(COMPONENT, 'ensureRawLoaded', cat, key, `${rawKeys.subject_1.length} 条`)
    return
  }

  if (key === 'subject_4') {
    rawStores.subject_4 = await loadJSON('substrings/game')
    rawKeys.subject_4 = Object.keys(rawStores.subject_4)
    logger.success(COMPONENT, 'ensureRawLoaded', cat, key, `${rawKeys.subject_4.length} 条`)
    return
  }

  if (key === 'subject_6') {
    rawStores.subject_6 = await loadJSON('substrings/real')
    rawKeys.subject_6 = Object.keys(rawStores.subject_6)
    logger.success(COMPONENT, 'ensureRawLoaded', cat, key, `${rawKeys.subject_6.length} 条`)
    return
  }

  await decode('bangumi-data')

  const map: Record<string, SubjectId> = {}
  get('bangumi-data').forEach(item => {
    map[item.c || item.j] = item.id
  })

  Object.entries(SEARCH_SUBSTRINGS).forEach(([id, item]) => {
    if (item.title) map[item.title] = Number(id)
  })

  rawStores.subject_2 = {
    ...map,
    ...(await loadJSON('substrings/anime')),
    ...(await loadJSON('substrings/alias'))
  }
  rawKeys.subject_2 = Object.keys(rawStores.subject_2)
  logger.success(COMPONENT, 'ensureRawLoaded', cat, key, `${rawKeys.subject_2.length} 条`)
}
