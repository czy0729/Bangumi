/*
 * @Author: czy0729
 * @Date: 2025-11-30 21:53:18
 * @Last Modified by:   czy0729
 * @Last Modified time: 2025-11-30 21:53:18
 */
export const formatDateToNumber = (dateStr: string) => {
  const [y, m, d] = String(dateStr).split('-')
  const mm = m.padStart(2, '0')
  const dd = d.padStart(2, '0')
  return Number(`${y}${mm}${dd}`)
}
