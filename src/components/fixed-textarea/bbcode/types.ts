/*
 * @Author: czy0729
 * @Date: 2026-03-07 05:09:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-07 05:24:17
 */
export type Selection = {
  start: number
  end: number
}

export type InsertResult = {
  value: string
  selection: Selection
}

export type BBCodeConfig = {
  insert: string
  offset: number
}
