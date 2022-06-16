/*
 * @Author: czy0729
 * @Date: 2022-06-16 23:36:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-16 23:55:38
 */
import { EventType, Id } from '@types'

export type Props = {
  event?: EventType
  id?: Id
  name?: string
  title?: string
  info?: string
  book?: boolean
  anime?: boolean
  music?: boolean
  game?: boolean
  real?: boolean
  isUser?: boolean
  hideScore?: boolean
  children?: any
}
