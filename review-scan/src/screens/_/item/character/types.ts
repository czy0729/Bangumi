/*
 * @Author: czy0729
 * @Date: 2022-06-17 00:10:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-14 21:39:35
 */
import { CoverProps } from '@components'
import { CoverCrt, EventType, Id } from '@types'

export type Actors = {
  id: string
  cover: CoverCrt<'s'>
  name: string
  nameCn: string
}[]

export type Props = {
  event?: EventType
  index?: number
  type?: 'character' | 'person'
  id?: Id
  cover?: CoverProps['src']
  name?: string
  nameCn?: string
  replies?: string
  info?: string
  actors?: Actors
  positions?: string[]
  positionDetails?: string[]

  /** @deprecated */
  position?: string
  children?: any
}
