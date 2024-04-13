/*
 * @Doc: https://github.com/nk2028/opencc-js
 * @Author: czy0729
 * @Date: 2024-04-13 16:32:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-13 18:53:42
 */
import * as OpenCC from 'opencc-js/dist/esm-lib/core'
import CN from 'opencc-js/dist/esm-lib/from/cn'
import HK from 'opencc-js/dist/esm-lib/to/hk'
import hash from '../hash'

/** 缓存结果 */
const cacheMap = new Map<string, string>()

let converter: OpenCC.Converter

/** 简转繁 */
export function s2t(str: string) {
  if (!converter) converter = OpenCC.ConverterFactory(CN, HK)

  const id = hash(str)
  if (cacheMap.has(id)) return cacheMap.get(id)

  const result = converter(str)
  cacheMap.set(id, result)

  return result
}
