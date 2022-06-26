/*
 * @Author: czy0729
 * @Date: 2022-06-14 18:48:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-26 14:52:30
 */
import { FILTER_SWITCH_DS } from './ds'

export type FilterSwitchName = typeof FILTER_SWITCH_DS[number]

export type Props = {
  title?: string
  name?: FilterSwitchName
}
