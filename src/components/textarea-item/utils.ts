/*
 * @Author: czy0729
 * @Date: 2026-08-11 10:00:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-11 10:00:00
 */
/** 受控值 undefined/null 统一归一为空字符串 */
export function fixControlledValue(value: string | null | undefined): string {
  return typeof value === 'undefined' || value === null ? '' : value
}

/** 计算多行固定高度, 与 autoHeight 区分, rows > 1 时按行数估算 */
export function getHeightByRows(rows: number, listItemHeight: number): number {
  return rows !== undefined && rows > 1 ? 6 * rows * 4 : listItemHeight
}