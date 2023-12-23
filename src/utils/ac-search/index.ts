/*
 * @Author: czy0729
 * @Date: 2022-08-02 13:06:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-23 06:21:28
 */
import { desc } from '../utils'
import hash from '../thirdParty/hash'
import { getSubStrings, getTries, initLazyac } from './utils'

export { getSubStrings }

/** 缓存搜索过的结果, 条目中文 hash => 多个结果 */
const cacheMap = new Map<string, string[]>()

/**
 * AC 自动机, 传入一段文本, 返回匹配的条目名字的数组
 * @doc https://github.com/theLAZYmd/aho-corasick
 */
export function acSearch(str: string) {
  const trieInitDone = initLazyac()
  const id = hash(str)
  if (trieInitDone && cacheMap.has(id)) return cacheMap.get(id)

  let results: string[] = []
  getTries().forEach(trie => {
    trie.search(str).forEach((cn: string) => {
      if (!results.includes(cn)) results.push(cn)
    })
  })

  results = results.sort((a, b) =>
    a.length !== b.length ? desc(a.length, b.length) : desc(b, a)
  )
  if (trieInitDone) cacheMap.set(id, results)
  return results
}
