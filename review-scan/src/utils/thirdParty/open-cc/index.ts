/*
 * @Doc: https://github.com/nk2028/opencc-js
 * @Author: czy0729
 * @Date: 2024-04-13 16:32:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-18 07:20:23
 */
import { getSetting } from '../../app'
import hash from '../hash'
import { CN, HK, OpenCC, TW } from './module'

const memoCache = {
  hk: new Map<string, string>(),
  tw: new Map<string, string>(),
  noCn: new Map<string, boolean>()
}

const converters = {
  hk: null as OpenCC.Converter | null,
  tw: null as OpenCC.Converter | null
}

/** 检查字符串是否包含中文 */
function containsChinese(str: string): boolean {
  return /[\u4e00-\u9fa5]/.test(str)
}

/** 简转繁 */
export function s2t(str: string): string {
  if (typeof str !== 'string') return str

  // 哈希键
  const id = hash(str)

  // 先检查无中文缓存
  if (memoCache.noCn.has(id)) return str

  // 检查是否包含中文
  if (!containsChinese(str)) {
    memoCache.noCn.set(id, true)
    return str
  }

  const targetLocale = getSetting().s2tLocal === 'hk' ? 'hk' : 'tw'

  // 检查目标语言缓存
  if (memoCache[targetLocale].has(id)) return memoCache[targetLocale].get(id)!

  // 初始化转换器
  if (!converters[targetLocale]) {
    converters[targetLocale] = OpenCC.ConverterFactory(CN, targetLocale === 'hk' ? HK : TW)
  }

  // 执行转换并缓存结果
  const result = converters[targetLocale]!(str)
  memoCache[targetLocale].set(id, result)

  return result
}
