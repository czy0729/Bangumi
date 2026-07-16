/*
 * @Author: czy0729
 * @Date: 2022-08-28 00:30:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 22:17:42
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

import type { Ctx } from '../../types'

export const COMPONENT = rc(PARENT, 'Item')

export const COMPONENT_MAIN = rc(COMPONENT)

type $ = Ctx['$']

export const DEFAULT_PROPS = {
  data: [] as ReturnType<$['filterData']>,
  index: 0 as number,
  subjects: {} as ReturnType<$['subjects']>
}
