/*
 * @Author: czy0729
 * @Date: 2026-03-07 05:09:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-07 05:24:02
 */

/** 插入 BBCode */
export function insertBBCode(
  text: string,
  selection: { start: number; end: number },
  insert: string
) {
  const { start, end } = selection

  const left = text.slice(0, start)
  const selected = text.slice(start, end)
  const right = text.slice(end)

  if (selected) {
    const pos = insert.indexOf('$TEXT$')
    const replaced = insert.replace('$TEXT$', selected)

    const value = left + replaced + right
    const cursor = left.length + pos + selected.length

    return { value, cursor }
  }

  const pos = insert.indexOf('$TEXT$')
  const replaced = insert.replace('$TEXT$', '')

  const value = left + replaced + right
  const cursor = left.length + pos

  return { value, cursor }
}
