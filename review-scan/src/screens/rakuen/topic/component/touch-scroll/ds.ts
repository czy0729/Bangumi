/*
 * @Author: czy0729
 * @Date: 2022-07-04 13:08:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-23 10:14:29
 */
import { rc } from '@utils/dev'
import { FROZEN_FN, MODEL_RAKUEN_SCROLL_DIRECTION } from '@constants'
import { RakuenNewFloorStyleCn, RakuenScrollDirection } from '@types'
import { Ctx } from '../../types'
import { COMPONENT as PARENT } from '../ds'
import { memoStyles } from './styles'

export const COMPONENT = rc(PARENT, 'TouchScroll')

export const COMPONENT_MAIN = rc(COMPONENT)

type $ = Ctx['$']

export const DEFAULT_PROPS = {
  styles: {} as ReturnType<typeof memoStyles>,
  list: [] as $['comments']['list'],
  readedTime: 0 as $['readed']['_time'],
  scrollDirection: MODEL_RAKUEN_SCROLL_DIRECTION.getValue<RakuenScrollDirection>('右侧'),
  directFloor: '' as string,
  isWebLogin: false as boolean,
  newFloorStyle: '角标' as RakuenNewFloorStyleCn,
  onPress: FROZEN_FN
} as const

export const HIT_SLOP = {
  top: 0,
  right: 2,
  bottom: 0,
  left: 2
} as const
