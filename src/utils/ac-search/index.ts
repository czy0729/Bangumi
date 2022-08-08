/*
 * AC 自动机
 *
 * @Doc: https://github.com/theLAZYmd/aho-corasick
 * @Author: czy0729
 * @Date: 2022-08-02 13:06:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-06 13:07:31
 */
import lazyac from 'lazy-aho-corasick'
import anime from '@assets/json/substrings.json'
import game from '@assets/json/substrings-game.json'
import book from '@assets/json/substrings-book.json'
import { arrGroup } from '../utils'
import hash from '../thirdParty/hash'

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

/** 初始化需要好几秒, 需要触发后延迟初始化, 待下一次再用 */
function initLazyac() {
  if (!tries.length && !trieInit) {
    trieInit = true

    // 安卓环境一次性初始化太多词条会卡死, 所以下面做了分组初始化
    const CNS = [...Object.keys(anime), ...Object.keys(game), ...Object.keys(book)]
      .filter(item => {
        // 过滤掉比较长的条目名字, 命中率很低
        if (item.length >= 10 || item.length <= 1) return false

        // 带特殊符号的通常用户很少手动输入, 命中率很低
        if (/。|！|？|：|、|～|・|《|〈|（|「|&|~|:|“|-|!|;|·|'|\*|\?|\+/.test(item)) {
          return false
        }

        return true
      })
      .sort((a: string, b: string) => a.localeCompare(b))

    setTimeout(() => {
      const arrs = arrGroup(CNS, 500)
      arrs.forEach((cns, index) => {
        setTimeout(() => {
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
            SUBSTRINGS[cn] = anime[cn] || game[cn] || book[cn]
          })

          if (index === arrs.length - 1) trieInitDone = true
        }, 2000 * index)
      })
    }, 2000)
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

  results = results.sort((a: string, b: string) => b.localeCompare(a))

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
