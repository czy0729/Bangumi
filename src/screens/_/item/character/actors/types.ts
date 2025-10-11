/*
 * @Author: czy0729
 * @Date: 2024-08-24 13:13:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-11 05:33:07
 */
import { EventType } from '@types'
import { Actors } from '../types'

export type Props = {
  actors: Actors
  y: number
  event: EventType
}
