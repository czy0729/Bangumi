/*
 * @Author: czy0729
 * @Date: 2023-12-23 05:53:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-22 09:20:00
 */
import { TEXT_ONLY } from '@constants'
import { logger } from '../dev'
import { AhoCorasick } from './aho-corasick'
import { filterWords, loadWords } from './words'
import { TRIE_CHUNK_SIZE, TRIE_INIT_DISTANCE } from './ds'

import type { Substrings, TrieInitDone } from './types'

/** 词库 中文 => 条目 id, 由初始化时加载填充 */
let cnMap: Substrings = {}

/** 初始化对象组 */
const tries: AhoCorasick[] = []

/** 是否已触发过初始化 */
let inited: boolean

/** 是否批量初始化完毕 (0: 没有初始化, 1: 已经初始化频率最高的数据合集, 2: 完成初始化) */
let trieInitDone: TrieInitDone = 0

/**
 * 初始化自动机 (构建很快, 延迟触发以避开启动高峰), 返回当前进度
 * - 0: 未开始或构建中; 1: 首片可用; 2: 全部完成
 */
export function initTries() {
  if (TEXT_ONLY) return true

  if (!inited && !tries.length) {
    inited = true

    setTimeout(async () => {
      cnMap = await loadWords()

      const words = filterWords(Object.keys(cnMap))
      logger.log('@utils/ac-search', '开始初始化', `${words.length} 词条`)
      initChunks(words)
    }, 0)
  }

  return trieInitDone
}

/** 词库 中文 => 条目 id (命中词必是过滤词, 必在此映射中) */
export function getSubStrings() {
  return cnMap
}

/** 初始化对象组 */
export function getTries() {
  return tries
}

/** 构建一棵自动机 */
function buildTrie(words: string[]) {
  const trie = new AhoCorasick()
  trie.addWords(words)
  trie.build()
  return trie
}

/**
 * 分片构建, 全程最多 2 棵自动机
 * - 首片立即构建尽早渐进可用; 余量词的 addWords 是廉价插入, 片间让帧, 最后一次性 build
 */
async function initChunks(words: string[]) {
  await new Promise(resolve => setTimeout(resolve, TRIE_INIT_DISTANCE))

  const begin = Date.now()

  // 首片
  const first = words.slice(0, TRIE_CHUNK_SIZE)
  tries.push(buildTrie(first))
  trieInitDone = 1
  logger.info('@utils/ac-search', '首片构建', `${first.length} 词条`)

  // 余量合并为第二棵
  const rest = words.slice(TRIE_CHUNK_SIZE)
  if (rest.length) {
    const trie = new AhoCorasick()
    for (let i = 0; i < rest.length; i += TRIE_CHUNK_SIZE) {
      await new Promise(resolve => requestAnimationFrame(resolve))
      trie.addWords(rest.slice(i, i + TRIE_CHUNK_SIZE))
    }

    await new Promise(resolve => requestAnimationFrame(resolve))
    trie.build()
    tries.push(trie)
    logger.info('@utils/ac-search', '余量构建', `${rest.length} 词条`)
  }

  trieInitDone = 2
  logger.success(
    '@utils/ac-search',
    '初始化完成',
    `${tries.length} 棵自动机 / ${words.length} 词条 / ${Date.now() - begin}ms`
  )
}
