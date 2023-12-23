/*
 * @Author: czy0729
 * @Date: 2023-12-23 05:53:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-23 06:20:14
 */
import lazyac from 'lazy-aho-corasick'
import { TEXT_ONLY } from '@constants'
import { arrGroup, desc } from '../utils'
import { Substrings } from './types'

/** 忽略匹配的词 */
const IGNORE_ITEMS = ['日常', 'PP']

/** 特殊符号 */
const REG_SPEC = /。|！|？|：|、|～|・|《|〈|（|「|&|~|:|“|!|;|·|'|\*|\?|\+/

/** 条目中文对应条目id */
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

/** 是否批量初始化完毕 */
let trieInitDone: boolean

/** 分片初始化时间间隔 */
const trieInitDistance = 1000

/** 条目中文对应条目id */
export function getSubStrings() {
  return subStrings
}

/** 初始化对象组 */
export function getTries() {
  return tries
}

/** 初始化需要好几秒, 需要触发后延迟初始化, 待下一次再用 */
export function initLazyac() {
  if (TEXT_ONLY) return true

  if (!trieInit && !tries.length) {
    trieInit = true

    addon = require('@assets/json/substrings/addon.json')
    alias = require('@assets/json/substrings/alias.json')
    anime = require('@assets/json/substrings/anime.json')

    // 安卓环境一次性初始化太多词条会卡死, 所以下面做了分组初始化
    initTrie(
      [...Object.keys(addon), ...Object.keys(alias), ...Object.keys(anime)]
        .filter(item => {
          // 过滤掉比较长的条目名字, 命中率很低
          if (item.length >= 10 || item.length <= 1 || IGNORE_ITEMS.includes(item)) {
            return false
          }

          // 带特殊符号的通常用户很少手动输入, 命中率很低
          if (REG_SPEC.test(item)) return false

          return true
        })
        .sort((a, b) => desc(String(a), String(b)))
    )
  }

  return trieInitDone
}

/** 分组初始化 */
async function initTrie(cns: string[]) {
  await new Promise(resolve => requestAnimationFrame(resolve))
  await new Promise(resolve => setTimeout(resolve, trieInitDistance))

  const arrs = arrGroup(cns, 500)
  for (let i = 0; i < arrs.length; i += 1) {
    await new Promise(resolve => setTimeout(resolve, trieInitDistance * i))
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

    if (i === arrs.length - 1) trieInitDone = true
  }
}
