/*
 * @Author: czy0729
 * @Date: 2022-09-29 20:22:25
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-09-29 20:22:25
 */
/** 处理循环引用 */
export function handleCircular() {
  const cache = []
  const keyCache = []

  return (key: string, value: any) => {
    if (typeof value === 'object' && value !== null) {
      const index = cache.indexOf(value)
      if (index !== -1) return `[Circular ${keyCache[index]}]`

      cache.push(value)
      keyCache.push(key || 'root')
    }
    return value
  }
}
