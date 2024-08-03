/*
 * @Author: czy0729
 * @Date: 2022-08-26 10:38:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-04 05:50:09
 */
import { systemStore } from '@stores'
import { rc } from '@utils/dev'
import { StoreType as $ } from '../../types'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Tags')

export const COMPONENT_MAIN = rc(COMPONENT)

export const DEFAULT_PROPS = {
  show: true as boolean,
  showTags: true as typeof systemStore.setting.showTags,
  subjectTagsExpand: true as typeof systemStore.setting.subjectTagsExpand,
  rank: 0 as $['subject']['rank'],
  focusOrigin: false as typeof systemStore.setting.focusOrigin,
  onSwitchBlock: (() => {}) as $['onSwitchBlock']
}
