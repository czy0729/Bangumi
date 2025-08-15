/*
 * @Author: czy0729
 * @Date: 2022-08-26 01:32:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-12 17:33:43
 */
import { systemStore } from '@stores'
import { rc } from '@utils/dev'
import { FROZEN_FN } from '@constants'
import { Navigation } from '@types'
import { COMPONENT as PARENT } from '../ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'
type $ = Ctx['$']

export const COMPONENT = rc(PARENT, 'Summary')

export const COMPONENT_MAIN = rc(COMPONENT)

export const DEFAULT_PROPS = {
  navigation: {} as Navigation,
  styles: {} as ReturnType<typeof memoStyles>,
  subjectId: 0 as $['subjectId'],
  showSummary: true as typeof systemStore.setting.showSummary,
  subjectHtmlExpand: true as typeof systemStore.setting.subjectHtmlExpand,
  translateResult: [] as $['state']['translateResult'],
  content: '' as $['summary'],
  name: '',
  onSwitchBlock: FROZEN_FN as $['onSwitchBlock']
}
