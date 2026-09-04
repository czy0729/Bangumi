/*
 * @Author: czy0729
 * @Date: 2024-08-17 11:48:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-04 21:45:42
 */
import type { JSONData, JSONPath } from './types'

const GITHUB_STORYBOOK_REPO = 'Bangumi-Storybook/storybook-static'

const memo = new Map<JSONPath, JSONData[JSONPath]>()
const lock = new Map<JSONPath, true>()

/** 未命中且调用方未提供 defaultValue 时的兜底 */
const EMPTY = {} as JSONData[JSONPath]

/** 加载 json 数据, 客户端与本地获取方式是一致的, 目的是网页端能把 json 文件从打包中剔除 */
export async function loadJSON<T extends JSONPath>(
  name: T,
  defaultValue?: JSONData[T]
): Promise<JSONData[T]> {
  try {
    if (memo.has(name)) return memo.get(name) as JSONData[T]

    let path = `/assets/json/${name}.json`
    if (window.location.host.includes('github')) path = `/${GITHUB_STORYBOOK_REPO}${path}`

    const response = await fetch(path)
    if (!response.ok) return (defaultValue ?? EMPTY) as JSONData[T]

    const data = (await response.json()) as JSONData[T]
    memo.set(name, data)

    return data
  } catch {}

  return (defaultValue ?? EMPTY) as JSONData[T]
}

/** 返回同步的 json 数据, 需要先提前使用 loadJSON 加载数据 */
export function getJSON<T extends JSONPath>(
  name: T,
  defaultValue?: JSONData[T],
  autoLoad: boolean = false
): JSONData[T] {
  if (autoLoad && !memo.has(name) && !lock.has(name)) {
    lock.set(name, true)

    setTimeout(() => {
      loadJSON(name)
    }, 0)
  }

  const data = memo.get(name) || defaultValue
  return (data ?? EMPTY) as JSONData[T]
}
