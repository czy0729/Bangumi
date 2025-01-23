/*
 * @Author: czy0729
 * @Date: 2023-12-23 05:53:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-06 14:26:01
 */
import lazyac from 'lazy-aho-corasick'
import { TEXT_ONLY } from '@constants'
import { loadJSON } from '@assets/json'
import { arrGroup } from '../utils'
import { IGNORE_ITEMS, REG_SPEC, TRIE_INIT_DISTANCE } from './ds'
import { Substrings, TrieInitDone } from './types'

/** 条目中文对应条目 id */
const subStrings: Substrings = {}

/** 自定义 */
let addon: Substrings = {}

/** 动画别名 */
let alias: Substrings = {}

/** 动画 */
let anime: Substrings = {}

/** 初始化对象 */
const tries: lazyac[] = []

/** 是否初始化 */
let trieInit: boolean

/** 是否批量初始化完毕 (0: 没有初始化, 1: 已经初始化频率最高的数据合集, 2: 完成初始化) */
let trieInitDone: TrieInitDone = 0

/** 初始化需要好几秒, 需要触发后延迟初始化, 待下一次再用 */
export function initLazyac() {
  if (TEXT_ONLY) return true

  if (!trieInit && !tries.length) {
    trieInit = true

    setTimeout(async () => {
      addon = await loadJSON('substrings/addon')
      alias = await loadJSON('substrings/alias')
      anime = await loadJSON('substrings/anime')

      // 安卓环境一次性初始化太多词条会卡死, 所以下面做了分组初始化
      const subjects = []
        .concat(Object.keys(addon), Object.keys(alias), Object.keys(anime))
        .filter(item => {
          if (
            // 过滤掉比较长的条目名字, 命中率很低
            item.length > 8 ||
            item.length <= 1 ||
            IGNORE_ITEMS.includes(item) ||
            // 带特殊符号的通常用户很少手动输入, 命中率很低
            REG_SPEC.test(item)
          ) {
            return false
          }

          return true
        })

      initTrie(subjects)
    }, 0)
  }

  return trieInitDone
}

/** 条目中文对应条目 id */
export function getSubStrings() {
  return subStrings
}

/** 初始化对象组 */
export function getTries() {
  return tries
}

/** 分组初始化 */
async function initTrie(cns: string[]) {
  await new Promise(resolve => requestAnimationFrame(resolve))
  await new Promise(resolve => setTimeout(resolve, TRIE_INIT_DISTANCE))

  const arrs = arrGroup(cns, 500)
  for (let i = 0; i < arrs.length; i += 1) {
    await new Promise(resolve => setTimeout(resolve, TRIE_INIT_DISTANCE * i))
    await new Promise(resolve => requestAnimationFrame(resolve))

    const cns = arrs[i]
    tries.push(
      // 这个 ac 库貌似不支持空格, 替换成特殊字符匹配后再还原回来
      new lazyac(cns, {
        allowDuplicates: false
      })
    )

    // 把 subject cn => subject id 插入 subStrings
    cns.forEach((cn: string) => {
      subStrings[cn] = addon[cn] || alias[cn] || anime[cn]
    })

    // console.info(i)
    if (i === 0) trieInitDone = 1
    if (i === arrs.length - 1) trieInitDone = 2
  }
}
