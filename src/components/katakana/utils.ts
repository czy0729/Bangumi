/*
 * @Author: czy0729
 * @Date: 2022-05-06 20:48:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-30 21:42:33
 */
import { Children, isValidElement } from 'react'
import { getStorage, setStorage } from '@utils'
import { logger } from '@utils/dev'
import { baiduTranslate } from '@utils/fetch'
import { decode } from '@utils/thirdParty/protobuf'
import { FROZEN_FN } from '@constants'
import { BAIDU_BATCH_LIMIT, CACHE_KEY, COMPONENT, TRANSLATE_INTERVAL } from './ds'

import type { JSONKatakana } from '@assets/json/types'
import type { ReactNode } from '@types'

let memo: JSONKatakana = {
  マギカ: 'Magica'
}

/** 已持久化的翻译结果, 累积写入避免覆盖丢失 */
let persisted: JSONKatakana = {}

export async function getCache() {
  let katakanaJSON: JSONKatakana = {}
  try {
    katakanaJSON = await decode('katakana')
  } catch (error) {
    // 字典加载失败时保留默认 memo, 退化为纯百度翻译
    logger.error(COMPONENT, 'getCache', '字典加载失败', error)
    return true
  }

  try {
    const storage = ((await getStorage<JSONKatakana>(CACHE_KEY)) || {}) as JSONKatakana
    memo = {
      ...katakanaJSON,
      ...storage
    }
    persisted = {
      ...storage
    }
    logger.success(
      COMPONENT,
      'getCache',
      `字典 ${Object.keys(katakanaJSON).length} 条, 合并持久化 ${Object.keys(storage).length} 条`
    )
  } catch (error) {
    memo = {
      ...katakanaJSON
    }
    logger.warn(
      `${COMPONENT}/getCache`,
      `持久化读取失败, 仅用字典 ${Object.keys(katakanaJSON).length} 条`
    )
  }
  return true
}

let inited = false
let cacheReady: Promise<void> | null = null

/** 惰性初始化: 首次启用片假名时才加载字典与持久化, 关闭时零加载开销 */
export function ensureCacheReady(): Promise<void> {
  if (inited) return Promise.resolve()
  if (!cacheReady) {
    cacheReady = getCache().then(() => {
      inited = true
    })
  }
  return cacheReady
}

/**
 * 与预生成字典 katakana.json 的抽取正则保持一致 (见 web/test/jsonl/katakana/raw.js)
 *  - 整段匹配包括 ・ 与 ー, 使 ソードアート・オンライン 这类片段能直接命中字典
 *  - 仅匹配全角片假名 (字典无半角键)
 */
const KATAKANA_REG = /[\u30A0-\u30FF\u31F0-\u31FF]+/g

/** 是否包含片假名字母 (用于过滤 ・ ー ゠ 等纯标点片段) */
const HAS_KATAKANA_LETTER = /[\u30A1-\u30FA]/

export function matchKatakanas(str: string) {
  return (str.match(KATAKANA_REG) || []).filter(match => HAS_KATAKANA_LETTER.test(match))
}

/** 递归提取嵌套 Text 的纯文本, 用于匹配片假名 */
export function getKatakanaText(children: ReactNode): string {
  let text = ''
  Children.forEach(children, child => {
    if (typeof child === 'string' || typeof child === 'number') {
      text += child
    } else if (isValidElement(child)) {
      const props = child.props as { children?: ReactNode }
      text += getKatakanaText(props.children)
    }
  })
  return text
}

/**
 * 需要翻译的队列: 以片段为键去重, 值为该片段等待结果的回调
 *  - 悬浮层 translate 与富文本 translateAll 共用同一队列, 保证全局请求唯一
 *  - 回调数组聚合同一片段的多个调用方
 */
const pending = new Map<string, ((item: { jp: string; en: string }) => void)[]>()
let timer: ReturnType<typeof setTimeout> | undefined
let flushing: Promise<void> | null = null

/** 新写入 memo 的片段, 用于增量持久化 */
const dirty = new Set<string>()

