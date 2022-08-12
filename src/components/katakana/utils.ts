/*
 * @Author: czy0729
 * @Date: 2022-05-06 20:48:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-12 12:07:04
 */
import { setStorage, getStorage } from '@utils'
import { baiduTranslate } from '@utils/fetch'
import { CACHE_KEY, CACHES } from './ds'

let cache = {
  マギカ: 'Magica'
}

export async function getCache() {
  try {
    cache = {
      ...CACHES,
      ...(await getStorage(CACHE_KEY))
    }
    return true
  } catch (error) {
    cache = {
      ...CACHES
    }
    return true
  }
}

const katakana =
  /[\u30A1-\u30FA\u30FD-\u30FF][\u3099\u309A\u30A1-\u30FF]*[\u3099\u309A\u30A1-\u30FA\u30FC-\u30FF]|[\uFF66-\uFF6F\uFF71-\uFF9D][\uFF65-\uFF9F]*[\uFF66-\uFF9F]/g

export function matchKatakanas(str: string) {
  return str.match(katakana)
}

const interval = 5000
let jps = [] // 用于收集日文, 合并多个翻译请求用
let cbs = []
export async function translate(jp: string, cb = Function.prototype) {
  // jp不是字符串直接抛弃
  if (typeof jp !== 'string') {
    return
  }

  // 命中缓存马上回调
  if (cache[jp]) {
    cb(cache)
    return
  }

  cbs.push(cb)
  if (jps.includes(jp)) {
    return
  }

  if (!jps.length) {
    setTimeout(() => doTranslate(), interval)
  }
  jps.push(jp)
}

async function doTranslate() {
  try {
    const text = jps.join('\n')
    jps = []
    const response = await baiduTranslate(text, 'en')
    const { trans_result: transResult } = JSON.parse(response as string)

    if (Array.isArray(transResult)) {
      // [{ dst: 'Studio pulp', src: 'スタジオパルプ' }]
      transResult.forEach(item => (cache[item.src] = item.dst))
      setStorage(CACHE_KEY, cache)
    }

    cbs.forEach(cb => cb(cache))
  } catch (error) {
    //
  } finally {
    cbs = []
  }
}

export async function translateAll(str: string) {
  try {
    const match = matchKatakanas(str)
    if (!match) return null

    const needTranslate = match.filter(jp => !cache[jp])
    if (needTranslate.length) {
      const response = await baiduTranslate(needTranslate.join('\n'), 'en')
      const { trans_result: transResult } = JSON.parse(response as string)
      if (Array.isArray(transResult)) {
        transResult.forEach(item => (cache[item.src] = item.dst))
        setStorage(CACHE_KEY, cache)
      }
    }

    const result = {}
    match.forEach(jp => (result[jp] = cache[jp]))
    return result
  } catch (error) {
    return null
  }
}
