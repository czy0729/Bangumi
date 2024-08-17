/*
 * @Author: czy0729
 * @Date: 2024-08-17 11:48:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-17 12:03:00
 */
export async function loadJSON(name: string): Promise<any> {
  try {
    const module = await import(`./json/${name}.json`)
    return module.default
  } catch (error) {
    return {}
  }
}
