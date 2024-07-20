/*
 * @Author: czy0729
 * @Date: 2022-06-14 18:48:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-20 11:54:36
 */
import { PATH_MAP } from './ds'

export type FilterSwitchName = keyof typeof PATH_MAP

export type Props = {
  title?: string
  name?: FilterSwitchName
}
