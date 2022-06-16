/*
 * @Author: czy0729
 * @Date: 2022-06-17 00:10:37
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-06-17 00:10:37
 */
import { EventType, Id } from '@types'

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
  actorId?: string
  actorCover?: string
  actor?: string
  actorCn?: string
  children?: any
}
