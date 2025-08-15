/*
 * @Author: czy0729
 * @Date: 2022-08-26 01:35:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-02 15:58:01
 */
import { systemStore } from '@stores'
import { rc } from '@utils/dev'
import { FROZEN_FN } from '@constants'
import { Navigation } from '@types'
import { COMPONENT as PARENT } from '../ds'

import type { Ctx } from '../../types'
type $ = Ctx['$']

export const COMPONENT = rc(PARENT, 'Staff')

export const COMPONENT_MAIN = rc(COMPONENT)

export const DEFAULT_PROPS = {
  navigation: {} as Navigation,
  showStaff: true as typeof systemStore.setting.showStaff,
  subjectId: 0 as $['subjectId'],
  staff: [] as $['staff'],
  onSwitchBlock: FROZEN_FN as $['onSwitchBlock']
}
