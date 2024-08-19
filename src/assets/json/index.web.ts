/*
 * @Author: czy0729
 * @Date: 2024-08-17 11:48:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-19 13:01:37
 */
const GITHUB_STORYBOOK_REPO = 'Bangumi-Storybook/storybook-static'

const memo = new Map<string, object>()
const lock = new Map<string, boolean>()

/** 加载 json 数据, 客户端与本地获取方式是一致的, 目的是网页端能把 json 文件从打包中剔除 */
export async function loadJSON(name: string, defaultValue: any = {}): Promise<any> {
  try {
    if (memo.has(name)) return memo.get(name)

    let path = `/assets/json/${name}.json`
    if (window.location.host.includes('github')) path = `/${GITHUB_STORYBOOK_REPO}${path}`

    const response = await fetch(path)
    if (!response.ok) return defaultValue

    const data = await response.json()
    memo.set(name, data)

    return data
  } catch (error) {
    return defaultValue
  }
}

/** 返回同步的 json 数据, 需要先提前使用 loadJSON 加载数据 */
export function getJSON(name: string, defaultValue: any = {}, autoLoad: boolean = false) {
  if (autoLoad && !memo.has(name) && !lock.has(name)) {
    lock.set(name, true)

    setTimeout(() => {
      loadJSON(name)
    }, 0)
  }

  return memo.get(name) || defaultValue
}
