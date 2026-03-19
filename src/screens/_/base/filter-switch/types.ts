/*
 * @Author: czy0729
 * @Date: 2022-06-14 18:48:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 16:20:34
 */
import type { PATH_MAP } from './ds'

export type FilterSwitchName = keyof typeof PATH_MAP

export type Props = {
  title?: string
  name?: FilterSwitchName
}
