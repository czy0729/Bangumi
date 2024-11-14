/*
 * @Author: czy0729
 * @Date: 2024-01-23 21:15:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-06 15:11:39
 */
import { WEB } from '@constants'

/** 忽略匹配的词 */
export const IGNORE_ITEMS = [
  'PP',
  'TA',
  'el',
  '人生',
  '平衡',
  '意外',
  '日常',
  '暑假',
  '自由',
  '音乐'
] as const

/** 特殊符号 */
export const REG_SPEC = / |-|，|。|！|？|：|；|、|～|・|《|〈|（|「|&|~|:|“|!|;|,|·|'|\*|\?|\.|\+/

/** 分片初始化时间间隔 */
export const TRIE_INIT_DISTANCE = WEB ? 200 : 2000
