/*
 * @Author: czy0729
 * @Date: 2022-08-09 09:47:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-15 14:17:07
 */
import { getPinYinFirstCharacter } from '../thirdParty/pinyin'
import { t2s } from '../thirdParty/cn-char'

/** 缓存结果 */
const getPinyinCacheMap = new Map<string, string>()

/** 获取字符串所有字的首字母 */
export function getPinYin(title: string) {
  if (typeof title !== 'string' && !title) {
    return {
      str: title,
      pinyin: ''
    }
  }

  // 简单过滤掉不能获得拼音的字符
  const str = title.replace(/~| |!|\?|;|:|"|&|\.|，|。|？|！|：|“|”|；|（|）/g, '')
  if (getPinyinCacheMap.has(str)) {
    return {
      str,
      pinyin: getPinyinCacheMap.get(str)
    }
  }

  const pinyin = getPinYinFirstCharacter(str, str.length).replace(/ /g, '') || ''
  getPinyinCacheMap.set(str, pinyin)

  return {
    str,
    pinyin
  }
}

/** 缓存结果 */
const getPinYinFilterValueCacheMap = new Map<string, string>()

/** 获取字符串所有字的首字母, 并匹配 */
export function getPinYinFilterValue(title: string, filter: string) {
  if (typeof title !== 'string' || typeof filter !== 'string' || !filter) return ''

  const key = `${title}|${filter}`
  if (getPinYinFilterValueCacheMap.has(key)) {
    return getPinYinFilterValueCacheMap.get(key)
  }

  let value = ''
  if (/^[a-zA-Z]+$/.test(filter)) {
    const { str, pinyin } = getPinYin(title)
    if (pinyin) {
      const index = pinyin.indexOf(filter.toLocaleUpperCase())
      if (index !== -1) value = str.slice(index, index + filter.length)
    }
  } else if (!value) {
    const _title = t2s(title.toLocaleUpperCase())
    const _filter = t2s(filter)
    if (_title.includes(_filter.toLocaleUpperCase())) {
      value = _filter
    }
  }

  getPinYinFilterValueCacheMap.set(key, value)
  return value
}
