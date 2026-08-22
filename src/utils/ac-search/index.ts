/*
 * @Author: czy0729
 * @Date: 2022-08-02 13:06:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-22 08:57:20
 */
import { TEXT_ONLY, DEV } from '@src/config'
import { logger } from '../dev'
import hash from '../thirdParty/hash'
import { desc } from '../utils'
import { getSubStrings, getTries, initTries } from './init'

export { getSubStrings } from './init'

/** 缓存搜索过的结果, 条目中文 hash => 多个结果 */
const cacheMap = new Map<string, string[]>()

/** 缓存上限, 防止无限增长 */
const CACHE_LIMIT = 256

/**
 * AC 自动机, 传入一段文本, 返回匹配的条目名字的数组
 * @see ./aho-corasick.ts
 */
export function acSearch(str: string) {
  if (TEXT_ONLY) return

  const trieInitDone = initTries()
  const id = hash(str)
  if (trieInitDone === 2 && cacheMap.has(id)) return cacheMap.get(id)

  const matched = new Set<string>()
  getTries().forEach(trie => {
    trie.search(str).forEach(item => matched.add(item))
  })

  const results = Array.from(matched).sort((a, b) =>
    a.length !== b.length ? desc(a.length, b.length) : desc(b, a)
  )

  if (trieInitDone === 2) {
    // FIFO 淘汰最旧的缓存
    if (cacheMap.size >= CACHE_LIMIT) {
      const [oldest] = cacheMap.keys()
      if (oldest !== undefined) cacheMap.delete(oldest)
    }
    cacheMap.set(id, results)

    // DEV 下打印命中详情 (门控求值, 生产不做 map)
    if (DEV && results.length) {
      const substrings = getSubStrings()
      logger.success(
        '@utils/ac-search',
        '命中',
        `(${results.length})`,
        results.map(item => `${item}#${substrings[item]}`)
      )
    }
  }
  return results
}
