/*
 * @Author: czy0729
 * @Date: 2022-09-10 08:07:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-20 15:45:20
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

import type { Ctx } from '../../types'
import type { memoStyles } from './styles'

export const COMPONENT = rc(PARENT, 'Today')

export const COMPONENT_MAIN = rc(COMPONENT)

type $ = Ctx['$']

export const DEFAULT_PROPS = {
  styles: {} as ReturnType<typeof memoStyles>,
  todayBangumi: [] as $['todayBangumi']
}
