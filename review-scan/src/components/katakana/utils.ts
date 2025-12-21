/*
 * @Author: czy0729
 * @Date: 2022-05-06 20:48:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-02 16:54:08
 */
import { getStorage, setStorage } from '@utils'
import { baiduTranslate } from '@utils/fetch'
import { FROZEN_FN } from '@constants'
import { loadJSON } from '@assets/json'
import { JSONKatakana } from '@assets/json/types'
import { Fn } from '@types'
import { CACHE_KEY } from './ds'

let memo: JSONKatakana = {
  スクールアイドル: 'Idol school',
  マギカ: 'Magica'
}

export async function getCache() {
  const katakanaJSON = await loadJSON('katakana')

  try {
    memo = {
      ...katakanaJSON,
      ...(await getStorage(CACHE_KEY))
    }
    return true
  } catch (error) {
    memo = {
      ...katakanaJSON
    }
    return true
  }
}

const KATAKANA_REG =
  /[\u30A1-\u30FA\u30FD-\u30FF][\u3099\u309A\u30A1-\u30FF]*[\u3099\u309A\u30A1-\u30FA\u30FC-\u30FF]|[\uFF66-\uFF6F\uFF71-\uFF9D][\uFF65-\uFF9F]*[\uFF66-\uFF9F]/g

export function matchKatakanas(str: string) {
  return str.match(KATAKANA_REG)
}

/** 检查是否需要翻译的间隔 */
const interval = 6400

/** 用于收集日文, 合并多个翻译请求用 */
let jps: string[] = []
let cbs: Fn[] = []

async function doTranslate() {
  try {
    const text = jps.join('\n')
    jps = []
    const response = await baiduTranslate(text, 'en')
    const { trans_result: transResult } = JSON.parse(response as string)

    if (Array.isArray(transResult)) {
      // [{ dst: 'Studio pulp', src: 'スタジオパルプ' }]
      transResult.forEach(item => (memo[item.src] = item.dst))
      save()
    }

    cbs.forEach(cb => cb(memo))
  } catch (error) {
    //
  } finally {
    cbs = []
  }
}

/** 翻译 */
export async function translate(jp: string, cb: Fn = FROZEN_FN) {
  // jp 不是字符串直接抛弃
  if (typeof jp !== 'string') return

  // 命中缓存马上回调
  if (memo[jp]) {
    cb(memo)
    return
  }

  cbs.push(cb)
  if (jps.includes(jp)) return

  if (!jps.length) setTimeout(() => doTranslate(), interval)

  jps.push(jp)
}

/** 翻译全部 (提供给渲染富文本用) */
export async function translateAll(str: string) {
  try {
    const match = matchKatakanas(str)
    if (!match) return null

    const needTranslate = match.filter(jp => !memo[jp])
    if (needTranslate.length) {
      const response = await baiduTranslate(needTranslate.join('\n'), 'en')
      const { trans_result: transResult } = JSON.parse(response as string)
      if (Array.isArray(transResult)) {
        transResult.forEach(item => (memo[item.src] = item.dst))
        save()
      }
    }

    const result = {}
    match.forEach(jp => (result[jp] = memo[jp]))
    return result
  } catch (error) {
    return null
  }
}

async function save() {
  const data = {
    ...memo
  }
  Object.keys(await loadJSON('katakana')).forEach(item => delete data[item])
  setStorage(CACHE_KEY, data)
}
