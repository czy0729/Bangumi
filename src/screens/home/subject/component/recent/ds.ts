/*
 * @Author: czy0729
 * @Date: 2022-08-26 09:22:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-20 21:27:26
 */
import { rc } from '@utils/dev'
import { FROZEN_FN } from '@constants'
import { COMPONENT as PARENT } from '../ds'

import type { systemStore } from '@stores'
import type { Navigation } from '@types'
import type { Ctx } from '../../types'

type $ = Ctx['$']

export const COMPONENT = rc(PARENT, 'Recent')

export const COMPONENT_MAIN = rc(COMPONENT)

export const DATA = ['全站', '好友'] as const

export const DEFAULT_PROPS = {
  navigation: {} as Navigation,
  subjectId: 0 as $['subjectId'],
  showRecent: true as typeof systemStore.setting.showRecent,
  who: [] as $['subjectFormHTML']['who'],
  hideScore: false as typeof systemStore.setting.hideScore,
  subjectRecentType: DATA[0] as typeof systemStore.setting.subjectRecentType,
  onSwitchBlock: FROZEN_FN as $['onSwitchBlock'],
  onSwitchSubjectRecentType: FROZEN_FN as $['onSwitchSubjectRecentType']
}
