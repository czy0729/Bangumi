/*
 * @Author: czy0729
 * @Date: 2021-01-13 11:25:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-23 19:40:34
 */
const I64BIT_TABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-'.split('')

/** djb2 哈希, 微秒级, 无需缓存 (缓存反而会以原文体积为代价常驻内存) */
export default function hash(input: string) {
  if (!input) return ''

  let hash = 5381
  let i = input.length - 1

  if (typeof input == 'string') {
    for (; i > -1; i -= 1) hash += (hash << 5) + input.charCodeAt(i)
  } else {
    for (; i > -1; i -= 1) hash += (hash << 5) + input[i]
  }
  let value = hash & 0x7fffffff

  let retValue = ''
  do {
    retValue += I64BIT_TABLE[value & 0x3f]
  } while ((value >>= 6))

  return retValue
}
