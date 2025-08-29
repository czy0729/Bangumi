/*
 * @Author: czy0729
 * @Date: 2025-06-26 02:36:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-26 02:47:01
 */
export function afterTax(share: number) {
  let tax = 0
  const total = share / 10000
  const top = Math.log10(total + 1) * 100
  if (total > top) tax = (total - top) * 10000
  return share - tax
}
