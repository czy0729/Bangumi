/*
 * @Author: czy0729
 * @Date: 2023-01-12 06:42:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-02 16:59:45
 */
import { _ } from '@stores'
import { rc } from '@utils/dev'
import { FROZEN_FN } from '@constants'
import { COMPONENT as PARENT } from '../ds'

import type { systemStore } from '@stores'
import type { SubjectId } from '@types'
import type { Ctx } from '../../types'
import type { memoStyles } from './styles'

type $ = Ctx['$']

export const COMPONENT = rc(PARENT, 'Anitabi')

export const COMPONENT_MAIN = rc(COMPONENT)

export const DEFAULT_PROPS = {
  styles: {} as ReturnType<typeof memoStyles>,
  showAnitabi: true as typeof systemStore.setting.showAnitabi,
  subjectId: 0 as SubjectId,
  data: {} as $['state']['anitabi'],
  onSwitchBlock: FROZEN_FN as $['onSwitchBlock']
}

export const THUMB_WIDTH = _.r(180)

export const THUMB_HEIGHT = THUMB_WIDTH * 0.56
