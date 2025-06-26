/*
 * @Author: czy0729
 * @Date: 2022-08-25 23:36:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-02 17:00:15
 */
import { systemStore } from '@stores'
import { rc } from '@utils/dev'
import { FROZEN_FN } from '@constants'
import { Navigation } from '@types'
import { COMPONENT as PARENT } from '../ds'

import type { Ctx } from '../../types'
type $ = Ctx['$']

export const COMPONENT = rc(PARENT, 'Character')

export const COMPONENT_MAIN = rc(COMPONENT)

export const DEFAULT_PROPS = {
  navigation: {} as Navigation,
  showCharacter: true as typeof systemStore.setting.showCharacter,
  subjectId: 0 as $['subjectId'],
  crt: [] as $['crt'],
  crtCounts: {} as Record<string, number>,
  subjectName: '',
  onSwitchBlock: FROZEN_FN as $['onSwitchBlock']
}
