/*
 * @Author: czy0729
 * @Date: 2022-08-26 00:33:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-15 19:29:21
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

import type { systemStore } from '@stores'
import type { Navigation } from '@types'
import type { Ctx } from '../../../types'
import type { memoStyles } from './styles'

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
