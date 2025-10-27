/*
 * @Author: czy0729
 * @Date: 2021-01-13 11:25:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-23 19:40:34
 */
const I64BIT_TABLE =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-'.split('')

/** 缓存结果 */
const cacheMap = new Map()

export default function hash(input: any) {
  if (!input) return ''

  if (input && cacheMap.has(input)) return cacheMap.get(input)

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

  cacheMap.set(input, retValue)
  return retValue
}
