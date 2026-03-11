/*
 * @Author: czy0729
 * @Date: 2023-03-19 18:42:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-10 22:36:40
 */
import { _ } from '@stores'
import { rc } from '@utils/dev'
import { FROZEN_FN } from '@constants'
import { COMPONENT as PARENT, H_HEADER } from '../ds'

import type { Ctx } from '../types'

export const COMPONENT = rc(PARENT, 'Scroll')

export const COMPONENT_MAIN = rc(COMPONENT)

export const FIXED_OFFSET = 20

type $ = Ctx['$']

export const DEFAULT_PROPS = {
  fixedHeight: (_.parallaxImageHeight - H_HEADER) as $['fixedHeight'],
  page: 0 as $['state']['page'],
  scrollToOffset: {} as $['scrollToOffset'],
  onChange: FROZEN_FN as $['onChange'],
  onScroll: FROZEN_FN
}
