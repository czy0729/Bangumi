/*
 * @Author: czy0729
 * @Date: 2024-08-25 13:02:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-17 17:47:43
 */
import { Fn } from '@types'

export type Props = {
  type: 'character' | 'person'
  cn: string
  jp: string
  replies: string
  info: string
  position: string[]
  positionDetails: string[]
  onPress: Fn
}
