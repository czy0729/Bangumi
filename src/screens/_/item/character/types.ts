/*
 * @Author: czy0729
 * @Date: 2022-06-17 00:10:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-20 14:34:26
 */
import { CoverCrt, EventType, Id } from '@types'

export type Props = {
  event?: EventType
  index?: number
  type?: 'character' | 'person'
  id?: Id
  cover?: string
  name?: string
  nameCn?: string
  replies?: string
  info?: string
  actors?: {
    id: string
    cover: CoverCrt<'s'>
    name: string
    nameCn: string
  }[]
  positions?: string[]

  /** @deprecated */
  position?: string
  children?: any
}
