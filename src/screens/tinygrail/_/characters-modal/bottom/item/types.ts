/*
 * @Author: czy0729
 * @Date: 2026-07-24 23:03:05
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-07-24 23:03:05
 */
import type { Fn } from '@types'
import type { PickItem } from '../../types'

export type Props = Pick<PickItem, 'id' | 'name' | 'level'> & {
  src?: string
  change?: string
  type?: 'bid' | 'ask' | 'tinygrailText'
  onPress?: Fn
}
