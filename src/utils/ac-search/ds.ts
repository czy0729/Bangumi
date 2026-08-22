/*
 * @Author: czy0729
 * @Date: 2024-01-23 21:15:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-22 08:56:16
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

/** 首片构建前的延迟, 避开启动渲染高峰 */
export const TRIE_INIT_DISTANCE = WEB ? 200 : 2000

/** 每片的词数 */
export const TRIE_CHUNK_SIZE = 2000