/** 分批翻译并写入 memo, 合并百度返回 */
async function fetchTranslations(jps: string[]) {
  let start = 0
  while (start < jps.length) {
    const batch: string[] = []
    let length = 0
    while (start < jps.length && length + jps[start].length <= BAIDU_BATCH_LIMIT) {
      batch.push(jps[start])
      length += jps[start].length
      start++
    }

    // 单个片段超过上限时强制放入, 避免内层循环不推进导致死循环
    if (!batch.length) {
      batch.push(jps[start])
      start++
    }

    try {
      const response = await baiduTranslate(batch.join('\n'), 'en')
      const parsed = JSON.parse(response as string) as {
        trans_result?: { src: string; dst: string }[]
      }
      if (Array.isArray(parsed.trans_result)) {
        // [{ dst: 'Studio pulp', src: 'スタジオパルプ' }]
        parsed.trans_result.forEach(item => {
          memo[item.src] = item.dst
          dirty.add(item.src)
          logger.log(COMPONENT, 'translate', '翻译完成', item.src, '=>', item.dst)
        })
        save()
      }
    } catch (error) {
      //
    }
  }
}

/** 将片段加入翻译队列 (去重 + 聚合回调) */
function pushQueue(jp: string, cb: (item: { jp: string; en: string }) => void) {
  if (!pending.has(jp)) pending.set(jp, [])
  pending.get(jp)!.push(cb)
}

/**
 * 触发翻译队列: 串行 drain, 单次只发一批 (符合百度 QPS=1)
 *  - 等待期间新入队的片段会被循环一并处理
 *  - 并发调用共用同一个进行中的 flush
 */
function flush(): Promise<void> {
  if (flushing) return flushing

  flushing = (async () => {
    try {
      while (pending.size) {
        const entries = [...pending.entries()]
        pending.clear()

        await fetchTranslations(entries.map(([jp]) => jp))

        entries.forEach(([jp, cbs]) => {
          const en = memo[jp]
          if (!en) return
          cbs.forEach(cb => cb({ jp, en }))
        })
      }
    } finally {
      flushing = null
    }
  })()

  return flushing
}

/** 防抖触发翻译 (用于悬浮层, 聚合一段时间内的请求) */
function scheduleFlush() {
  if (!timer) {
    timer = setTimeout(() => {
      timer = undefined
      flush()
    }, TRANSLATE_INTERVAL)
  }
}

/** 从片段解析出字典中存在的 {jp, en}; 整词未命中时按 ・ 拆分为子片段 */
function resolvePhrase(jp: string): { jp: string; en: string }[] {
  const whole = memo[jp]
  if (whole) return [{ jp, en: whole }]

  const resolved: { jp: string; en: string }[] = []
  for (const part of jp.split('・')) {
    const en = part && memo[part]
    if (en) resolved.push({ jp: part, en })
  }
  return resolved
}

/** 翻译 */
export async function translate(
  jp: string,
  cb: (item: { jp: string; en: string }) => void = FROZEN_FN
) {
  // jp 不是字符串直接抛弃
  if (typeof jp !== 'string') return

  await ensureCacheReady()

  // 命中字典 (整词或拆分后的子片段) 马上回调
  const resolved = resolvePhrase(jp)
  if (resolved.length) {
    resolved.forEach(item => {
      logger.log(COMPONENT, 'translate', '命中字典', item.jp, '=>', item.en)
      cb(item)
    })
    return
  }

  // 未命中, 加入队列请求百度翻译
  logger.yellow(COMPONENT, 'translate', '未命中, 入队百度', jp)
  pushQueue(jp, cb)
  scheduleFlush()
}

/** 翻译全部 (提供给渲染富文本用) */
export async function translateAll(str: string) {
  try {
    const match = matchKatakanas(str)
    if (!match) return null

    await ensureCacheReady()

    const misses = match.filter(jp => !memo[jp])
    if (misses.length) {
      // 与悬浮层共用队列, 入队后立即触发统一翻译
      misses.forEach(jp => pushQueue(jp, FROZEN_FN))
      await flush()
    }

    const result = {}
    match.forEach(jp => (result[jp] = memo[jp]))
    return result
  } catch (error) {
    return null
  }
}

/** 增量持久化新翻译的片段, 与已持久化内容合并后再写入 */
async function save() {
  if (!dirty.size) return

  const data: JSONKatakana = {}
  dirty.forEach(jp => {
    if (memo[jp]) data[jp] = memo[jp]
  })
  dirty.clear()
  persisted = {
    ...persisted,
    ...data
  }
  setStorage(CACHE_KEY, persisted)
}
