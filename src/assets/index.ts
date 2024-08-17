/*
 * @Author: czy0729
 * @Date: 2024-08-17 11:48:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-18 04:26:01
 */
const memo = new Map<string, object>()

export async function loadJSON(name: string, defaultValue: any = {}): Promise<any> {
  try {
    const module = await import(`./json/${name}.json`)
    return module.default
  } catch (error) {
    return defaultValue
  }
}

export function getJSON(name: string, defaultValue: any = {}) {
  const path = `/assets/json/${name}.json`
  return memo.get(path) || defaultValue
}
