/*
 * @Author: czy0729
 * @Date: 2022-06-17 00:10:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-11 16:20:55
 */
import { CoverCrt, EventType, Id } from '@types'

export type Props = {
  event?: EventType
  type?: 'character' | 'person'
  id?: Id
  cover?: string
  name?: string
  nameCn?: string
  replies?: string
  position?: string
  info?: string
  actors?: {
    id: string
    cover: CoverCrt<'s'>
    name: string
    nameCn: string
  }[]
  children?: any
}
