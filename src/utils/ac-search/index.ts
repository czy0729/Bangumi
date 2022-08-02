/*
 * AC 自动机
 * @Doc: https://github.com/theLAZYmd/aho-corasick
 * @Author: czy0729
 * @Date: 2022-08-02 13:06:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-02 14:14:50
 */
import lazyac from 'lazy-aho-corasick'
import anime from '@assets/json/substrings.json'
import book from '@assets/json/substrings-book.json'
import game from '@assets/json/substrings-game.json'
import hash from '../thirdParty/hash'

/** 缓存搜索过的结果 */
const CACHE: {
  [hash: string]: string[]
} = {}

let CNS: string[] = []

let SUBSTRINGS: {
  [cn: string]: number
}

/** 是否初始化 */
let trieInit: boolean

/** 初始化对象 */
let trie: lazyac

/** 初始化需要好几秒, 需要触发后延迟初始化, 待下一次再用 */
function initLazyac() {
  if (!trie) {
    if (!trieInit) {
      CNS = Array.from(
        new Set([...Object.keys(anime), ...Object.keys(book), ...Object.keys(game)])
      )
        .filter(item => {
          // 过滤掉比较长的条目名字, 命中率很低
          if (item.length >= 10 || item.length <= 1) return false

          // 带特殊符号的通常用户很少手动输入, 命中率很低
          if (
            /。|！|？|：|、|～|・|《|〈|（|「|&|~|:|“|-|!|;|·|'|\*|\?|\+/.test(item)
          ) {
            return false
          }

          return true
        })
        .sort((a, b) => a.localeCompare(b))

      setTimeout(() => {
        trie = new lazyac(
          // 这个ac库貌似不支持空格, 替换成特殊字符匹配后再还原回来
          CNS,
          {
            allowDuplicates: false
          }
        )
      }, 4000)
    }
  }
}

/**
 * AC 自动机
 *  - 传入一段文本, 返回匹配的条目名字的数组
 */
export function acSearch(str: string) {
  if (!trie) {
    initLazyac()
    return str
  }

  const _hash = hash(str)
  if (CACHE[_hash]) return CACHE[_hash]

  CACHE[_hash] = trie.search(str).sort((a, b) => b.length - a.length)
  // .map(item => item.replace(/&nbsp/g, ' '))
  // console.log(CACHE[_hash], str.replace(/ /g, '&nbsp'))

  return CACHE[_hash]
}

export function getSubStrings() {
  if (!SUBSTRINGS) {
    SUBSTRINGS = {}
    CNS.forEach(cn => {
      SUBSTRINGS[cn] = anime[cn] || book[cn] || game[cn]
    })
  }

  return SUBSTRINGS
}
