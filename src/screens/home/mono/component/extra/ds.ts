/*
 * @Author: czy0729
 * @Date: 2022-08-25 19:22:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-28 21:45:41
 *
 * 扩展区块常量
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

import type { Navigation } from '@types'
import type { Ctx } from '../../types'

export const COMPONENT = rc(PARENT, 'Extra')

export const COMPONENT_MAIN = rc(COMPONENT)

type $ = Ctx['$']

export const DEFAULT_PROPS = {
  navigation: {} as Navigation,
  monoId: '' as $['monoId'],
  level: 0 as number,
  canICO: false as $['canICO'],
  icoUsers: undefined as $['chara']['users'],
  doICO: (() => undefined) as $['doICO']
}
