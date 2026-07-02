/*
 * @Author: czy0729
 * @Date: 2024-01-09 04:22:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-02 05:00:00
 */
import { useEffect, useRef, useState } from 'react'
import { SEARCH_SUBSTRINGS } from '@stores/calendar/onair'
import { asc, desc, ensureCacheLimit, t2s } from '@utils'
import { decode, get } from '@utils/protobuf'
import { loadJSON } from '@assets/json'

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

let buildGeneration = 0
let mono: (JSONMono[number] & { norm: string })[] = []

/**
 * 条目联想搜索 Hook
 * @param cat 搜索分类
 * @param value 搜索关键字
 */
export function useResult(cat: SearchCat, value: string) {
  const [result, setResult] = useState<SubjectTitle[]>([])
  const [isReady, setIsReady] = useState(false)
  const substrings = useRef<Record<SubjectTitle, SubjectId>>({})

  // 初始化与分类切换：负责静态资源加载与异步索引构建
  useEffect(() => {
    let active = true
    const gen = ++buildGeneration

    // 切换分类时立即重置映射表，防止旧分类的数据污染新分类
    substrings.current = {}

    async function init() {
      await ensureRawLoaded(cat)
      if (!active) return

      const currentStatus = indexingStatus[cat] || 'none'

      if (currentStatus === 'done') {
        setIsReady(true)
        return
      }

      if (currentStatus === 'none') {
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

    setIsReady((indexingStatus[cat] || 'none') === 'done')
    init()

    return () => {
      active = false
    }
  }, [cat])

  // 执行搜索逻辑：根据索引就绪状态，选择高效率匹配或临时降级匹配
  useEffect(() => {
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
    const hasIndex = Object.keys(indexed).length > 0

    if (hasIndex) {
      // 索引就绪：执行全量规范化匹配与精准排序
      const keys = Object.keys(indexed).sort((a, b) => asc(a.length, b.length))
      const list: SubjectTitle[] = []

      for (const k of keys) {
        if (list.length >= MAX_LEN) break
        if (indexed[k].norm.includes(q)) list.push(k)
      }
      list.sort((a, b) => desc(indexed[a].id, indexed[b].id))

      // 保持最新的映射关系，确保 UI 点击时能查到正确的 ID
      substrings.current = Object.fromEntries(Object.entries(indexed).map(([k, v]) => [k, v.id]))

      ensureCacheLimit(MEMO, 50)
      MEMO.set(memoKey, list)
      setResult(list)
    } else {
      // 降级模式：索引未就绪时执行低成本的基础文本包含检查
      const raw = rawStores[cat] || {}
      const keys = Object.keys(raw)
      const list: SubjectTitle[] = []

      for (const k of keys) {
        if (list.length >= MAX_LEN) break
        if (k.toLocaleUpperCase().includes(q)) list.push(k)
      }

      // 降级时强行同步当前分类的原始映射表，防止点击时 ID 丢失
      substrings.current = { ...raw }

      setResult(list)
    }
    // isReady 的变更标志着后台高效索引已就绪，需触发搜索逻辑切换至高性能路径
  }, [cat, value, isReady])

  return {
    result,
    substrings
  }
}

/**
 * 人物/单行本联想搜索 Hook
 * @param value 搜索关键字
 */
export function useMonoResult(value: string) {
  const [result, setResult] = useState<JSONMono>([])

  useEffect(() => {
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
          const raw = await loadJSON('mono')
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
  }, [value])

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
  if (!entries.length) return Promise.resolve(false)

  const index: SubStrings = {}
  let offset = 0

  return new Promise(resolve => {
    function processChunk() {
      // 防重入：若代际已落后（用户切换了分类），回传 false 废弃当前链路
      if (gen !== buildGeneration) {
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
      } else {
        if (gen === buildGeneration) {
          indexedStores[cat] = index
          resolve(true)
        } else {
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
  if (Object.keys(rawStores[cat] || {}).length) return

  const key: SearchCat =
    cat === 'subject_1' || cat === 'subject_4' || cat === 'subject_6' ? cat : 'subject_2'

  if (key === 'subject_1') {
    rawStores.subject_1 = await loadJSON('substrings/book')
    return
  }

  if (key === 'subject_4') {
    rawStores.subject_4 = await loadJSON('substrings/game')
    return
  }

  if (key === 'subject_6') {
    rawStores.subject_6 = await loadJSON('substrings/real')
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
}
