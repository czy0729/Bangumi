/*
 * @Author: czy0729
 * @Date: 2024-08-24 13:13:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-24 13:15:11
 */
import { EventType, Navigation } from '@types'
import { Actors } from '../types'

export type Props = {
  navigation: Navigation
  actors: Actors
  y: number
  event: EventType
}
