/*
 * @Author: czy0729
 * @Date: 2024-08-17 11:48:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-18 04:25:32
 */
const memo = new Map<string, object>()

export async function loadJSON(name: string, defaultValue: any = {}): Promise<any> {
  try {
    const path = `/assets/json/${name}.json`
    if (memo.has(path)) return memo.get(path)

    const response = await fetch(path)
    if (!response.ok) return defaultValue

    const data = await response.json()
    memo.set(path, data)

    return data
  } catch (error) {
    return defaultValue
  }
}

export function getJSON(name: string, defaultValue: any = {}) {
  const path = `/assets/json/${name}.json`
  return memo.get(path) || defaultValue
}
