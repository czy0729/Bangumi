/*
 * @Author: czy0729
 * @Date: 2022-09-29 19:18:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-01 20:52:52
 */
import { rc } from '@utils/dev'
import { FROZEN_FN } from '@constants'
import { COMPONENT as PARENT } from '../ds'

import type { Navigation } from '@types'
import type { Item } from '../../types'
import type { Props } from './types'

export const COMPONENT = rc(PARENT, 'Item')

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
