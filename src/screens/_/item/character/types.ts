/*
 * @Author: czy0729
 * @Date: 2022-06-17 00:10:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-09 07:45:14
 */
import type { PropsWithChildren } from 'react'
import type { EventType, Id, ImageSource } from '@types'

export type Actors = {
  id: string
  cover: string
  name: string
  nameCn: string
  job?: string
}[]

export type Props = PropsWithChildren<{
  event?: EventType
  index?: number
  type?: 'character' | 'person'
  id?: Id
  cover?: ImageSource | string
  name?: string
  nameCn?: string
  replies?: string
  info?: string
  actors?: Actors
  positions?: string[]
  positionDetails?: string[]

  /** @deprecated */
  position?: string
}>
