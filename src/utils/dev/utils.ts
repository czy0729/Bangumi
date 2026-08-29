/*
 * @Author: czy0729
 * @Date: 2022-09-29 20:22:25
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-09-29 20:22:25
 */
/** 处理循环引用 */
export function handleCircular(): (key: string, value: unknown) => unknown {
  const cache: unknown[] = []
  const keyCache: string[] = []

  return (key: string, value: unknown) => {
    if (typeof value === 'object' && value !== null) {
      const index = cache.indexOf(value)
      if (index !== -1) return `[Circular ${keyCache[index]}]`

      cache.push(value)
      keyCache.push(key || 'root')
    }
    return value
  }
}
