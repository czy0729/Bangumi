/*
 * @Author: czy0729
 * @Date: 2022-08-26 09:22:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-08 07:02:16
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

export const DEFAULT_PROPS = {
  navigation: {} as Navigation,
  subjectId: 0 as $['subjectId'],
  showRecent: true as typeof systemStore.setting.showRecent,
  who: [] as $['subjectFormHTML']['who'],
  hideScore: false as typeof systemStore.setting.hideScore,
  onSwitchBlock: FROZEN_FN as $['onSwitchBlock']
}
