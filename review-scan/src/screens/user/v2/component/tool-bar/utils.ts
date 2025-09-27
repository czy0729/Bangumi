/*
 * @Author: czy0729
 * @Date: 2025-07-13 20:15:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-13 20:39:37
 */
export function generateArray(num: number) {
  const arr: string[] = []
  for (let i = 1; i <= Number(num); i += 1) {
    arr.push(String(i))
  }
  return arr
}
