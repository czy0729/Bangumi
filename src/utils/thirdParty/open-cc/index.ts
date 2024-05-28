/*
 * @Doc: https://github.com/nk2028/opencc-js
 * @Author: czy0729
 * @Date: 2024-04-13 16:32:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-28 15:14:05
 */
import * as OpenCC from 'opencc-js/dist/esm-lib/core'
import CN from 'opencc-js/dist/esm-lib/from/cn'
import HK from 'opencc-js/dist/esm-lib/to/hk'
import TW from 'opencc-js/dist/esm-lib/to/tw'
import { getSetting } from '../../app'
import hash from '../hash'

/** 缓存结果 */
const memoHK = new Map<string, string>()
const memoTW = new Map<string, string>()

let converterHK: OpenCC.Converter
let converterTW: OpenCC.Converter

/** 简转繁 */
export function s2t(str: string) {
  let converter: typeof converterTW | typeof converterHK
  let memo: typeof memoTW | typeof memoHK
  if (getSetting().s2tLocal === 'hk') {
    if (!converterHK) converterHK = OpenCC.ConverterFactory(CN, HK)
    converter = converterHK
    memo = memoHK
  } else {
    if (!converterTW) converterTW = OpenCC.ConverterFactory(CN, TW)
    converter = converterTW
    memo = memoTW
  }

  const id = hash(str)
  if (memo.has(id)) return memo.get(id)

  const result = converter(str)
  memo.set(id, result)

  return result
}
