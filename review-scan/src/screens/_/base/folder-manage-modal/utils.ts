/*
 * @Author: czy0729
 * @Date: 2024-08-01 23:13:34
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-08-01 23:13:34
 */
export function fixedOrder(order: string) {
  const _order = Number(order)
  return Number.isNaN(_order) ? 10 : _order
}
