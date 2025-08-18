/*
 * @Author: czy0729
 * @Date: 2022-08-26 00:33:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-15 19:29:21
 */
import { systemStore } from '@stores'
import { rc } from '@utils/dev'
import { Navigation } from '@types'
import { COMPONENT as PARENT } from '../ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../../types'
type $ = Ctx['$']

export const COMPONENT = rc(PARENT, 'Disc')

export const COMPONENT_MAIN = rc(COMPONENT)

export const DEFAULT_PROPS = {
  navigation: {} as Navigation,
  styles: {} as ReturnType<typeof memoStyles>,
  subjectId: 0 as $['subjectId'],
  disc: [] as $['disc'],
  discTranslateResult: [] as $['state']['discTranslateResult'],
  focusOrigin: false as typeof systemStore.setting.focusOrigin
}
