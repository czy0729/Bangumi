/*
 * @Author: czy0729
 * @Date: 2022-08-26 10:42:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-02 15:57:30
 */
import { systemStore } from '@stores'
import { rc } from '@utils/dev'
import { FROZEN_FN } from '@constants'
import { Navigation } from '@types'
import { COMPONENT as PARENT } from '../ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'
type $ = Ctx['$']

export const COMPONENT = rc(PARENT, 'Topic')

export const COMPONENT_MAIN = rc(COMPONENT)

export const DEFAULT_PROPS = {
  navigation: {} as Navigation,
  styles: {} as ReturnType<typeof memoStyles>,
  subjectId: 0 as $['subjectId'],
  showTopic: true as typeof systemStore.setting.showTopic,
  topic: [] as $['subject']['topic'],
  onSwitchBlock: FROZEN_FN as $['onSwitchBlock']
}
