/*
 * @Author: czy0729
 * @Date: 2023-12-14 12:12:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-14 15:51:53
 */
import { TEXT_BADGES } from '@constants/text'
import { DEV } from '@src/config'

/** info */
export function log(method: string, ...others: any[]) {
  if (DEV) console.info(TEXT_BADGES.plain, `[@utils/kv/${method}]`, ...others)
}

/** err */
export function err(method: string, ...others: any[]) {
  if (DEV) console.info(TEXT_BADGES.danger, `[@utils/kv/${method}]`, ...others)
}

export function splitAndKeepPunctuation(str: string) {
  // 首先，使用正则表达式分割字符串，保留分隔符
  const parts = str.split(/(。|！|？)/)
  const result = []

  for (let i = 0; i < parts.length; i++) {
    // 如果是分隔符，将前一个元素和分隔符合并，然后添加到结果数组
    if (['。', '！', '？'].includes(parts[i])) {
      if (result.length > 0) {
        result[result.length - 1] += parts[i]
      }
    } else {
      // 如果不是分隔符，直接添加到结果数组
      result.push(parts[i])
    }
  }

  return result
}
