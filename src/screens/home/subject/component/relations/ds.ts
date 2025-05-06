/*
 * @Author: czy0729
 * @Date: 2022-08-26 01:25:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-02 15:58:10
 */
import { systemStore } from '@stores'
import { rc } from '@utils/dev'
import { FROZEN_FN } from '@constants'
import { Navigation } from '@types'
import { COMPONENT as PARENT } from '../ds'

import type { Ctx } from '../../types'
type $ = Ctx['$']

export const COMPONENT = rc(PARENT, 'Relations')

export const COMPONENT_MAIN = rc(COMPONENT)

export const COVER_WIDTH = 80

export const COVER_HEIGHT = COVER_WIDTH * 1.4

export const DEFAULT_PROPS = {
  navigation: {} as Navigation,
  showRelations: true as typeof systemStore.setting.showRelations,
  subjectId: 0 as $['subjectId'],
  relations: [] as $['relations'],
  typeCn: '' as $['type'],
  onSwitchBlock: FROZEN_FN as $['onSwitchBlock']
}
