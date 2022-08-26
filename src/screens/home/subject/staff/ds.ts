/*
 * @Author: czy0729
 * @Date: 2022-08-26 01:35:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-26 01:36:50
 */
import { systemStore } from '@stores'
import { Navigation } from '@types'
import { StoreType as $ } from '../types'

export const DEFAULT_PROPS = {
  navigation: {} as Navigation,
  showStaff: true as typeof systemStore.setting.showStaff,
  subjectId: 0 as $['subjectId'],
  staff: [] as $['staff'],
  onSwitchBlock: (() => {}) as $['onSwitchBlock']
}
