/*
 * @Author: czy0729
 * @Date: 2026-08-08 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-08 06:30:54
 */
export type NameItem = {
  date: string
  content: string
}

export type NameState = {
  list: NameItem[]
  _loaded: number
}

export type Props = {
  name: NameState
}
