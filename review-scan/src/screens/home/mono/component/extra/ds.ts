/*
 * @Author: czy0729
 * @Date: 2022-08-25 19:22:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-10 04:38:18
 */
import { rc } from '@utils/dev'
import { Navigation } from '@types'
import { COMPONENT as PARENT } from '../ds'

import type { Ctx } from '../../types'

export const COMPONENT = rc(PARENT, 'Extra')

export const COMPONENT_MAIN = rc(COMPONENT)

type $ = Ctx['$']

export const DEFAULT_PROPS = {
  navigation: {} as Navigation,
  monoId: '' as $['monoId'],
  canICO: false as $['canICO'],
  icoUsers: undefined as $['chara']['users'],
  doICO: (() => undefined) as $['doICO']
}
