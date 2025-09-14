/*
 * @Author: czy0729
 * @Date: 2022-08-03 10:31:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-02 17:00:21
 */
import { systemStore } from '@stores'
import { rc } from '@utils/dev'
import { FROZEN_FN } from '@constants'
import { COMPONENT as PARENT } from '../ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'
type $ = Ctx['$']

export const COMPONENT = rc(PARENT, 'Comment')

export const COMPONENT_MAIN = rc(COMPONENT)

export const DEFAULT_PROPS = {
  styles: {} as ReturnType<typeof memoStyles>,
  showComment: true as typeof systemStore.setting.showComment,
  commentLength: 0 as $['commentLength'],
  onSwitchBlock: FROZEN_FN as $['onSwitchBlock']
}
