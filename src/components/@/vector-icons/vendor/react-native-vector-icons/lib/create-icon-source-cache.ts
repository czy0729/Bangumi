/*
 * @Author: czy0729
 * @Date: 2026-09-19 07:24:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-19 07:56:00
 */
const TYPE_VALUE = 'value'
const TYPE_ERROR = 'error'

type CacheEntry<T> =
  | { type: typeof TYPE_VALUE; data: T }
  | { type: typeof TYPE_ERROR; data: unknown }

/** getImageSource 渲染结果缓存: 同 glyph + 尺寸 + 颜色只渲染一次 */
export default function createIconSourceCache<T>() {
  const cache = new Map<string, CacheEntry<T>>()

  const setValue = (key: string, value: T) => cache.set(key, { type: TYPE_VALUE, data: value })

  const setError = (key: string, error: unknown) =>
    cache.set(key, { type: TYPE_ERROR, data: error })

  const has = (key: string) => cache.has(key)

  const get = (key: string): T | undefined => {
    const entry = cache.get(key)
    if (!entry) {
      return undefined
    }
    if (entry.type === TYPE_ERROR) {
      throw entry.data
    }
    return entry.data
  }

  return { setValue, setError, has, get }
}
