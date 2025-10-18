/*
 * @Author: czy0729
 * @Date: 2022-08-26 00:59:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-12 17:32:37
 */
import { rc } from '@utils/dev'
import { FROZEN_FN } from '@constants'
import { COMPONENT as PARENT } from '../ds'

import type { systemStore } from '@stores'
import type { Navigation } from '@types'
import type { Ctx } from '../../types'
import type { memoStyles } from './styles'

type $ = Ctx['$']

export const COMPONENT = rc(PARENT, 'Info')

export const COMPONENT_MAIN = rc(COMPONENT)

export const DEFAULT_PROPS = {
  navigation: {} as Navigation,
  styles: {} as ReturnType<typeof memoStyles>,
  subjectId: 0 as $['subjectId'],
  showInfo: true as typeof systemStore.setting.showInfo,
  subjectHtmlExpand: true as typeof systemStore.setting.subjectHtmlExpand,
  info: '' as $['info'],
  name: '',
  onSwitchBlock: FROZEN_FN as $['onSwitchBlock']
}
