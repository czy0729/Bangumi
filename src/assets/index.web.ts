/*
 * @Author: czy0729
 * @Date: 2024-08-17 11:48:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-17 12:03:14
 */
const memo = new Map<string, object>()

export async function loadJSON(name: string): Promise<any> {
  try {
    const path = `/assets/json/${name}.json`
    if (memo.has(path)) return memo.get(path)

    const response = await fetch(path)
    if (!response.ok) return {}

    const data = await response.json()
    memo.set(path, data)

    return data
  } catch (error) {
    return {}
  }
}
