/*
 * @Author: czy0729
 * @Date: 2022-07-04 13:08:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-04 13:09:23
 */
import { MODEL_RAKUEN_SCROLL_DIRECTION } from '@constants'
import { RakuenScrollDirection } from '@types'

export const DEFAULT_PROPS = {
  styles: {},
  list: [],
  readedTime: 0,
  scrollDirection:
    MODEL_RAKUEN_SCROLL_DIRECTION.getValue<RakuenScrollDirection>('右侧'),
  reverse: false,
  isWebLogin: false,
  onPress: () => {}
} as const

export const HIT_SLOP = {
  top: 0,
  right: 2,
  bottom: 0,
  left: 2
} as const
