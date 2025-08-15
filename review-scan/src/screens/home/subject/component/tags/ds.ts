/*
 * @Author: czy0729
 * @Date: 2022-08-26 10:38:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-02 15:57:39
 */
import { systemStore } from '@stores'
import { rc } from '@utils/dev'
import { FROZEN_FN } from '@constants'
import { COMPONENT as PARENT } from '../ds'

import type { Ctx } from '../../types'
type $ = Ctx['$']

export const COMPONENT = rc(PARENT, 'Tags')

export const COMPONENT_MAIN = rc(COMPONENT)

export const DEFAULT_PROPS = {
  show: true as boolean,
  showTags: true as typeof systemStore.setting.showTags,
  showTyperank: false as typeof systemStore.setting.subjectTagsRec,
  subjectTagsExpand: true as typeof systemStore.setting.subjectTagsExpand,
  rank: 0 as $['subject']['rank'],
  focusOrigin: false as typeof systemStore.setting.focusOrigin,
  onSwitchBlock: FROZEN_FN as $['onSwitchBlock']
}
