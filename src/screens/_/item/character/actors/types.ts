/*
 * @Author: czy0729
 * @Date: 2024-08-24 13:13:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-19 17:06:06
 */
import type { EventType } from '@types'
import type { Actors } from '../types'

export type Props = {
  actors: Actors
  y: number
  event: EventType
}
