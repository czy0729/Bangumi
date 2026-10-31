/*
 * @Author: czy0729
 * @Date: 2022-09-29 19:18:07
 * @Last Modified by: czy0729
 * @Last Modified time:  2026-11-01 04:45:48
 *
 * 条目标识与默认属性
 */
import { rc } from '@utils/dev'
import { FROZEN_FN } from '@constants'
import { COMPONENT as PARENT } from '../ds'

import type { Navigation } from '@types'
import type { Item } from '../../types'
import type { Props } from './types'

export const COMPONENT = rc(PARENT, 'Item')

/** 条目高度预估 (封面高度 + 上下内边距 + 行间距) */
export const ITEM_HEIGHT = 178

export const HIT_SLOP = {
  top: 4,
  right: 20,
  bottom: 4,
  left: 20
} as const

export const DEFAULT_PROPS: Props = {
  navigation: {} as Navigation,
  styles: {} as Props['styles'],
  item: {} as Item,
  upload: {} as Props['upload'],
  onBottom: FROZEN_FN as Props['onBottom'],
  onSubmit: FROZEN_FN as Props['onSubmit']
}
