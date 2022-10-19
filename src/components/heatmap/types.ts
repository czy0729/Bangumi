/*
 * @Author: czy0729
 * @Date: 2022-10-19 13:56:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-19 13:57:01
 */
import { EventKeys } from '@constants/events'
import { EventType } from '@types'

export type Props = {
  [key: string]: string | number | boolean
} & {
  id?: EventKeys
  right?: number
  bottom?: number
  transparent?: boolean
  data?: EventType
  mini?: boolean
}
