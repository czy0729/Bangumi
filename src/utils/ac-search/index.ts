/*
 * AC 自动机
 *
 * @Doc: https://github.com/theLAZYmd/aho-corasick
 * @Author: czy0729
 * @Date: 2022-08-02 13:06:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-26 21:42:35
 */
import lazyac from 'lazy-aho-corasick'
import { arrGroup, desc } from '../utils'
import hash from '../thirdParty/hash'

type Substrings = Record<string, number>

let addon: Substrings = {}
let alias: Substrings = {}
let anime: Substrings = {}
// let game: Substrings = {}
// let book: Substrings = {}

/** 忽略匹配的词 */
const IGNORE_ITEMS = ['日常', 'PP']

/** 缓存搜索过的结果 */
const CACHE: {
  [hash: string]: string[]
} = {}

/** subject cn => subject id */
const SUBSTRINGS: {
  [cn: string]: number
} = {}

/** 初始化对象 */
const tries: lazyac[] = []

/** 是否初始化 */
let trieInit: boolean

/** 是否批量初始化完毕 */
let trieInitDone: boolean

/** 分片初始化时间间隔 */
const trieInitDistance = 1000

/** 初始化需要好几秒, 需要触发后延迟初始化, 待下一次再用 */
function initLazyac() {
  if (!tries.length && !trieInit) {
    trieInit = true

    addon = require('@assets/json/substrings/addon.json')
    alias = require('@assets/json/substrings/alias.json')
    anime = require('@assets/json/substrings/anime.json')
    // game = require('@assets/json/substrings/game.json')
    // book = require('@assets/json/substrings/book.json')

    // 安卓环境一次性初始化太多词条会卡死, 所以下面做了分组初始化
    const CNS = [
      ...Object.keys(addon),
      ...Object.keys(alias),
      ...Object.keys(anime)
      // ...Object.keys(game),
      // ...Object.keys(book)
    ]
      .filter(item => {
        // 过滤掉比较长的条目名字), 命中率很低
        if (item.length >= 10 || item.length <= 1 || IGNORE_ITEMS.includes(item))
          return false

        // 带特殊符号的通常用户很少手动输入, 命中率很低
        if (/。|！|？|：|、|～|・|《|〈|（|「|&|~|:|“|!|;|·|'|\*|\?|\+/.test(item)) {
          return false
        }

        return true
      })
      .sort((a: string, b: string) => a.localeCompare(b))

    requestAnimationFrame(() => {
      setTimeout(() => {
        const arrs = arrGroup(CNS, 500)
        arrs.forEach((cns, index) => {
          setTimeout(() => {
            requestAnimationFrame(() => {
              tries.push(
                new lazyac(
                  // 这个ac库貌似不支持空格, 替换成特殊字符匹配后再还原回来
                  cns,
                  {
                    allowDuplicates: false
                  }
                )
              )

              // 把 subject cn => subject id 插入 SUBSTRINGS
              cns.forEach((cn: string) => {
                SUBSTRINGS[cn] = addon[cn] || alias[cn] || anime[cn]
                // || game[cn] || book[cn]
              })

              if (index === arrs.length - 1) trieInitDone = true
            })
          }, trieInitDistance * index)
        })
      }, trieInitDistance)
    })
  }
}

/**
 * AC 自动机
 *  - 传入一段文本, 返回匹配的条目名字的数组
 */
export function acSearch(str: string) {
  if (!trieInit) {
    initLazyac()
    return str
  }

  const _hash = hash(str)
  if (trieInitDone && CACHE[_hash]) return CACHE[_hash]

  let results = []
  tries.forEach(trie => {
    trie.search(str).forEach((cn: string) => {
      if (!results.includes(cn)) results.push(cn)
    })
  })

  results = results.sort((a: string, b: string) => {
    if (a.length !== b.length) return desc(a.length, b.length)
    return b.localeCompare(a)
  })

  if (trieInitDone) {
    CACHE[_hash] = results
    return CACHE[_hash]
  }

  return results
}

/** subject cn => subject id */
export function getSubStrings() {
  return SUBSTRINGS
}
